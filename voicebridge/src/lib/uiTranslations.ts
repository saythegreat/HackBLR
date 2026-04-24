// UI translations — lazy loaded as a module (43KB, not needed at startup)
export interface UIStrings {
  navHome: string; navChat: string; navAccess: string; navSOS: string; navProfile: string;
  appTagline: string; aiReady: string;
  statSessions: string; statLanguages: string; statAccuracy: string;
  tapToSpeak: string; listening: string; processing: string; translating: string; speaking: string;
  speakNow: string; sendingToBrain: string; typeInstead: string; history: string;
  fromLabel: string; toLabel: string;
  conversationTitle: string; noMessages: string; noMessagesHint: string;
  clearBtn: string; typeMessage: string; processingDots: string;
  originalLabel: string; translationLabel: string;
  playBtn: string; copyBtn: string; copiedBtn: string;
  quickPhrases: string[];
  profileTab: string; voiceTab: string; languagesTab: string; historyTab: string;
  signOut: string; noSessionsYet: string; noSessionsHint: string; recentSessions: string;
  primaryLang: string; targetLang: string; voiceSelection: string;
  notifications: string; privacyData: string; editProfile: string;
  accessTitle: string; accessSubtitle: string; activeLabel: string; resetDefaults: string; autoSaved: string;
  catAll: string; catVoice: string; catDisplay: string; catAccess: string;
  toggleOn: string; toggleOff: string;
  optSpeechCorr: string; optSpeechCorrDesc: string; optAutoSpeak: string; optAutoSpeakDesc: string;
  optSlowSpeech: string; optSlowSpeechDesc: string; optHighContrast: string; optHighContrastDesc: string;
  optAudioFeedback: string; optAudioFeedbackDesc: string; optDyslexiaFont: string; optDyslexiaFontDesc: string;
  emergencyTitle: string;
}

const EN: UIStrings = {
  navHome: 'HOME', navChat: 'CHAT', navAccess: 'ACCESS', navSOS: 'SOS', navProfile: 'PROFILE',
  appTagline: 'Your voice, understood everywhere', aiReady: 'AI Ready',
  statSessions: 'Sessions', statLanguages: 'Languages', statAccuracy: 'Accuracy',
  tapToSpeak: 'Tap to speak', listening: 'Listening…', processing: 'Processing…',
  translating: 'Translating…', speaking: 'Speaking…',
  speakNow: "Speak now — I'm all ears 👂", sendingToBrain: 'Sending to AI brain ✨',
  typeInstead: 'Type instead', history: 'History', fromLabel: 'From', toLabel: 'To',
  conversationTitle: 'Conversation', noMessages: 'No messages yet',
  noMessagesHint: 'Go to Home and tap the mic button, or type below to start translating.',
  clearBtn: 'Clear', typeMessage: 'Type a message or use the mic…', processingDots: 'Processing…',
  originalLabel: 'Original', translationLabel: 'Translation',
  playBtn: 'Play', copyBtn: 'Copy', copiedBtn: 'Copied!',
  quickPhrases: ['Where is the hospital?', 'I need help', 'Thank you', 'Call an ambulance'],
  profileTab: 'Profile', voiceTab: 'Voice', languagesTab: 'Languages', historyTab: 'History',
  signOut: 'Sign Out', noSessionsYet: 'No sessions yet',
  noSessionsHint: 'Complete a translation on the Home screen to see your history here.',
  recentSessions: 'Recent Sessions', primaryLang: 'Primary Language', targetLang: 'Target Language',
  voiceSelection: 'Voice Selection', notifications: 'Notifications', privacyData: 'Privacy & Data',
  editProfile: 'Edit',
  accessTitle: 'Accessibility', accessSubtitle: 'Customize for your needs',
  activeLabel: 'Active', resetDefaults: 'Reset to Defaults',
  autoSaved: 'Settings are saved automatically and applied immediately.',
  catAll: 'All', catVoice: 'Voice', catDisplay: 'Display', catAccess: 'Access',
  toggleOn: 'On', toggleOff: 'Off',
  optSpeechCorr: 'Speech Correction', optSpeechCorrDesc: 'Auto-fix grammar and pronunciation errors in real time',
  optAutoSpeak: 'Auto-Speak', optAutoSpeakDesc: 'Automatically speak translation output aloud',
  optSlowSpeech: 'Slow Speech', optSlowSpeechDesc: 'Speak output at a slower rate for clarity',
  optHighContrast: 'High Contrast', optHighContrastDesc: 'Increase visual contrast for better visibility',
  optAudioFeedback: 'Audio Feedback', optAudioFeedbackDesc: 'Sound effects for app interactions',
  optDyslexiaFont: 'Dyslexia Font', optDyslexiaFontDesc: 'Font optimized for easier reading',
  emergencyTitle: 'Emergency',
};

