import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Type, Volume2, Info, Languages, Contrast } from 'lucide-react';
import { useVoice } from '@/context/VoiceContext';
import { getUIStrings } from '@/lib/uiTranslations';
import { formatNumber } from '@/lib/utils';

interface ToggleOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  defaultOn?: boolean;
  category: string;
  accentColor?: string;
}

interface ToggleSwitchProps {
  id: string;
  isOn: boolean;
  onToggle: () => void;
  color?: string;
}

function ToggleSwitch({ id, isOn, onToggle, color = '#7c3aed' }: ToggleSwitchProps) {
  return (
    <motion.button
      id={id}
      role="switch"
      aria-checked={isOn}
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 52, height: 28, borderRadius: 14, flexShrink: 0,
        background: isOn ? `linear-gradient(135deg, ${color}, ${color}cc)` : 'rgba(255,255,255,0.08)',
        border: `1px solid ${isOn ? color + '55' : 'rgba(255,255,255,0.1)'}`,
        cursor: 'pointer', position: 'relative',
        boxShadow: isOn ? `0 0 15px ${color}44` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <motion.div
        animate={{ x: isOn ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          position: 'absolute', top: 3, left: 3,
          width: 20, height: 20, borderRadius: 10,
          background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        }}
      />
    </motion.button>
  );
}

const STORAGE_KEY = 'vb_accessibility_v1';

export default function AccessibilityScreen() {
  const { fromLang } = useVoice();
  const t = useMemo(() => getUIStrings(fromLang.label), [fromLang.label]);

  const categories = useMemo(() => [t.catAll, t.catVoice, t.catDisplay, t.catAccess], [t]);

  const OPTIONS: ToggleOption[] = useMemo(() => [
    {
      id: 'speech-correction',
      icon: <Mic size={18} />,
      label: t.optSpeechCorr,
      description: t.optSpeechCorrDesc,
      defaultOn: true,
      category: t.catVoice,
      accentColor: '#7c3aed',
    },
    {
      id: 'auto-speak',
      icon: <Volume2 size={18} />,
      label: t.optAutoSpeak,
      description: t.optAutoSpeakDesc,
      defaultOn: true,
      category: t.catVoice,
      accentColor: '#60a5fa',
    },
    {
      id: 'slow-speech',
      icon: <Languages size={18} />,
      label: t.optSlowSpeech,
      description: t.optSlowSpeechDesc,
      category: t.catVoice,
      accentColor: '#8b5cf6',
    },
    {
      id: 'high-contrast',
      icon: <Contrast size={18} />,
      label: t.optHighContrast,
      description: t.optHighContrastDesc,
      category: t.catDisplay,
      accentColor: '#6366f1',
    },
    {
      id: 'audio-feedback',
      icon: <Volume2 size={18} />,
      label: t.optAudioFeedback,
      description: t.optAudioFeedbackDesc,
      defaultOn: true,
      category: t.catAccess,
      accentColor: '#34d399',
    },
    {
      id: 'dyslexia-font',
      icon: <Type size={18} />,
      label: t.optDyslexiaFont,
      description: t.optDyslexiaFontDesc,
      category: t.catAccess,
      accentColor: '#fb923c',
    }
  ], [t]);

  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState(t.catAll);

  // Initialize toggles from defaults
  useEffect(() => {
    const initial = Object.fromEntries(OPTIONS.map(o => [o.id, o.defaultOn ?? false]));
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setToggles({ ...initial, ...parsed });
      } else {
        setToggles(initial);
      }
    } catch {
      setToggles(initial);
    }
  }, [OPTIONS]);

  // Handle lang change for category reset
  useEffect(() => {
    setActiveCategory(t.catAll);
  }, [t.catAll]);

  useEffect(() => {
    if (Object.keys(toggles).length === 0) return;

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(toggles)); } catch {/* ignore */}

    if (toggles['high-contrast']) {
      document.body.style.filter = 'contrast(1.25) brightness(1.05)';
    } else {
      document.body.style.filter = '';
    }

    if (toggles['dyslexia-font']) {
      document.body.style.fontFamily = 'Arial, Helvetica, sans-serif';
      document.body.style.letterSpacing = '0.05em';
      document.body.style.wordSpacing = '0.1em';
    } else {
      document.body.style.fontFamily = '';
      document.body.style.letterSpacing = '';
      document.body.style.wordSpacing = '';
    }

    if (toggles['slow-speech']) {
      localStorage.setItem('vb_tts_rate', '0.65');
    } else {
      localStorage.removeItem('vb_tts_rate');
    }
  }, [toggles]);

  const flipToggle = (id: string) => setToggles(prev => ({ ...prev, [id]: !prev[id] }));

  const filteredOptions = activeCategory === t.catAll ? OPTIONS : OPTIONS.filter(o => o.category === activeCategory);
  const enabledCount = Object.values(toggles).filter(Boolean).length;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '24px 20px 16px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{t.accessTitle}</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.accessSubtitle}</p>
          </div>
          <div className="glass" style={{ padding: '8px 14px', borderRadius: 12, textAlign: 'center', minWidth: 60 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#a78bfa' }}>
              {formatNumber(enabledCount, fromLang.label)}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.activeLabel}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                fontWeight: 600, fontSize: 12, transition: 'all 0.25s',
                background: activeCategory === cat ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)',
                color: activeCategory === cat ? '#c084fc' : 'var(--text-muted)',
                boxShadow: activeCategory === cat ? '0 0 12px rgba(124,58,237,0.2)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ margin: '0 20px 16px' }}
      >
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(99,102,241,0.08))',
          border: '1px solid rgba(124,58,237,0.25)', borderRadius: 16, padding: '12px 16px',
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <Info size={16} style={{ color: '#a78bfa', flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {t.autoSaved}
          </p>
        </div>
      </motion.div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px' }}>
        {filteredOptions.map((option, i) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{ marginBottom: 10 }}
          >
            <div
              className="glass glass-hover"
              style={{
                padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center',
                cursor: 'pointer',
                borderColor: toggles[option.id] ? `${option.accentColor}33` : undefined,
                background: toggles[option.id] ? `${option.accentColor}0a` : undefined,
              }}
              onClick={() => flipToggle(option.id)}
            >
              <motion.div
                animate={{ scale: toggles[option.id] ? 1.1 : 1 }}
                style={{
                  width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: toggles[option.id] ? `${option.accentColor}22` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${toggles[option.id] ? option.accentColor + '44' : 'transparent'}`,
                  color: toggles[option.id] ? option.accentColor : 'var(--text-muted)',
                  transition: 'all 0.3s',
                }}
              >
                {option.icon}
              </motion.div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{option.label}</span>
                  <span className={`pill pill-${toggles[option.id] ? 'green' : 'purple'}`} style={{ fontSize: 10 }}>
                    {toggles[option.id] ? t.toggleOn : t.toggleOff}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{option.description}</p>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, opacity: 0.6 }}>{option.category}</div>
              </div>

              <div onClick={e => e.stopPropagation()}>
                <ToggleSwitch
                  id={`toggle-${option.id}`}
                  isOn={toggles[option.id]}
                  onToggle={() => flipToggle(option.id)}
                  color={option.accentColor}
                />
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 8 }}
        >
          <button
            id="reset-accessibility"
            className="btn-secondary"
            style={{ width: '100%', padding: '14px', fontSize: 13, fontWeight: 500 }}
            onClick={() => setToggles(Object.fromEntries(OPTIONS.map(o => [o.id, o.defaultOn ?? false])))}
          >
            {t.resetDefaults}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
