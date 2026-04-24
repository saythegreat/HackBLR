'use client';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { User, Bell, LogOut, ChevronRight, Clock, Check, Edit2, Search, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useVoice } from '@/context/VoiceContext';
import { LANGUAGES as LANG_LIST } from '@/lib/languages';
import { getUIStrings } from '@/lib/uiTranslations';

const VOICE_OPTIONS = [
  { id: 'nova',    label: 'Nova',   tag: 'AI',      description: 'Warm, conversational AI voice',       icon: '🤖' },
  { id: 'female',  label: 'Aria',   tag: 'Female',   description: 'Clear, professional female voice',    icon: '👩' },
  { id: 'male',    label: 'Atlas',  tag: 'Male',     description: 'Deep, authoritative male voice',      icon: '👨' },
  { id: 'neutral', label: 'Sage',   tag: 'Neutral',  description: 'Gender-neutral, calm voice',          icon: '🧘' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LanguageSettingsTab({ fromLang, toLang, setFromLang, setToLang, ui }: any) {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<'from' | 'to'>('from');

  const filtered = useMemo(() => LANG_LIST.filter(l => 
    l.label.toLowerCase().includes(search.toLowerCase()) || 
    l.code.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {/* Selector Mode */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4 }}>
        <button 
          onClick={() => setMode('from')}
          style={{ 
            flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: mode === 'from' ? 'rgba(124,58,237,0.2)' : 'transparent',
            color: mode === 'from' ? '#c084fc' : 'var(--text-muted)',
            fontSize: 12, fontWeight: 600, transition: 'all 0.2s'
          }}
        >
          {ui.fromLabel}
        </button>
        <button 
          onClick={() => setMode('to')}
          style={{ 
            flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: mode === 'to' ? 'rgba(124,58,237,0.2)' : 'transparent',
            color: mode === 'to' ? '#c084fc' : 'var(--text-muted)',
            fontSize: 12, fontWeight: 600, transition: 'all 0.2s'
          }}
        >
          {ui.toLabel}
        </button>
      </div>

      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#080b14', paddingBottom: 16 }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }} />
          <input 
            placeholder={ui.searchLanguages}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              width: '100%', padding: '12px 12px 12px 36px', borderRadius: 12, 
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'white', fontSize: 14, outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {filtered.map((lang) => {
          const isSelected = mode === 'from' ? fromLang.code === lang.code : toLang.code === lang.code;
          return (
            <div
              key={lang.code}
              onClick={() => { mode === 'from' ? setFromLang(lang) : setToLang(lang); }}
              className={`glass glass-hover ${isSelected ? 'selected' : ''}`}
              style={{ 
                padding: '12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                borderColor: isSelected ? 'rgba(124,58,237,0.5)' : undefined,
                background: isSelected ? 'rgba(124,58,237,0.1)' : undefined,
              }}
            >
              <span style={{ fontSize: 20 }}>{lang.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lang.label}</div>
              </div>
              {isSelected && <Check size={14} color="#c084fc" />}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function SettingsScreen() {
  const { user, sessions, totalMinutes, totalLanguages, logout } = useAuth();
  const { fromLang, toLang, setFromLang, setToLang, sessionCount } = useVoice();
  const ui = getUIStrings(fromLang.label);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateProfile = async () => {
    if (!editName.trim()) return;
    setIsSaving(true);
    await updateUser({ name: editName });
    setIsSaving(false);
    setIsEditing(false);
  };

  const [selectedVoice, setSelectedVoiceState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vb_voice_id') || 'nova';
    }
    return 'nova';
  });

  const setSelectedVoice = (id: string) => {
    setSelectedVoiceState(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vb_voice_id', id);
    }
  };

  const [activeTab, setActiveTab] = useState<'profile' | 'voice' | 'languages' | 'history'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('vb_settings_init_tab');
      if (stored) {
        localStorage.removeItem('vb_settings_init_tab');
        return stored as 'history';
      }
    }
    return 'profile';
  });
  const [notifications, setNotifications] = useState(true);

  const displaySessionCount = sessions.length > 0 ? sessions.length : sessionCount;
  const displayMinutes = totalMinutes > 0 ? totalMinutes : 0;
  const displayLanguages = totalLanguages > 0 ? totalLanguages : 2;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '24px 20px 0' }}
      >
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))',
          border: '1px solid rgba(124,58,237,0.3)', borderRadius: 24, padding: '20px',
          marginBottom: 20, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent)',
          }} />
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 60, height: 60, borderRadius: 20,
              background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            }}>
              {user?.avatar ?? '👤'}
            </div>
            <div style={{ flex: 1 }}>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                    style={{
                      background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 8, padding: '6px 10px', color: 'white', fontSize: 16, outline: 'none',
                      width: '100%'
                    }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isSaving}
                      style={{
                        padding: '4px 12px', borderRadius: 8, border: 'none', background: '#c084fc',
                        color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        opacity: isSaving ? 0.6 : 1
                      }}
                    >
                      {isSaving ? ui.saving : ui.save}
                    </button>
                    <button
                      onClick={() => { setIsEditing(false); setEditName(user?.name || ''); }}
                      style={{
                        padding: '4px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.1)',
                        color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      {ui.cancel}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700 }}>{user?.name ?? ui.guest}</h2>
                    <span className="pill pill-purple">{user?.plan ?? ui.free}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{user?.email ?? ''}</div>
                </>
              )}
              {!isEditing && (
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  {[
                    { label: ui.statSessions,  value: displaySessionCount.toString() },
                    { label: ui.statLanguages, value: displayLanguages.toString() },
                    { label: ui.minutes,   value: displayMinutes.toString() },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#c084fc' }}>{s.value}</div>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {!isEditing && (
              <motion.button
                id="edit-profile"
                onClick={() => setIsEditing(true)}
                whileTap={{ scale: 0.9 }}
                style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Edit2 size={14} />
              </motion.button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 4 }}>
          {(['profile', 'voice', 'languages', 'history'] as const).map((tab) => {
            const tabLabels = {
              profile: ui.profileTab, voice: ui.voiceTab,
              languages: ui.languagesTab, history: ui.historyTab,
            };
            const tabIcons = { profile: '👤', voice: '🎙️', languages: '🌐', history: '📋' };
            return (
              <motion.button
                key={tab}
                id={`tab-${tab}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: activeTab === tab ? 'rgba(124,58,237,0.2)' : 'transparent',
                  color: activeTab === tab ? '#c084fc' : 'var(--text-muted)',
                  fontWeight: 600, fontSize: 11, transition: 'all 0.25s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                }}
              >
                <span>{tabIcons[tab]}</span>
                <span>{tabLabels[tab]}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div style={{ padding: '0 20px 100px', flex: 1, overflowY: 'auto' }}>

        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {[
              { id: 'notifications', icon: <Bell size={16} />, label: ui.notifications, desc: ui.sessionReminders, value: notifications ? ui.toggleOn : ui.toggleOff, onClick: () => setNotifications(v => !v) },
              { id: 'privacy',       icon: <User size={16} />, label: ui.privacyData, desc: ui.controlData, value: ui.view },
            ].map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div
                  role="button"
                  id={item.id}
                  onClick={item.onClick}
                  className="glass glass-hover"
                  style={{ marginBottom: 8, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(124,58,237,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.value}</span>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              </motion.div>
            ))}

            <motion.button
              id="sign-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.97 }}
              onClick={logout}
              className="btn-secondary"
              style={{
                width: '100%', padding: '14px', fontSize: 13, marginTop: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                color: '#f87171', border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <LogOut size={14} />
              {ui.signOut}
            </motion.button>
          </motion.div>
        )}

        {activeTab === 'voice' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>{ui.voiceSelection}</div>
            {VOICE_OPTIONS.map((voice, i) => (
              <motion.div key={voice.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <div
                  role="button"
                  id={`voice-${voice.id}`}
                  onClick={() => setSelectedVoice(voice.id)}
                  className="glass"
                  style={{
                    marginBottom: 8, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                    borderColor: selectedVoice === voice.id ? 'rgba(124,58,237,0.5)' : undefined,
                    background: selectedVoice === voice.id ? 'rgba(124,58,237,0.1)' : undefined,
                    transition: 'all 0.25s',
                  }}
                >
                  <div style={{ fontSize: 28 }}>{voice.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{voice.label}</span>
                      <span className="pill pill-purple" style={{ fontSize: 9 }}>{voice.tag}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{voice.description}</div>
                  </div>
                  {selectedVoice === voice.id && (
                    <div style={{ width: 22, height: 22, borderRadius: 11, background: 'linear-gradient(135deg, #7c3aed, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} color="white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Languages Tab ── */}
        {activeTab === 'languages' && <LanguageSettingsTab fromLang={fromLang} toLang={toLang} setFromLang={setFromLang} setToLang={setToLang} ui={ui} />}

        {/* ── History Tab ── */}
        {activeTab === 'history' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>{ui.recentSessions}</div>
            {sessions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: 14 }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎙️</div>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>{ui.noSessionsYet}</div>
                <div style={{ fontSize: 12, lineHeight: 1.6 }}>
                  {ui.noSessionsHint}
                </div>
              </motion.div>
            ) : (
              sessions.map((session, i) => (
                <motion.div key={session.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <div className="glass glass-hover" style={{ marginBottom: 8, padding: '14px 16px', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                          {session.fromFlag} {session.from} → {session.toFlag} {session.to}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{session.time}</div>
                      </div>
                      <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span className="pill pill-purple" style={{ alignItems: 'center', gap: 4 }}>
                        <Clock size={9} />{session.duration}
                      </span>
                      <span className="pill pill-blue">
                        {session.messages} {ui.msgs}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            {sessions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: 12 }}
              >
                {sessions.length} total sessions • {displayMinutes} minutes translated
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
