'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, Check, ArrowRight } from 'lucide-react';
import { LANGUAGES } from '@/lib/languages';
import { useVoice } from '@/context/VoiceContext';
import { useAuth } from '@/context/AuthContext';

export default function LanguageSetupModal({ onComplete }: { onComplete: () => void }) {
  const { setFromLang } = useVoice();
  const { user, updateUser } = useAuth();
  const [selected, setSelected] = useState(LANGUAGES[0]); // Default English
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  // Memoize filtered list to avoid re-calculating on every render
  const filteredLanguages = useMemo(() => {
    if (!search) return LANGUAGES;
    return LANGUAGES.filter(l => 
      l.label.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Define popular languages for quick access
  const popularLanguages = useMemo(() => 
    LANGUAGES.filter(l => ['en', 'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'gu', 'bn'].includes(l.code)),
    []
  );

  const handleFinish = async () => {
    setSaving(true);
    setFromLang(selected);
    // Sync to profile metadata (Don't await to keep it fast)
    updateUser({ name: user?.name || '', avatar: user?.avatar || '👤' })
      .catch(err => console.error(err));
    
    onComplete();
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1100,
        background: 'rgba(5, 8, 15, 0.96)',
        backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass"
        style={{
          width: '100%', maxWidth: 440,
          padding: '30px 24px', borderRadius: 32,
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(124, 58, 237, 0.2)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: 20, background: 'rgba(124,58,237,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
          color: '#a78bfa',
        }}>
          <Globe size={28} />
        </div>
        
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>Select Your Language</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
          Welcome, {user?.name}! Choose your primary language to get started.
        </p>

        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input 
            type="text" 
            placeholder="Search 60+ languages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px', borderRadius: 16,
              border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(255,255,255,0.03)',
              color: 'white', fontSize: 15, outline: 'none',
              fontFamily: 'Inter, sans-serif'
            }}
          />
        </div>

        <div style={{ maxHeight: 320, overflowY: 'auto', paddingRight: 4, textAlign: 'left' }} className="custom-scrollbar">
          {!search && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Popular</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {popularLanguages.map(lang => (
                  <button
                    key={`pop-${lang.code}`}
                    onClick={() => setSelected(lang)}
                    style={{
                      padding: '12px 10px', borderRadius: 14, border: '1px solid',
                      borderColor: selected.code === lang.code ? '#7c3aed' : 'rgba(255,255,255,0.08)',
                      background: selected.code === lang.code ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                      color: selected.code === lang.code ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{lang.flag}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
            {search ? 'Search Results' : 'All Languages'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            {filteredLanguages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang)}
                style={{
                  padding: '12px 10px', borderRadius: 14, border: '1px solid',
                  borderColor: selected.code === lang.code ? '#7c3aed' : 'rgba(255,255,255,0.08)',
                  background: selected.code === lang.code ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                  color: selected.code === lang.code ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{ fontSize: 20 }}>{lang.flag}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleFinish}
          disabled={saving}
          className="btn-primary"
          style={{ 
            width: '100%', padding: '16px', borderRadius: 20, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontSize: 16, marginTop: 24,
          }}
        >
          {saving ? 'Setting up...' : 'Continue to Tutorial'}
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
}
