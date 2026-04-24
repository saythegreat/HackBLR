'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Mic, MicOff, ChevronDown, Globe, Zap, Sparkles, AlertCircle, X } from 'lucide-react';
import { useVoice } from '@/context/VoiceContext';
import { LANGUAGES } from '@/lib/languages';
import { getUIStrings } from '@/lib/uiTranslations';
import { formatNumber } from '@/lib/utils';



interface HomeScreenProps {
  onNavigate?: (screen: 'home' | 'conversation' | 'accessibility' | 'emergency' | 'settings') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps = {}) {
  const {
    fromLang, toLang, setFromLang, setToLang,
    voiceState, sessionCount, errorMessage, clearError,
    startListening, stopListening,
  } = useVoice();

  const ui = getUIStrings(fromLang.label);

  const stateConfig = {
    idle:        { label: ui.tapToSpeak,   color: '#7c3aed', glow: 'rgba(124,58,237,0.4)' },
    listening:   { label: ui.listening,   color: '#6366f1', glow: 'rgba(99,102,241,0.6)' },
    processing:  { label: ui.processing,  color: '#06b6d4', glow: 'rgba(6,182,212,0.5)' },
    translating: { label: ui.translating, color: '#0ea5e9', glow: 'rgba(14,165,233,0.5)' },
    speaking:    { label: ui.speaking,    color: '#8b5cf6', glow: 'rgba(139,92,246,0.5)' },
  };

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown]   = useState(false);

  const filteredLanguages = useMemo(() => LANGUAGES, []);

  const cfg = stateConfig[voiceState];
  const isActive = voiceState !== 'idle';

  const handleVoiceToggle = () => {
    if (voiceState === 'listening') {
      stopListening();
    } else if (voiceState === 'idle') {
      startListening();
    }
    // While processing/speaking, button is visually disabled
  };

  const handleSwapLangs = () => {
    if (isActive) return; // don't swap while recording
    const tmp = fromLang;
    setFromLang(toLang);
    setToLang(tmp);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '0 20px' }}>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ paddingTop: 24, paddingBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(124,58,237,0.5)',
            }}>
              <Sparkles size={14} color="white" />
            </div>
            <span className="gradient-text" style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>VoiceBridge</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{ui.appTagline}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="status-dot active" />
          <span style={{ fontSize: 11, color: '#4ade80', fontWeight: 500 }}>{ui.aiReady}</span>
        </div>
      </motion.div>
      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: 8, marginBottom: 28 }}
      >
        {[
          { label: ui.statSessions,  value: formatNumber(sessionCount, fromLang.label).padStart(2, '0') },
          { label: ui.statLanguages, value: `${formatNumber(50, fromLang.label)}+` },
          { label: ui.statAccuracy,  value: `${formatNumber(99, fromLang.label)}%` },
        ].map((stat) => (
          <div key={stat.label} className="glass" style={{ flex: 1, padding: '10px 12px', textAlign: 'center', borderRadius: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Error Banner ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 14 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <AlertCircle size={14} style={{ color: '#f87171', flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#fca5a5', flex: 1, lineHeight: 1.4 }}>{errorMessage}</span>
            <button onClick={clearError} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: 2 }}>
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Language Selector ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32 }}
      >
        {/* From */}
        <div style={{ flex: 1, position: 'relative' }}>
          <button
            id="from-lang-btn"
            className="lang-card"
            style={{ width: '100%' }}
            disabled={isActive}
            onClick={() => { setShowFromDropdown(v => !v); setShowToDropdown(false); }}
          >
            <span style={{ fontSize: 20 }}>{fromLang.flag}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ui.fromLabel}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{fromLang.label}</div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>
          <AnimatePresence>
            {showFromDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="glass"
                style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 50, maxHeight: 200, overflowY: 'auto', borderRadius: 16, padding: 8 }}
              >
                {filteredLanguages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setFromLang(lang); setShowFromDropdown(false); }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 12, fontSize: 13,
                      background: lang.code === fromLang.code ? 'rgba(124,58,237,0.15)' : 'transparent',
                      border: 'none', color: 'var(--text-primary)', cursor: 'pointer',
                      display: 'flex', gap: 10, alignItems: 'center', transition: 'background 0.2s',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{lang.flag}</span>
                    <span style={{ fontWeight: 500 }}>{lang.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swap */}
        <motion.button
          whileTap={{ scale: 0.85, rotate: 180 }}
          onClick={handleSwapLangs}
          disabled={isActive}
          style={{
            width: 36, height: 36, borderRadius: 12, flex: 'none',
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
            color: '#a78bfa', cursor: isActive ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: isActive ? 0.5 : 1, transition: 'opacity 0.2s',
          }}
        >
          <Globe size={16} />
        </motion.button>

        {/* To */}
        <div style={{ flex: 1, position: 'relative' }}>
          <button
            id="to-lang-btn"
            className="lang-card"
            style={{ width: '100%' }}
            disabled={isActive}
            onClick={() => { setShowToDropdown(v => !v); setShowFromDropdown(false); }}
          >
            <span style={{ fontSize: 20 }}>{toLang.flag}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ui.toLabel}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{toLang.label}</div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>
          <AnimatePresence>
            {showToDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="glass"
                style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 50, maxHeight: 200, overflowY: 'auto', borderRadius: 16, padding: 8 }}
              >
                {filteredLanguages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setToLang(lang); setShowToDropdown(false); }}
                    style={{
                      width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 12, fontSize: 13,
                      background: lang.code === toLang.code ? 'rgba(124,58,237,0.15)' : 'transparent',
                      border: 'none', color: 'var(--text-primary)', cursor: 'pointer',
                      display: 'flex', gap: 10, alignItems: 'center', transition: 'background 0.2s',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{lang.flag}</span>
                    <span style={{ fontWeight: 500 }}>{lang.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Voice Button Center ───────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        {/* Waveform */}
        <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          {isActive ? (
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="wave-bar" style={{ height: 8 }} />
            ))
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
              ))}
            </div>
          )}
        </div>

        {/* Button + Ripples */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isActive && (
            <>
              <motion.div animate={{ scale: [1, 2.2], opacity: [0.6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: `2px solid ${cfg.color}` }} />
              <motion.div animate={{ scale: [1, 2.8], opacity: [0.4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: `1px solid ${cfg.color}` }} />
              <motion.div animate={{ scale: [1, 3.4], opacity: [0.25, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: `1px solid ${cfg.color}` }} />
            </>
          )}

          <motion.button
            id="voice-button"
            onClick={handleVoiceToggle}
            whileTap={{ scale: voiceState === 'idle' || voiceState === 'listening' ? 0.92 : 1 }}
            animate={{
              boxShadow: isActive
                ? [`0 0 0 0 ${cfg.glow}`, `0 0 60px 20px ${cfg.glow}`, `0 0 0 0 ${cfg.glow}`]
                : `0 0 40px rgba(124,58,237,0.3)`,
            }}
            transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
            style={{
              width: 120, height: 120, borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${cfg.color}ee, ${cfg.color}99)`,
              border: `2px solid ${cfg.color}88`,
              cursor: voiceState === 'processing' || voiceState === 'translating' || voiceState === 'speaking' ? 'not-allowed' : 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 6, zIndex: 2, color: 'white',
            }}
          >
            <AnimatePresence mode="wait">
              {voiceState === 'idle' && (
                <motion.div key="mic" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                  <Mic size={36} />
                </motion.div>
              )}
              {voiceState === 'listening' && (
                <motion.div key="listening" initial={{ scale: 0.8 }} animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                  <Mic size={36} />
                </motion.div>
              )}
              {(voiceState === 'processing' || voiceState === 'translating') && (
                <motion.div key="processing" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Zap size={36} />
                </motion.div>
              )}
              {voiceState === 'speaking' && (
                <motion.div key="speaking" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                  <MicOff size={36} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Status label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={voiceState}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              {cfg.label}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {voiceState === 'idle'        ? `${fromLang.flag} ${fromLang.label} → ${toLang.flag} ${toLang.label}` :
               voiceState === 'listening'   ? ui.speakNow :
               voiceState === 'processing'  ? ui.sendingToBrain :
               voiceState === 'translating' ? `${ui.translating} ${toLang.label} 🌐` :
               `${ui.speaking} ${toLang.label} 🔊`}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Quick Actions ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ paddingBottom: 100, display: 'flex', gap: 10 }}
      >
        {[
          { id: 'quick-type',    icon: '⌨️', label: ui.typeInstead },
          { id: 'quick-history', icon: '📋', label: ui.history },
        ].map((action) => (
          <motion.button
            id={action.id}
            key={action.id}
            onClick={() => {
              if (action.id === 'quick-type') onNavigate?.('conversation');
              if (action.id === 'quick-history') {
                if (typeof window !== 'undefined') localStorage.setItem('vb_settings_init_tab', 'history');
                onNavigate?.('settings');
              }
            }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
            style={{ flex: 1, padding: '10px 8px', fontSize: 11, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
          >
            <span style={{ fontSize: 18 }}>{action.icon}</span>
            {action.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
