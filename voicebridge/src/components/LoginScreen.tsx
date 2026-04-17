'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, AlertCircle, ArrowRight, Mic } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type Mode = 'login' | 'signup';

export default function LoginScreen() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = mode === 'login'
      ? await login(email, password)
      : await signup(name, email, password);

    setLoading(false);
    if (!result.ok) {
      setError(result.error ?? 'Something went wrong.');
    }
    // On success, AuthContext state updates → parent re-renders to show app
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      background: `
        radial-gradient(ellipse 80% 50% at 20% -10%, rgba(124, 58, 237, 0.18) 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 80% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        #080b14
      `,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 400 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(124,58,237,0.5)', marginBottom: 16,
          }}>
            <Mic size={30} color="white" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Sparkles size={16} color="#a78bfa" />
            <span className="gradient-text" style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>
              VoiceBridge
            </span>
            <Sparkles size={16} color="#a78bfa" />
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
            Your voice, understood everywhere
          </p>
        </motion.div>

        {/* Mode toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{
            display: 'flex', background: 'rgba(255,255,255,0.04)',
            borderRadius: 14, padding: 4, marginBottom: 24,
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {(['login', 'signup'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: mode === m ? 'rgba(124,58,237,0.25)' : 'transparent',
                color: mode === m ? '#c084fc' : 'var(--text-muted)',
                fontWeight: 600, fontSize: 14, transition: 'all 0.25s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass"
          style={{ padding: 24, borderRadius: 24 }}
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={mode}
              initial={{ opacity: 0, x: mode === 'signup' ? 16 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'signup' ? -16 : 16 }}
              transition={{ duration: 0.25 }}
              style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}
            >
              {mode === 'login' ? 'Welcome back 👋' : 'Join VoiceBridge 🚀'}
            </motion.h2>
          </AnimatePresence>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
            {mode === 'login'
              ? 'Sign in to continue your translation sessions.'
              : 'Create your free account and start breaking barriers.'}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Name field – signup only */}
            <AnimatePresence>
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <InputField
                    id="auth-name"
                    icon={<User size={16} />}
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={setName}
                    autoComplete="name"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField
              id="auth-email"
              icon={<Mail size={16} />}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={setEmail}
              autoComplete={mode === 'login' ? 'username' : 'email'}
            />

            <InputField
              id="auth-password"
              icon={<Lock size={16} />}
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={setPassword}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex' }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            />

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <AlertCircle size={14} style={{ color: '#f87171', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#fca5a5' }}>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              id="auth-submit"
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{
                width: '100%', padding: '14px', fontSize: 15, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                border: 'none', marginTop: 4, opacity: loading ? 0.7 : 1,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%' }}
                />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Demo hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-muted)' }}
        >
          {mode === 'login' ? (
            <>Don&apos;t have an account?{' '}
              <button onClick={() => switchMode('signup')} style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontWeight: 600, cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                Sign up free
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => switchMode('login')} style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontWeight: 600, cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                Sign in
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Shared input component ────────────────────────────────────────────────────
function InputField({
  id, icon, type, placeholder, value, onChange, autoComplete, suffix,
}: {
  id: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  suffix?: React.ReactNode;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 14, padding: '12px 16px',
      transition: 'border-color 0.2s',
    }}
      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')}
      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
    >
      <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{icon}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          color: 'var(--text-primary)', fontSize: 14, fontFamily: 'Inter, sans-serif',
        }}
      />
      {suffix}
    </div>
  );
}