const HI: UIStrings = {
  navHome: 'होम', navChat: 'चैट', navAccess: 'सुविधा', navSOS: 'आपात', navProfile: 'प्रोफ़ाइल',
  appTagline: 'आपकी आवाज़, हर जगह समझी जाती है', aiReady: 'AI तैयार',
  statSessions: 'सत्र', statLanguages: 'भाषाएँ', statAccuracy: 'सटीकता',
  tapToSpeak: 'बोलने के लिए टैप करें', listening: 'सुन रहा है…', processing: 'प्रोसेस हो रहा है…',
  translating: 'अनुवाद हो रहा है…', speaking: 'बोल रहा है…',
  speakNow: 'अब बोलें — मैं सुन रहा हूँ 👂', sendingToBrain: 'AI को भेजा जा रहा है ✨',
  typeInstead: 'टाइप करें', history: 'इतिहास', fromLabel: 'से', toLabel: 'को',
  conversationTitle: 'बातचीत', noMessages: 'अभी कोई संदेश नहीं',
  noMessagesHint: 'होम जाएं और माइक बटन दबाएं, या नीचे टाइप करें।',
  clearBtn: 'साफ करें', typeMessage: 'संदेश टाइप करें या माइक उपयोग करें…', processingDots: 'प्रोसेस हो रहा है…',
  originalLabel: 'मूल', translationLabel: 'अनुवाद',
  playBtn: 'चलाएं', copyBtn: 'कॉपी', copiedBtn: 'कॉपी हो गया!',
  quickPhrases: ['अस्पताल कहाँ है?', 'मुझे मदद चाहिए', 'धन्यवाद', 'एम्बुलेंस बुलाओ'],
  profileTab: 'प्रोफ़ाइल', voiceTab: 'आवाज़', languagesTab: 'भाषाएँ', historyTab: 'इतिहास',
  signOut: 'साइन आउट', noSessionsYet: 'अभी कोई सत्र नहीं',
  noSessionsHint: 'होम स्क्रीन पर अनुवाद करें और यहाँ इतिहास देखें।',
  recentSessions: 'हालिया सत्र', primaryLang: 'प्राथमिक भाषा', targetLang: 'लक्ष्य भाषा',
  voiceSelection: 'आवाज़ चुनें', notifications: 'सूचनाएँ', privacyData: 'गोपनीयता और डेटा',
  editProfile: 'संपादित करें',
  accessTitle: 'सुलभता', accessSubtitle: 'अपनी ज़रूरत के अनुसार अनुकूलित करें',
  activeLabel: 'सक्रिय', resetDefaults: 'डिफ़ॉल्ट पर रीसेट करें',
  autoSaved: 'सेटिंग्स स्वचालित रूप से सहेजी और लागू की जाती हैं।',
  catAll: 'सभी', catVoice: 'आवाज़', catDisplay: 'दृश्य', catAccess: 'पहुंच',
  toggleOn: 'चालू', toggleOff: 'बंद',
  optSpeechCorr: 'भाषण सुधार', optSpeechCorrDesc: 'व्याकरण और उच्चारण त्रुटियों को वास्तविक समय में सुधारें',
  optAutoSpeak: 'स्वतः-भाषण', optAutoSpeakDesc: 'अनुवादित आउटपुट को स्वचालित रूप से बोलें',
  optSlowSpeech: 'धीमी आवाज़', optSlowSpeechDesc: 'स्पष्टता के लिए धीमी गति से बोलें',
  optHighContrast: 'उच्च कंट्रास्ट', optHighContrastDesc: 'बेहतर दृश्यता के लिए रंग कंट्रास्ट बढ़ाएँ',
  optAudioFeedback: 'ऑडियो प्रतिक्रिया', optAudioFeedbackDesc: 'ऐप कार्यों के लिए ध्वनि प्रभाव',
  optDyslexiaFont: 'डिस्लेक्सिया फ़ॉन्ट', optDyslexiaFontDesc: 'बेहतर ढंग से पढ़ने के लिए विशेष फ़ॉन्ट',
  emergencyTitle: 'आपातकाल',
};

function makeSimple(base: Partial<UIStrings> = {}): UIStrings {
  return { ...EN, ...base };
}

