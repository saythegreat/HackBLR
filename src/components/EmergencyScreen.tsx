'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTTS } from '@/hooks/useTTS';
import { useVoice } from '@/context/VoiceContext';
import { Phone, MapPin, Mic, AlertTriangle, Shield, Volume2, MessageSquare, Lock } from 'lucide-react';
import { LANGUAGES as LANG_LIST } from '@/lib/languages';
import { getUIStrings } from '@/lib/uiTranslations';

const EMERGENCY_PHRASES: Record<string, string>[] = [
  { en: 'I need help', hi: 'मुझे मदद चाहिए', es: 'Necesito ayuda', ar: 'أحتاج مساعدة', zh: '我需要帮助', bn: 'আমার সাহায্য দরকার', ta: 'எனக்கு உதவி வேண்டும்', te: 'నాకు సహాయం కావాలి', kn: 'ನನಗೆ ಸಹಾಯ ಬೇಕು', ml: 'എനിക്ക് സഹായം വേണം', mr: 'मला मदत हवी आहे', gu: 'મને મદદ જોઈએ છે', pa: 'ਮੈਨੂੰ ਮਦਦ ਚਾਹੀਦੀ ਹੈ', ur: 'مجھے مدد چاہیے', fr: "J'ai besoin d'aide", de: 'Ich brauche Hilfe', ja: '助けてください', ko: '도움이 필요합니다', pt: 'Preciso de ajuda', ru: 'Мне нужна помощь', it: 'Ho bisogno di aiuto', bg: 'Нуждая се от помощ' },
  { en: 'Call an ambulance', hi: 'एम्बुलेंस बुलाओ', es: 'Llame a una ambulancia', ar: 'اتصل بسيارة إسعاف', zh: '叫救护车', bn: 'অ্যাম্বুলেন্স ডাকুন', ta: 'ஆம்புலன்ஸ் அழைக்கவும்', te: 'అంబులెన్స్ పిలవండి', kn: 'ಅಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ', ml: 'ആംബുലൻസ് വിളിക്കൂ', mr: 'रुग्णवाहिका बोलवा', gu: 'એમ્બ્યુલન્સ બોલાવો', pa: 'ਐਂਬੂਲੈਂਸ ਬੁਲਾਓ', ur: 'ایمبولینس بلائیں', fr: 'Appelez une ambulance', de: 'Rufen Sie einen Krankenwagen', ja: '救急車を呼んでください', ko: '구급차를 불러주세요', pt: 'Chame uma ambulância', ru: 'Вызовите скорую', it: 'Chiama un\'ambulanza', bg: 'Повикайте линейка' },
  { en: 'I am lost', hi: 'मैं खो गया हूँ', es: 'Estoy perdido', ar: 'لقد ضعت', zh: '我迷路了', bn: 'আমি হারিয়ে গেছি', ta: 'நான் தொலைந்துவிட்டேன்', te: 'నేను దారి తప్పాను', kn: 'ನಾನು ಕಳೆದುಹೋಗಿದ್ದೇನೆ', ml: 'ഞാൻ വഴിതെറ്റി', mr: 'मी हरवलो आहे', gu: 'હું ખોવાઈ ગયો છું', pa: 'ਮੈਂ ਗੁੰਮ ਹੋ ਗਿਆ ਹਾਂ', ur: 'میں کھو گیا ہوں', fr: 'Je suis perdu', de: 'Ich habe mich verirrt', ja: '道に迷いました', ko: '길을 잃었어요', pt: 'Estoy perdido', ru: 'Я потерялся', it: 'Mi sono perso', bg: 'Загубих се' },
  { en: 'I cannot breathe', hi: 'मुझे सांस नहीं आ रही', es: 'No puedo respirar', ar: 'لا أستطيع التنفس', zh: '我无法呼吸', bn: 'আমি শ্বাস নিতে পারছি না', ta: 'என்னால் சுவாசிக்க முடியவில்லை', te: 'నాకు ఊపిరి ఆడటం లేదు', kn: 'ನನಗೆ ಉसीರಾಡಲು ಆಗುತ್ತಿಲ್ಲ', ml: 'എനിക്ക് ശ്വസിക്കാൻ കഴിയുന്നില്ല', mr: 'मला श्वास घेता येत नाही', gu: 'મને શ્વાસ લેવામાં તકલીફ થાય છે', pa: 'ਮੈਨੂੰ ਸਾਹ ਨਹੀਂ ਆ ਰਿਹਾ', ur: 'مجھے سانس نہیں آ رہی', fr: 'Je ne peux pas respirer', de: 'Ich kann nicht atmen', ja: '息ができません', ko: '숨을 쉴 수가 없어요', pt: 'Não consigo respirar', ru: 'Я не могу дышать', it: 'Non riesco a respirare', bg: 'Не мога да дишам' },
  { en: 'I have an allergy', hi: 'मुझे एलर्जी है', es: 'Tengo una alergia', ar: 'لدي حساسية', zh: '我有过敏', bn: 'আমার অ্যালার্জি আছে', ta: 'எனக்கு ஒவ்வாமை உள்ளது', te: 'నాకు అలర్జీ ఉంది', kn: 'ನನಗೆ ಅಲರ್ಜಿ ಇದೆ', ml: 'എനിക്ക് അലർജിയുണ്ട്', mr: 'मला ऍलर्जी आहे', gu: 'મને એલર્જી છે', pa: 'ਮੈਨੂੰ ਐਲਰਜੀ ਹੈ', ur: 'مجھے الرجی ہے', fr: 'J\'ai une allergie', de: 'Ich habe eine Allergie', ja: 'アレルギーがあります', ko: '알레르기가 있습니다', pt: 'Tenho uma alergia', ru: 'У меня аллергия', it: 'Ho un\'allergia', bg: 'Имам алергия' },
];


