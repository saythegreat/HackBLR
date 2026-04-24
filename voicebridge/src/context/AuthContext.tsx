'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, AuthChangeEvent, AuthResponse } from '@supabase/supabase-js';

export interface SessionRecord {
  id: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
  messages: number;
  duration: string;
  time: string;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plan: 'Free' | 'Pro';
  joinedAt: number;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  user: UserProfile | null;
  sessions: SessionRecord[];
  totalMinutes: number;
  totalLanguages: number;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string; needsVerification?: boolean }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string; needsVerification?: boolean }>;
  verifyCode: (code: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  addSession: (session: Omit<SessionRecord, 'id' | 'time' | 'timestamp'>) => void;
  updateUser: (fields: Partial<UserProfile>) => Promise<void>;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── helpers ───────────────────────────────────────────────────────────────────
function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Today, ${new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  if (hrs < 48) return 'Yesterday';
  return new Date(ts).toLocaleDateString();
}

function parseDurationMs(s: string): number {
  const m = s.match(/(\d+)m\s*(\d+)s/);
  if (m) return (parseInt(m[1]) * 60 + parseInt(m[2])) * 1000;
  const s2 = s.match(/(\d+)s/);
  if (s2) return parseInt(s2[1]) * 1000;
  return 0;
}

function buildUser(supaUser: Session['user']): UserProfile {
  return {
    name: supaUser.user_metadata?.full_name || supaUser.email?.split('@')[0] || 'User',
    email: supaUser.email || '',
    avatar: supaUser.user_metadata?.avatar || '👤',
    plan: 'Free',
    joinedAt: new Date(supaUser.created_at).getTime(),
  };
}

const SESSIONS_KEY = 'vb_sessions_v1';
// KEY: we cache whether the user was logged in so next load is instant
const AUTH_CACHE_KEY = 'vb_auth_cache';

function readCachedUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(AUTH_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeCachedUser(u: UserProfile | null) {
  try {
    if (u) localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(u));
    else localStorage.removeItem(AUTH_CACHE_KEY);
  } catch { /* ignore */ }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  // ── OPTIMIZATION: Initialise from localStorage synchronously ──────────────
  // This means returning users see the app shell INSTANTLY on page load.
  // The Supabase network call happens in the background and corrects state if needed.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !!readCachedUser();
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    return readCachedUser();
  });
  const [sessions, setSessions] = useState<SessionRecord[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(SESSIONS_KEY);
      if (raw) {
        const loaded: Omit<SessionRecord, 'time'>[] = JSON.parse(raw);
        return loaded.map(s => ({ ...s, time: relativeTime(s.timestamp) }));
      }
    } catch { /* ignore */ }
    return [];
  });

  // isAuthReady starts TRUE if we have a cached user (skip splash wait entirely)
  const [isAuthReady, setIsAuthReady] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !!readCachedUser(); // instant ready for returning users
  });

  const [pendingSignup, setPendingSignup] = useState<{ name: string; email: string; password: string; otp: string } | null>(null);

  // ── OPTIMIZATION: Supabase auth sync happens in background ────────────────
  // For new/returning users: validate session in background without blocking UI
  useEffect(() => {
    if (!supabase) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthReady(true);
      return;
    }

    // Fast background session check — doesn't block render
    (supabase.auth.getSession() as Promise<AuthResponse>).then((result: AuthResponse) => {
      const session = result.data?.session;
      if (session?.user) {
        const u = buildUser(session.user);
        setUser(u);
        setIsLoggedIn(true);
        writeCachedUser(u);
      } else {
        // No session — clear stale cache and log out
        setIsLoggedIn(false);
        setUser(null);
        writeCachedUser(null);
      }
      setIsAuthReady(true);
    }).catch(() => {
      // Network error — keep cached state, mark as ready so UI isn't stuck
      setIsAuthReady(true);
    });

    // Listen for future auth events (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const u = buildUser(session.user);
          setUser(u);
          setIsLoggedIn(true);
          writeCachedUser(u);

          // Fetch DB sessions lazily in a detached async IIFE — fire & forget
          if (event === 'SIGNED_IN') {
            void (async () => {
              try {
                const res = await supabase
                  .from('sessions')
                  .select('*')
                  .eq('user_id', session.user.id)
                  .order('created_at', { ascending: false })
                  .limit(50);
                const rows = res.data as Record<string, unknown>[] | null;
                if (rows) {
                  setSessions(rows.map((s) => ({
                    id: s.id as string,
                    from: s.from_lang as string,
                    to: s.to_lang as string,
                    fromFlag: s.from_flag as string,
                    toFlag: s.to_flag as string,
                    messages: s.messages_count as number,
                    duration: s.duration as string,
                    time: relativeTime(new Date(s.created_at as string).getTime()),
                    timestamp: new Date(s.created_at as string).getTime(),
                  })));
                }
              } catch { /* ignore */ }
            })();
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          writeCachedUser(null);
          setSessions([]);
        }
        setIsAuthReady(true);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Auth actions ──────────────────────────────────────────────────────────
  const login = useCallback(
    async (email: string, password: string) => {
      if (!supabase) return { ok: false, error: 'Supabase configuration missing.' };
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { ok: false, error: error.message };
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : 'Login failed.' };
      }
    }, []
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      if (!supabase) return { ok: false, error: 'Supabase configuration missing.' };
      try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const res = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
        });
        if (!res.ok) {
          const d = await res.json();
          return { ok: false, error: d.error || 'Failed to send verification email.' };
        }
        setPendingSignup({ name, email, password, otp });
        return { ok: true, needsVerification: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : 'Signup failed.' };
      }
    }, []
  );

  const verifyCode = useCallback(
    async (code: string) => {
      if (!pendingSignup) return { ok: false, error: 'No signup in progress.' };
      if (code !== pendingSignup.otp) return { ok: false, error: 'Invalid verification code.' };
      try {
        const { error } = await supabase.auth.signUp({
          email: pendingSignup.email,
          password: pendingSignup.password,
          options: {
            data: { full_name: pendingSignup.name, avatar: '👤' },
            redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
          },
        });
        if (error) return { ok: false, error: error.message };
        setPendingSignup(null);
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : 'Verification failed.' };
      }
    }, [pendingSignup]
  );

  const logout = useCallback(async () => {
    writeCachedUser(null);
    if (supabase) await supabase.auth.signOut();
    else { setIsLoggedIn(false); setUser(null); }
  }, []);

  const addSession = useCallback(
    (session: Omit<SessionRecord, 'id' | 'time' | 'timestamp'>) => {
      const timestamp = Date.now();
      const newSession: SessionRecord = { ...session, id: timestamp.toString(), timestamp, time: 'Just now' };

      setSessions((prev) => {
        const updated = [newSession, ...prev].slice(0, 50);
        // Always persist locally (fast, non-blocking)
        try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
        return updated;
      });

      // Save to Supabase in background (non-blocking async IIFE)
      if (isLoggedIn && supabase) {
        void (async () => {
          try {
            const { data } = await supabase.auth.getUser();
            const u = data?.user;
            if (u) {
              await supabase.from('sessions').insert({
                user_id: u.id,
                from_lang: session.from,
                to_lang: session.to,
                from_flag: session.fromFlag,
                to_flag: session.toFlag,
                messages_count: session.messages,
                duration: session.duration,
              });
            }
          } catch { /* ignore */ }
        })();
      }
    },
    [isLoggedIn]
  );

  const updateUser = useCallback(async (fields: Partial<UserProfile>) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: fields.name, avatar: fields.avatar },
    });
    if (!error && data.user) {
      setUser((prev) => {
        const updated = prev ? { ...prev, ...fields } : null;
        writeCachedUser(updated);
        return updated;
      });
    }
  }, []);

  // Derived stats — memoized so they don't recalculate on every render
  const totalMinutes = useMemo(
    () => Math.round(sessions.reduce((acc, s) => acc + parseDurationMs(s.duration), 0) / 60_000),
    [sessions]
  );
  const totalLanguages = useMemo(
    () => new Set(sessions.flatMap((s) => [s.from, s.to])).size,
    [sessions]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn, user, sessions, totalMinutes, totalLanguages,
      login, signup, verifyCode, logout, addSession, updateUser, isAuthReady,
    }),
    [isLoggedIn, user, sessions, totalMinutes, totalLanguages,
      login, signup, verifyCode, logout, addSession, updateUser, isAuthReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
}