const BN  = makeSimple({ navHome: 'হোম', tapToSpeak: 'কথা বলতে ট্যাপ করুন', listening: 'শুনছি…', translating: 'অনুবাদ হচ্ছে…', originalLabel: 'মূল', translationLabel: 'অনুবাদ', signOut: 'সাইন আউট', quickPhrases: ['হাসপাতাল কোথায়?', 'আমার সাহায্য দরকার', 'ধন্যবাদ', 'অ্যাম্বুলেন্স ডাকুন'] });
const TA  = makeSimple({ navHome: 'முகப்பு', tapToSpeak: 'பேச தட்டவும்', listening: 'கேட்கிறேன்…', translating: 'மொழிபெயர்க்கிறேன்…', originalLabel: 'அசல்', translationLabel: 'மொழிபெயர்ப்பு', signOut: 'வெளியேறு', quickPhrases: ['மருத்துவமனை எங்கே?', 'எனக்கு உதவி வேண்டும்', 'நன்றி', 'ஆம்புலன்ஸ் அழைக்கவும்'] });
const TE  = makeSimple({ navHome: 'హోమ్', tapToSpeak: 'మాట్లాడటానికి నొక్కండి', listening: 'వింటున్నాను…', translating: 'అనువదిస్తున్నాను…', originalLabel: 'అసలు', translationLabel: 'అనువాదం', signOut: 'సైన్ అవుట్', quickPhrases: ['ఆసుపత్రి ఎక్కడ?', 'నాకు సహాయం కావాలి', 'ధన్యవాదాలు', 'అంబులెన్స్ పిలవండి'] });
const KN  = makeSimple({ navHome: 'ಮನೆ', tapToSpeak: 'ಮಾತಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ', listening: 'ಕೇಳುತ್ತಿದ್ದೇನೆ…', translating: 'ಅನುವಾದ ಆಗುತ್ತಿದೆ…', originalLabel: 'ಮೂಲ', translationLabel: 'ಅನುವಾದ', signOut: 'ಸೈನ್ ಔಟ್', quickPhrases: ['ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', 'ನನಗೆ ಸಹಾಯ ಬೇಕು', 'ಧನ್ಯವಾದ', 'ಅಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ'] });
const ML  = makeSimple({ navHome: 'ഹോം', tapToSpeak: 'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക', listening: 'കേൾക്കുന്നു…', translating: 'വിവർത്തനം ചെയ്യുന്നു…', originalLabel: 'മൂലം', translationLabel: 'വിവർത്തനം', signOut: 'സൈൻ ഔട്ട്', quickPhrases: ['ആശുപത്രി എവിടെ?', 'എനിക്ക് സഹായം വേണം', 'നന്ദി', 'ആംബുലൻസ് വിളിക്കൂ'] });
const MR  = makeSimple({ navHome: 'होम', tapToSpeak: 'बोलण्यासाठी टॅप करा', listening: 'ऐकत आहे…', translating: 'भाषांतर होत आहे…', originalLabel: 'मूळ', translationLabel: 'भाषांतर', signOut: 'साइन आउट', quickPhrases: ['रुग्णालय कुठे आहे?', 'मला मदद हवी आहे', 'धन्यवाद', 'रुग्णवाहिका बोलवा'] });
const GU  = makeSimple({ navHome: 'હોમ', tapToSpeak: 'બોલવા માટે ટૅપ કરો', listening: 'સાંભળી રહ્યો છું…', translating: 'અનુવાદ થઈ રહ્યો છે…', originalLabel: 'મૂળ', translationLabel: 'અનુવાદ', signOut: 'સાઇન આઉટ', quickPhrases: ['હોસ્પિટલ ક્યાં છે?', 'મને મદદ જોઈએ છે', 'આભાર', 'એમ્બ્યુલન્સ બોલાવો'] });
const PA  = makeSimple({ navHome: 'ਘਰ', tapToSpeak: 'ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ', listening: 'ਸੁਣ ਰਿਹਾ ਹਾਂ…', translating: 'ਅਨੁਵਾਦ ਹੋ ਰਿਹਾ ਹੈ…', originalLabel: 'ਮੂਲ', translationLabel: 'ਅਨੁਵਾਦ', signOut: 'ਸਾਈਨ ਆਉਟ', quickPhrases: ['ਹਸਪਤਾਲ ਕਿੱਥੇ ਹੈ?', 'ਮੈਨੂੰ ਮਦਦ ਚਾਹੀਦੀ ਹੈ', 'ਧੰਨਵਾਦ', 'ਐਂਬੂਲੈਂਸ ਬੁਲਾਓ'] });
const UR  = makeSimple({ tapToSpeak: 'بولنے کے لیے ٹیپ کریں', listening: 'سن رہا ہوں…', translating: 'ترجمہ ہو رہا ہے…', originalLabel: 'اصل', translationLabel: 'ترجمہ', signOut: 'سائن آؤٹ', quickPhrases: ['ہسپتال کہاں ہے؟', 'مجھے مدد چاہیے', 'شکریہ', 'ایمبولینس بلائیں'] });
const ES  = makeSimple({ navHome: 'INICIO', appTagline: 'Tu voz, entendida en todas partes', tapToSpeak: 'Toca para hablar', listening: 'Escuchando…', translating: 'Traduciendo…', originalLabel: 'Original', translationLabel: 'Traducción', signOut: 'Cerrar sesión', clearBtn: 'Limpiar', quickPhrases: ['¿Dónde está el hospital?', 'Necesito ayuda', 'Gracias', 'Llamen a una ambulancia'] });
const FR  = makeSimple({ navHome: 'ACCUEIL', appTagline: 'Votre voix, comprise partout', tapToSpeak: 'Appuyez pour parler', listening: 'Écoute…', translating: 'Traduction…', originalLabel: 'Original', translationLabel: 'Traduction', signOut: 'Se déconnecter', quickPhrases: ["Où est l'hôpital ?", "J'ai besoin d'aide", 'Merci', 'Appelez une ambulance'] });
const DE  = makeSimple({ tapToSpeak: 'Zum Sprechen tippen', listening: 'Höre zu…', translating: 'Übersetze…', originalLabel: 'Original', translationLabel: 'Übersetzung', signOut: 'Abmelden', quickPhrases: ['Wo ist das Krankenhaus?', 'Ich brauche Hilfe', 'Danke', 'Rufen Sie einen Krankenwagen'] });
const JA  = makeSimple({ tapToSpeak: 'タップして話す', listening: '聞いています…', translating: '翻訳中…', originalLabel: '原文', translationLabel: '翻訳', signOut: 'サインアウト', quickPhrases: ['病院はどこですか？', '助けてください', 'ありがとう', '救急車を呼んでください'] });
const ZH  = makeSimple({ tapToSpeak: '点击说话', listening: '聆听中…', translating: '翻译中…', originalLabel: '原文', translationLabel: '翻译', signOut: '退出登录', quickPhrases: ['医院在哪里？', '我需要帮助', '谢谢', '请叫救护车'] });
const KO  = makeSimple({ tapToSpeak: '탭하여 말하기', listening: '듣는 중…', translating: '번역 중…', originalLabel: '원문', translationLabel: '번역', signOut: '로그아웃', quickPhrases: ['병원이 어디에 있나요?', '도움이 필요합니다', '감사합니다', '구급차를 불러주세요'] });
const AR  = makeSimple({ tapToSpeak: 'اضغط للتحدث', listening: 'أستمع…', translating: 'جارٍ الترجمة…', originalLabel: 'الأصل', translationLabel: 'الترجمة', signOut: 'تسجيل الخروج', quickPhrases: ['أين المستشفى؟', 'أحتاج مساعدة', 'شكرًا', 'اتصل بالإسعاف'] });
const PT  = makeSimple({ tapToSpeak: 'Toque para falar', listening: 'Ouvindo…', translating: 'Traduzindo…', originalLabel: 'Original', translationLabel: 'Tradução', signOut: 'Sair', quickPhrases: ['Onde fica o hospital?', 'Preciso de ajuda', 'Obrigado', 'Chame uma ambulância'] });
const RU  = makeSimple({ tapToSpeak: 'Нажмите, чтобы говорить', listening: 'Слушаю…', translating: 'Перевод…', originalLabel: 'Оригинал', translationLabel: 'Перевод', signOut: 'Выйти', quickPhrases: ['Где больница?', 'Мне нужна помощь', 'Спасибо', 'Вызовите скорую'] });
const SW  = makeSimple({ navHome: 'NYUMBANI', appTagline: 'Sauti yako, inaeleweka kila mahali', tapToSpeak: 'Gonga ili uzungumze', listening: 'Inasikiliza…', translating: 'Inatafsiri…', originalLabel: 'Asili', translationLabel: 'Tafsiri', signOut: 'Ondoka', quickPhrases: ['Hospitali iko wapi?', 'Nahitaji msaada', 'Asante', 'Piga simu kwa ambulansi'] });

// OPTIMIZATION: Use a plain object lookup (O(1)) instead of switch/if chain
export const UI_TRANSLATIONS: Record<string, UIStrings> = {
  English: EN, Hindi: HI, Bengali: BN, Tamil: TA, Telugu: TE,
  Kannada: KN, Malayalam: ML, Marathi: MR, Gujarati: GU, Punjabi: PA,
  Urdu: UR, Spanish: ES, French: FR, German: DE, Japanese: JA,
  Mandarin: ZH, Korean: KO, Arabic: AR, Portuguese: PT, Russian: RU, Swahili: SW,
};

// OPTIMIZATION: Memoize per-label lookups (hot path — called on every render of HomeScreen)
const uiStringCache = new Map<string, UIStrings>();

export function getUIStrings(langLabel: string): UIStrings {
  const cached = uiStringCache.get(langLabel);
  if (cached) return cached;
  const result = UI_TRANSLATIONS[langLabel] ?? EN;
  uiStringCache.set(langLabel, result);
  return result;
}
