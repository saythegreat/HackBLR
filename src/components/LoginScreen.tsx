'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, AlertCircle, ArrowRight, Mic, Check, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LANGUAGES } from '@/lib/languages';
import { useVoice } from '@/context/VoiceContext';
import { getUIStrings } from '@/lib/uiTranslations';

type Mode = 'login' | 'signup';

export default function LoginScreen() {
  const { login, signup, verifyCode, loginWithGoogle, loginWithPhone, testModeHint } = useAuth();
  const { fromLang, setFromLang } = useVoice();
  const ui = getUIStrings(fromLang.label);
  const [mode, setMode] = useState<Mode | 'verify'>('login');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [phone, setPhone] = useState('');
  const [usePhone, setUsePhone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'login') {
      if (usePhone) {
        if (!phone) {
          setError('Please enter your phone number.');
          setLoading(false);
          return;
        }
        const res = await loginWithPhone(phone);
        setLoading(false);
        if (!res.ok) return setError(res.error ?? 'SMS failed.');
        setMode('verify');
        return;
      }
      const res = await login(email, password, rememberMe);
      setLoading(false);
      if (!res.ok) return setError(res.error ?? 'Login failed.');
    } else {
      const result = await signup(name, email, password, rememberMe);
      setLoading(false);
      if (!result.ok) {
        setError(result.error ?? 'Something went wrong.');
      } else if (result.needsVerification) {
        setMode('verify');
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    const result = await verifyCode(otp);
    setLoading(false);
    
    if (!result.ok) {
      setError(result.error ?? 'Invalid code.');
    }
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
        <AnimatePresence mode="wait">
          <>
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
                {ui.appTagline}
              </p>
            </motion.div>

            {/* Language Selection Header */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <select
                value={fromLang.code}
                onChange={(e) => {
                  const found = LANGUAGES.find(l => l.code === e.target.value);
                  if (found) setFromLang(found);
                }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: '4px 8px',
                  color: 'var(--text-muted)',
                  fontSize: 12,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code} style={{ background: '#080b14' }}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>

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
              {(['login', 'signup'] as const).map(m => (
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
                  {m === 'login' ? ui.loginSignIn : ui.loginCreateAccount}
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
                  style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}
                >
                  {mode === 'login' ? ui.loginWelcome : ui.loginJoin}
                </motion.h2>
              </AnimatePresence>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
                {mode === 'login'
                  ? ui.loginHistoryPro
                  : ui.loginStartBreaking}
              </p>
              {mode === 'verify' ? (
                <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{
                      background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
                      borderRadius: 16, padding: '16px', marginBottom: 12, textAlign: 'center'
                    }}>
                      <Mail size={24} color="#a78bfa" style={{ marginBottom: 8 }} />
                      <p style={{ fontSize: 14, color: 'white', fontWeight: 600, marginBottom: 4 }}>
                        {ui.loginCheckMail}
                      </p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {ui.loginSentCode} <b>{email}</b>
                      </p>
                    </div>
                    
                    <InputField
                      id="auth-otp"
                      icon={<Lock size={16} />}
                      type="text"
                      placeholder={ui.loginEnterCode}
                      value={otp}
                      onChange={setOtp}
                    />

                    <div style={{ textAlign: 'center' }}>
                      <button 
                        type="button"
                        onClick={() => alert(testModeHint || "Please check your spam folder or wait a few minutes.")}
                        style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
                      >
                        Didn't receive an email?
                      </button>
                    </div>
                    
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="error-box"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 14, padding: 12 }}
                      >
                        <span style={{ fontSize: 12, color: '#fca5a5' }}>{error}</span>
                      </motion.div>
                    )}

                    <motion.button
                      id="auth-verify-submit"
                      type="submit"
                      disabled={loading || otp.length < 4}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                      style={{ width: '100%', padding: '16px', fontSize: 16, fontWeight: 700, border: 'none', marginTop: 8 }}
                    >
                      {loading ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ width: 22, height: 22, border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }} />
                      ) : ui.loginVerifyContinue}
                    </motion.button>
                    
                    <button 
                      type="button"
                      onClick={() => setMode('signup')}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', marginTop: 10 }}
                    >
                      {ui.loginWrongEmail}
                    </button>
                  </form>
                ) : (
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
                            placeholder={ui.loginFullName}
                            value={name}
                            onChange={setName}
                            autoComplete="name"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!usePhone ? (
                      <InputField
                        id="auth-email"
                        icon={<Mail size={16} />}
                        type="email"
                        placeholder={ui.loginEmail}
                        value={email}
                        onChange={setEmail}
                        autoComplete="off"
                      />
                    ) : (
                      <InputField
                        id="auth-phone"
                        icon={<Mic size={16} />} // Using Mic as a proxy for phone/voice
                        type="tel"
                        placeholder="Phone Number (e.g. +1...)"
                        value={phone}
                        onChange={setPhone}
                      />
                    )}

                    <InputField
                      id="auth-password"
                      icon={<Lock size={16} />}
                      type={showPass ? 'text' : 'password'}
                      placeholder={ui.loginPassword}
                      value={password}
                      onChange={setPassword}
                      autoComplete="off"
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
                            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                            borderRadius: 14, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <AlertCircle size={16} style={{ color: '#f87171', flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: '#fca5a5', fontWeight: 600 }}>{ui.loginActionFailed}</span>
                          </div>
                          <span style={{ fontSize: 12, color: 'rgba(252,165,165,0.8)', paddingLeft: 24 }}>
                            {error}
                            {error.includes('Email not confirmed') && `. ${ui.loginEmailNotConfirmed}`}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      id="auth-submit"
                      type="submit"
                      disabled={loading}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.01 }}
                      className="btn-primary"
                      style={{
                        width: '100%', padding: '16px', fontSize: 16, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        border: 'none', marginTop: 8, opacity: loading ? 0.7 : 1,
                        fontFamily: 'Inter, sans-serif',
                        boxShadow: '0 10px 20px -10px rgba(124,58,237,0.5)'
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{ width: 22, height: 22, border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}
                        />
                      ) : (
                        <>
                          {mode === 'login' 
                            ? (usePhone ? 'Send SMS Code' : 'Sign In') 
                            : 'Create Free Account'}
                          <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>

                    <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>OR</span>
                      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        type="button"
                        onClick={() => loginWithGoogle()}
                        style={{
                          flex: 1, padding: '12px', borderRadius: 14,
                          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                          color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                      >
                        <Globe size={16} color="#4285F4" />
                        Google
                      </button>
                      <button
                        type="button"
                        onClick={() => setUsePhone(!usePhone)}
                        style={{
                          flex: 1, padding: '12px', borderRadius: 14,
                          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                          color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                      >
                        <Mic size={16} />
                        {usePhone ? 'Use Email' : 'Phone'}
                      </button>
                    </div>
                  </form>
                )}
            </motion.div>

            {/* Demo hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-muted)' }}
            >
              {mode === 'login' ? (
                <>{ui.loginNoAccount}{' '}
                  <button onClick={() => switchMode('signup')} style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontWeight: 600, cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                    {ui.loginSignUpFree}
                  </button>
                </>
              ) : (
                <>{ui.loginAlreadyAccount}{' '}
                  <button onClick={() => switchMode('login')} style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontWeight: 600, cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
                    {ui.loginSignInAction}
                  </button>
                </>
              )}
            </motion.div>
          </>
        </AnimatePresence>
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