export default function EmergencyScreen() {
  const { fromLang } = useVoice();
  const ui = getUIStrings(fromLang.label);

  const [activeLang, setActiveLang] = useState<string>(fromLang?.code || 'en');
  const [isCallActive, setIsCallActive] = useState(false);
  const [locationSent, setLocationSent] = useState(false);
  const [speakingPhrase, setSpeakingPhrase] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  useEffect(() => {
    if (fromLang?.code) {
      setActiveLang(fromLang.code);
    }
  }, [fromLang?.code]);

  const activeLangLabel = LANG_LIST.find(l => l.code === activeLang)?.label || 'English';
  const activeUi = getUIStrings(activeLangLabel);
  const englishUi = getUIStrings('English');
  
  const { speak } = useTTS({
    onStart: () => {},
    onEnd: () => setSpeakingPhrase(null),
  });

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
    const selectedLangObj = LANG_LIST.find(l => l.code === activeLang) || LANG_LIST[0];
    speak(phrase, selectedLangObj.label);
  };

  const handleSpeak = () => {
    setIsRecording(true);
    setTimeout(() => setIsRecording(false), 3000);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
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
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fca5a5' }}>{ui.emergencyTitle}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: 3, background: '#ef4444' }}
              />
              <span style={{ fontSize: 11, color: '#f87171', fontWeight: 500 }}>{ui.emergencyActive}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ flex: 1, padding: '16px 20px 100px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
        >
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
            {isCallActive ? ui.emergencyCalling : ui.emergencyCallHelp}
          </motion.button>

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
            {locationSent ? ui.emergencySent : ui.emergencySendLocation}
          </motion.button>
        </motion.div>

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
          {isRecording ? ui.emergencyRecording : ui.emergencySpeakMsg}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: '#f87171', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            {ui.emergencySelectLang}
          </div>
          <div style={{ position: 'relative' }}>
            <select
              value={activeLang}
              onChange={(e) => setActiveLang(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.1)',
                color: '#fca5a5',
                fontSize: 14,
                fontWeight: 600,
                appearance: 'none',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {LANG_LIST.map((lang) => (
                <option key={lang.code} value={lang.code} style={{ background: '#1c1c1c', color: '#fca5a5' }}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
            <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#fca5a5' }}>
              ▼
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: '#f87171', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            {ui.emergencyQuickPhrases}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {activeUi.quickPhrases.map((translatedPhrase, i) => {
              const englishPhrase = englishUi.quickPhrases[i] || '';
              return (
              <motion.button
                id={`phrase-${i}`}
                key={i}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSpeakPhrase(translatedPhrase)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.3 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 16,
                  background: speakingPhrase === translatedPhrase ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${speakingPhrase === translatedPhrase ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'}`,
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
                    {translatedPhrase}
                  </div>
                  {translatedPhrase !== englishPhrase && (
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{englishPhrase}</div>
                  )}
                </div>
                <div style={{ color: speakingPhrase === translatedPhrase ? '#f87171' : 'var(--text-muted)' }}>
                  {speakingPhrase === translatedPhrase ? (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                      <Volume2 size={16} />
                    </motion.div>
                  ) : (
                    <MessageSquare size={14} />
                  )}
                </div>
              </motion.button>
              );
            })}
          </div>
        </motion.div>

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
            {ui.emergencyNotice}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            padding: '12px 16px', borderRadius: 16,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}
        >
          <Lock size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{ui.emergencyPrivacy}</h3>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {ui.emergencyPrivacyDesc}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
