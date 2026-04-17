'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

export interface SessionRecord {
  id: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
  messages: number;
  duration: string; // e.g. "2m 18s"
  time: string;     // human-readable relative time
  timestamp: number; // ms since epoch
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string; // emoji or URL
  plan: 'Free' | 'Pro';
  joinedAt: number;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  user: UserProfile | null;
  sessions: SessionRecord[];
  totalMinutes: number;
  totalLanguages: number;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  addSession: (session: Omit<SessionRecord, 'id' | 'time' | 'timestamp'>) => void;
  updateUser: (fields: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── helpers ──────────────────────────────────────────────────────────────────
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
  // "2m 18s" → ms
  const m = s.match(/(\d+)m\s*(\d+)s/);
  if (m) return (parseInt(m[1]) * 60 + parseInt(m[2])) * 1000;
  const s2 = s.match(/(\d+)s/);
  if (s2) return parseInt(s2[1]) * 1000;
  return 0;
}

const STORAGE_KEY = 'vb_auth_v1';

interface StoredData {
  user: UserProfile;
  sessions: Omit<SessionRecord, 'time'>[];
  passwordHash: string; // very simple demo hash
}

function simpleHash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return String(h >>> 0);
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: StoredData & { loggedIn?: boolean } = JSON.parse(raw);
        if (data.loggedIn && data.user) {
          setUser(data.user);
          setSessions(
            (data.sessions || []).map((s) => ({ ...s, time: relativeTime(s.timestamp) }))
          );
          setIsLoggedIn(true);
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const persist = useCallback(
    (u: UserProfile, sess: SessionRecord[], loggedIn: boolean, passwordHash?: string) => {
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...existing,
            user: u,
            sessions: sess,
            loggedIn,
            passwordHash: passwordHash ?? existing.passwordHash ?? '',
          })
        );
      } catch {/* ignore */}
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      if (!email || !password) return { ok: false, error: 'Email and password are required.' };
      if (!/\S+@\S+\.\S+/.test(email)) return { ok: false, error: 'Invalid email address.' };

      // Check stored account
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data: StoredData & { loggedIn?: boolean } = JSON.parse(raw);
          if (data.user && data.passwordHash) {
            if (data.user.email.toLowerCase() !== email.toLowerCase()) {
              return { ok: false, error: 'No account found with that email.' };
            }
            if (data.passwordHash !== simpleHash(password)) {
              return { ok: false, error: 'Incorrect password.' };
            }
            const hydratedSessions = (data.sessions || []).map((s) => ({
              ...s,
              time: relativeTime(s.timestamp),
            }));
            setUser(data.user);
            setSessions(hydratedSessions);
            setIsLoggedIn(true);
            persist(data.user, hydratedSessions, true);
            return { ok: true };
          }
        }
      } catch {/* ignore */}

      return { ok: false, error: 'No account found. Please sign up first.' };
    },
    [persist]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      if (!name.trim()) return { ok: false, error: 'Please enter your name.' };
      if (!email) return { ok: false, error: 'Email is required.' };
      if (!/\S+@\S+\.\S+/.test(email)) return { ok: false, error: 'Invalid email address.' };
      if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };

      const newUser: UserProfile = {
        name: name.trim(),
        email: email.toLowerCase(),
        avatar: '👤',
        plan: 'Free',
        joinedAt: Date.now(),
      };
      setUser(newUser);
      setSessions([]);
      setIsLoggedIn(true);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            user: newUser,
            sessions: [],
            loggedIn: true,
            passwordHash: simpleHash(password),
          })
        );
      } catch {/* ignore */}
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    setSessions([]);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, loggedIn: false }));
      }
    } catch {/* ignore */}
  }, []);

  const addSession = useCallback(
    (session: Omit<SessionRecord, 'id' | 'time' | 'timestamp'>) => {
      const newSession: SessionRecord = {
        ...session,
        id: Date.now().toString(),
        timestamp: Date.now(),
        time: 'Just now',
      };
      setSessions((prev) => {
        const updated = [newSession, ...prev].slice(0, 50); // keep last 50
        if (user) persist(user, updated, true);
        return updated;
      });
    },
    [user, persist]
  );

  const updateUser = useCallback(
    (fields: Partial<UserProfile>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...fields };
        persist(updated, sessions, true);
        return updated;
      });
    },
    [sessions, persist]
  );

  // Derived stats
  const totalMinutes = Math.round(
    sessions.reduce((acc, s) => acc + parseDurationMs(s.duration), 0) / 60_000
  );
  const totalLanguages = new Set(
    sessions.flatMap((s) => [s.from, s.to])
  ).size;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        sessions,
        totalMinutes,
        totalLanguages,
        login,
        signup,
        logout,
        addSession,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
}
