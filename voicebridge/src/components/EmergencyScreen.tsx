'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Phone, MapPin, Mic, AlertTriangle, Shield, Siren, Volume2, MessageSquare } from 'lucide-react';

const EMERGENCY_PHRASES = [
  { en: 'I need help', hi: 'मुझे मदद चाहिए', es: 'Necesito ayuda', ar: 'أحتاج مساعدة', zh: '我需要帮助' },
  { en: 'Call an ambulance', hi: 'एम्बुलेंस बुलाओ', es: 'Llama una ambulancia', ar: 'اتصل بسيارة إسعاف', zh: '叫救护车' },
  { en: 'I am lost', hi: 'मैं खो गया हूँ', es: 'Estoy perdido', ar: 'لقد ضعت', zh: '我迷路了' },
  { en: 'I cannot breathe', hi: 'मुझे सांस नहीं आ रही', es: 'No puedo respirar', ar: 'لا أستطيع التنفس', zh: '我无法呼吸' },
  { en: 'I have an allergy', hi: 'मुझे एलर्जी है', es: 'Tengo alergia', ar: 'لدي حساسية', zh: '我有过敏' },
];

const LANG_LABELS: { [key: string]: string } = {
  en: '🇬🇧 EN', hi: '🇮🇳 HI', es: '🇪🇸 ES', ar: '🇸🇦 AR', zh: '🇨🇳 ZH',
};

export default function EmergencyScreen() {
  const [activeLang, setActiveLang] = useState<'en' | 'hi' | 'es' | 'ar' | 'zh'>('en');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [locationSent, setLocationSent] = useState(false);
  const [speakingPhrase, setSpeakingPhrase] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleCall = () => {
    setIsCallActive(true);
    setTimeout(() => setIsCallActive(false), 4000);
  };

  const handleLocation = () => {
    setLocationSent(true);
    setTimeout(() => setLocationSent(false), 3000);
  };

  const handleSpeakPhrase = (phrase: string) => {
    setSpeakingPhrase(phrase);
    setTimeout(() => setSpeakingPhrase(null), 2000);
  };

  const handleSpeak = () => {
    setIsRecording(true);
    setTimeout(() => setIsRecording(false), 3000);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '24px 20px 16px',
          background: 'linear-gradient(180deg, rgba(220,38,38,0.12) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(239,68,68,0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(239,68,68,0.5)',
            }}
          >
            <AlertTriangle size={18} color="white" />
          </motion.div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fca5a5' }}>Emergency Mode</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: 3, background: '#ef4444' }}
              />
              <span style={{ fontSize: 11, color: '#f87171', fontWeight: 500 }}>ACTIVE — Help is available</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ flex: 1, padding: '16px 20px 100px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Main Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
        >
          {/* Call Help */}
          <motion.button
            id="call-help-btn"
            whileTap={{ scale: 0.94 }}
            onClick={handleCall}
            animate={isCallActive ? { scale: [1, 1.03, 1] } : {}}
            transition={{ repeat: isCallActive ? Infinity : 0, duration: 0.6 }}
            style={{
              height: 100, borderRadius: 20, border: 'none', cursor: 'pointer',
              background: isCallActive
                ? 'linear-gradient(135deg, #16a34a, #15803d)'
                : 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 8, fontWeight: 700, fontSize: 14,
              boxShadow: isCallActive
                ? '0 0 30px rgba(34,197,94,0.5)'
                : '0 0 25px rgba(220,38,38,0.4)',
              transition: 'all 0.3s',
            }}
          >
            <Phone size={24} />
            {isCallActive ? 'Calling 112…' : 'Call Help'}
          </motion.button>

          {/* Send Location */}
          <motion.button
            id="send-location-btn"
            whileTap={{ scale: 0.94 }}
            onClick={handleLocation}
            style={{
              height: 100, borderRadius: 20, border: 'none', cursor: 'pointer',
              background: locationSent
                ? 'linear-gradient(135deg, #1d4ed8, #1e40af)'
                : 'linear-gradient(135deg, #ea580c, #c2410c)',
              color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 8, fontWeight: 700, fontSize: 14,
              boxShadow: locationSent
                ? '0 0 30px rgba(29,78,216,0.5)'
                : '0 0 25px rgba(234,88,12,0.4)',
              transition: 'all 0.3s',
            }}
          >
            <MapPin size={24} />
            {locationSent ? '✓ Sent!' : 'Send Location'}
          </motion.button>
        </motion.div>

        {/* Speak Emergency Message */}
        <motion.button
          id="speak-emergency-btn"
          whileTap={{ scale: 0.97 }}
          onClick={handleSpeak}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            height: 64, borderRadius: 20, border: '1px solid rgba(239,68,68,0.4)', cursor: 'pointer',
            background: isRecording ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.08)',
            color: '#fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontWeight: 700, fontSize: 15,
            boxShadow: isRecording ? '0 0 30px rgba(239,68,68,0.3)' : 'none',
            transition: 'all 0.3s',
          }}
        >
          <motion.div animate={isRecording ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
            <Mic size={22} />
          </motion.div>
          {isRecording ? 'Recording emergency message…' : 'Speak Emergency Message'}
        </motion.button>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: '#f87171', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            Select Language
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {Object.entries(LANG_LABELS).map(([code, label]) => (
              <motion.button
                key={code}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveLang(code as typeof activeLang)}
                style={{
                  flex: 1, padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                  background: activeLang === code ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.04)',
                  color: activeLang === code ? '#fca5a5' : 'var(--text-muted)',
                  boxShadow: activeLang === code ? '0 0 10px rgba(239,68,68,0.2)' : 'none',
                  transition: 'all 0.25s',
                }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Emergency Phrases */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: '#f87171', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            Quick Phrases
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EMERGENCY_PHRASES.map((phrase, i) => (
              <motion.button
                id={`phrase-${i}`}
                key={i}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSpeakPhrase(phrase[activeLang])}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.3 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 16,
                  background: speakingPhrase === phrase[activeLang] ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${speakingPhrase === phrase[activeLang] ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171',
                }}>
                  <Volume2 size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {phrase[activeLang]}
                  </div>
                  {activeLang !== 'en' && (
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{phrase.en}</div>
                  )}
                </div>
                <div style={{ color: speakingPhrase === phrase[activeLang] ? '#f87171' : 'var(--text-muted)' }}>
                  {speakingPhrase === phrase[activeLang] ? (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                      <Volume2 size={16} />
                    </motion.div>
                  ) : (
                    <MessageSquare size={14} />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            padding: '12px 16px', borderRadius: 16,
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}
        >
          <Shield size={14} style={{ color: '#f87171', flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 11, color: '#f87171', lineHeight: 1.6, opacity: 0.8 }}>
            Emergency mode sends your location and pre-filled messages to your emergency contact. Always call local emergency services (112/911) for immediate danger.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
