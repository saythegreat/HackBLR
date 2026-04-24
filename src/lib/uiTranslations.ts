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
  loginSignIn: string; loginCreateAccount: string; loginWelcome: string; loginJoin: string;
  loginSubtitle: string; loginEmail: string; loginPassword: string; loginFullName: string;
  loginActionFailed: string; loginEmailNotConfirmed: string; loginCheckMail: string;
  loginSentCode: string; loginEnterCode: string; loginVerifyContinue: string;
  loginWrongEmail: string; loginNoAccount: string; loginAlreadyAccount: string;
  loginSignUpFree: string; loginSignInAction: string; loginStartBreaking: string;
  loginHistoryPro: string;
  emergencyActive: string; emergencyCallHelp: string; emergencyCalling: string;
  emergencySendLocation: string; emergencySent: string; emergencySpeakMsg: string;
  emergencyRecording: string; emergencySelectLang: string; emergencyQuickPhrases: string;
  emergencyPrivacy: string; emergencyPrivacyDesc: string; emergencyNotice: string;
  vapiEnd: string; vapiCall: string;
  minutes: string; save: string; saving: string; cancel: string;
  sessionReminders: string; controlData: string; view: string;
  searchLanguages: string; guest: string; free: string; msgs: string;
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
  loginSignIn: 'Sign In', loginCreateAccount: 'Create Account', loginWelcome: 'Welcome back 👋', loginJoin: 'Join VoiceBridge 🚀',
  loginSubtitle: 'Your voice, understood everywhere', loginEmail: 'Email address', loginPassword: 'Password', loginFullName: 'Your full name',
  loginActionFailed: 'Action Failed', loginEmailNotConfirmed: 'Email not confirmed', loginCheckMail: 'Check ur mail for the verifications',
  loginSentCode: 'We sent a 6-digit code to', loginEnterCode: 'Enter 6-digit code', loginVerifyContinue: 'Verify & Continue',
  loginWrongEmail: 'Wrong email? Go back', loginNoAccount: "Don't have an account?", loginAlreadyAccount: 'Already have an account?',
  loginSignUpFree: 'Sign up free', loginSignInAction: 'Sign in', loginStartBreaking: 'Start breaking language barriers today. Just name, email and password.',
  loginHistoryPro: 'Sign in to access your translation history and pro features.',
  emergencyActive: 'ACTIVE — Help is available', emergencyCallHelp: 'Call Help', emergencyCalling: 'Calling 112…',
  emergencySendLocation: 'Send Location', emergencySent: '✓ Sent!', emergencySpeakMsg: 'Speak Emergency Message',
  emergencyRecording: 'Recording emergency message…', emergencySelectLang: 'Select Language', emergencyQuickPhrases: 'Quick Phrases',
  emergencyPrivacy: 'Privacy & Security', emergencyPrivacyDesc: 'Your emergency audio message is recorded securely, heavily encrypted on your device, and translated privately. The data is dispatched only to your designated contacts and is never stored persistently on our servers.',
  emergencyNotice: 'Emergency mode sends your location and pre-filled messages to your emergency contact. Always call local emergency services (112/911) for immediate danger.',
  vapiEnd: 'End Vapi', vapiCall: 'Vapi AI Call',
  minutes: 'Minutes', save: 'Save', saving: 'Saving...', cancel: 'Cancel',
  sessionReminders: 'Session reminders & updates', controlData: 'Control your data and recordings', view: 'View',
  searchLanguages: 'Search languages...', guest: 'Guest', free: 'Free', msgs: 'msgs',
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
  loginSignIn: 'साइन इन', loginCreateAccount: 'खाता बनाएँ', loginWelcome: 'वापसी पर स्वागत है 👋', loginJoin: 'VoiceBridge से जुड़ें 🚀',
  loginSubtitle: 'आपकी आवाज़, हर जगह समझी जाती है', loginEmail: 'ईमेल पता', loginPassword: 'पासवर्ड', loginFullName: 'आपका पूरा नाम',
  loginActionFailed: 'कार्रवाई विफल', loginEmailNotConfirmed: 'ईमेल की पुष्टि नहीं हुई', loginCheckMail: 'सत्यापन के लिए अपना मेल देखें',
  loginSentCode: 'हमने 6-अंकों का कोड भेजा है', loginEnterCode: '6-अंकों का कोड दर्ज करें', loginVerifyContinue: 'सत्यापित करें और जारी रखें',
  loginWrongEmail: 'गलत ईमेल? वापस जाएं', loginNoAccount: 'खाता नहीं है?', loginAlreadyAccount: 'पहले से ही खाता है?',
  loginSignUpFree: 'मुफ्त साइन अप करें', loginSignInAction: 'साइन इन करें', loginStartBreaking: 'आज ही भाषा की बाधाओं को तोड़ना शुरू करें। बस नाम, ईमेल और पासवर्ड।',
  loginHistoryPro: 'अपने अनुवाद इतिहास और प्रो सुविधाओं तक पहुँचने के लिए साइन इन करें।',
  emergencyActive: 'सक्रिय — मदद उपलब्ध है', emergencyCallHelp: 'मदद बुलाएं', emergencyCalling: '112 डायल कर रहा है…',
  emergencySendLocation: 'लोकेशन भेजें', emergencySent: '✓ भेजा गया!', emergencySpeakMsg: 'आपातकालीन संदेश बोलें',
  emergencyRecording: 'संदेश रिकॉर्ड हो रहा है…', emergencySelectLang: 'भाषा चुनें', emergencyQuickPhrases: 'त्वरित वाक्यांश',
  emergencyPrivacy: 'गोपनीयता और सुरक्षा', emergencyPrivacyDesc: 'आपका आपातकालीन ऑडियो संदेश सुरक्षित रूप से रिकॉर्ड किया जाता है, एन्क्रिप्ट किया जाता है, और निजी तौर पर अनुवादित किया जाता है। डेटा केवल आपके संपर्कों को भेजा जाता है और हमारे सर्वर पर सहेजा नहीं जाता है।',
  emergencyNotice: 'आपातकालीन मोड आपका स्थान और पहले से भरे हुए संदेश भेजता है। तत्काल खतरे के लिए हमेशा 112 डायल करें।',
  vapiEnd: 'वापी समाप्त करें', vapiCall: 'वापी AI कॉल',
  minutes: 'मिनट', save: 'सहेजें', saving: 'सहेज रहा है...', cancel: 'रद्द करें',
  sessionReminders: 'सत्र अनुस्मारक और अपडेट', controlData: 'अपने डेटा और रिकॉर्डिंग को नियंत्रित करें', view: 'देखें',
  searchLanguages: 'भाषाएं खोजें...', guest: 'अतिथि', free: 'मुफ्त', msgs: 'संदेश',
};

function makeSimple(base: Partial<UIStrings> = {}): UIStrings {
  return { ...EN, ...base };
}

const BN  = makeSimple({ navHome: 'হোম', tapToSpeak: 'কথা বলতে ট্যাপ করুন', listening: 'শুনছি…', translating: 'অনুবাদ হচ্ছে…', originalLabel: 'মূল', translationLabel: 'অনুবাদ', signOut: 'সাইন আউট', quickPhrases: ['হাসপাতাল কোথায়?', 'আমার সাহায্য দরকার', 'ধন্যবাদ', 'অ্যাম্বুলেন্স ডাকুন'] });
const TA  = makeSimple({ navHome: 'முகப்பு', tapToSpeak: 'பேச தட்டவும்', listening: 'கேட்கிறேன்…', translating: 'மொழிபெயர்க்கிறேன்…', originalLabel: 'அசல்', translationLabel: 'மொழிபெயர்ப்பு', signOut: 'வெளியேறு', quickPhrases: ['மருத்துவமனை எங்கே?', 'எனக்கு உதவி வேண்டும்', 'நன்றி', 'ஆம்புலன்ஸ் அழைக்கவும்'] });
const TE: UIStrings = {
  navHome: 'హోమ్', navChat: 'చాట్', navAccess: 'యాక్సెస్', navSOS: 'SOS', navProfile: 'ప్రొఫైల్',
  appTagline: 'మీ వాయిస్, ప్రతిచోటా అర్థమవుతుంది', aiReady: 'AI సిద్ధంగా ఉంది',
  statSessions: 'సెషన్లు', statLanguages: 'భాషలు', statAccuracy: 'ఖచ్చితత్వం',
  tapToSpeak: 'మాట్లాడటానికి నొక్కండి', listening: 'వింటున్నాను…', processing: 'ప్రాసెస్ అవుతోంది…',
  translating: 'అనువదిస్తున్నాను…', speaking: 'మాట్లాడుతున్నాను…',
  speakNow: 'ఇప్పుడు మాట్లాడండి — నేను వింటున్నాను 👂', sendingToBrain: 'AI మెదడుకు పంపుతోంది ✨',
  typeInstead: 'బదులుగా టైప్ చేయండి', history: 'చరిత్ర', fromLabel: 'నుండి', toLabel: 'కు',
  conversationTitle: 'సంభాషణ', noMessages: 'ఇంకా సందేశాలు లేవు',
  noMessagesHint: 'హోమ్ పేజీకి వెళ్లి మైక్ బటన్ నొక్కండి లేదా ప్రారంభించడానికి క్రింద టైప్ చేయండి.',
  clearBtn: 'క్లియర్', typeMessage: 'సందేశాన్ని టైప్ చేయండి లేదా మైక్ ఉపయోగించండి…', processingDots: 'ప్రాసెస్ అవుతోంది…',
  originalLabel: 'అసలు', translationLabel: 'అనువాదం',
  playBtn: 'ప్లే', copyBtn: 'కాపీ', copiedBtn: 'కాపీ చేయబడింది!',
  quickPhrases: ['ఆసుపత్రి ఎక్కడ?', 'నాకు సహాయం కావాలి', 'ధన్యవాదాలు', 'అంబులెన్స్ పిలవండి'],
  profileTab: 'ప్రొఫైల్', voiceTab: 'వాయిస్', languagesTab: 'భాషలు', historyTab: 'చరిత్ర',
  signOut: 'సైన్ అవుట్', noSessionsYet: 'ఇంకా సెషన్లు లేవు',
  noSessionsHint: 'మీ చరిత్రను ఇక్కడ చూడటానికి హోమ్ స్క్రీన్‌పై అనువాదాన్ని పూర్తి చేయండి.',
  recentSessions: 'ఇటీవలి సెషన్లు', primaryLang: 'ప్రాథమిక భాష', targetLang: 'लक्ष్య భాష',
  voiceSelection: 'వాయిస్ ఎంపిక', notifications: 'నోటిఫికేషన్లు', privacyData: 'గోపनीयత మరియు డేటా',
  editProfile: 'ఎడిట్ ప్రొఫైల్',
  accessTitle: 'సౌలభ్యం', accessSubtitle: 'మీ అవసరాలకు అనుగుణంగా అనుకూలీకరించండి',
  activeLabel: 'సక్రియ', resetDefaults: 'డిఫాల్ట్‌లకు రీసెట్ చేయండి',
  autoSaved: 'సెట్టింగ్‌లు స్వయంచాలకంగా సేవ్ చేయబడతాయి మరియు వెంటనే వర్తిస్తాయి.',
  catAll: 'అన్నీ', catVoice: 'వాయిస్', catDisplay: 'డిస్ప్లే', catAccess: 'యాక్సెస్',
  toggleOn: 'ఆన్', toggleOff: 'ఆఫ్',
  optSpeechCorr: 'స్పీచ్ కరెక్షన్', optSpeechCorrDesc: 'వ్యాకరణం మరియు ఉచ్చారణ లోపాలను రియల్ టైమ్‌లో సరిచేయండి',
  optAutoSpeak: 'ఆటో-స్పీక్', optAutoSpeakDesc: 'అనువదించబడిన అవుట్‌పుట్‌ను స్వయంచాలకంగా బిగ్గరగా మాట్లాడండి',
  optSlowSpeech: 'నెమ్మదిగా మాట్లాడటం', optSlowSpeechDesc: 'స్పష్టత కోసం తక్కువ వేగంతో మాట్లాడండి',
  optHighContrast: 'హై కాంట్రాస్ట్', optHighContrastDesc: 'మెరుగైన దృశ్యమానత కోసం విజువల్ కాంట్రాస్ట్‌ను పెంచండి',
  optAudioFeedback: 'ఆడియో ఫీడ్‌బ్యాక్', optAudioFeedbackDesc: 'యాప్ పరస్పర చర్యల కోసం సౌండ్ ఎఫెక్ట్స్',
  optDyslexiaFont: 'డిస్లెక్సియా ఫాంట్', optDyslexiaFontDesc: 'చదవడానికి సులభంగా ఉండేలా ఫాంట్ ఆప్టిమైజ్ చేయబడింది',
  emergencyTitle: 'ఆపద',
  loginSignIn: 'సైన్ ఇన్', loginCreateAccount: 'ఖాతాను సృష్టించండి', loginWelcome: 'తిరిగి స్వాగతం 👋', loginJoin: 'వాయిస్‌బ్రిడ్జ్‌లో చేరండి 🚀',
  loginSubtitle: 'మీ వాయిస్, ప్రతిచోటా అర్థమవుతుంది', loginEmail: 'ఈమెయిల్ చిరునామా', loginPassword: 'పాస్‌వర్డ్', loginFullName: 'మీ పూర్తి పేరు',
  loginActionFailed: 'చర్య విఫలమైంది', loginEmailNotConfirmed: 'ఈమెయిల్ ధృవీకరించబడలేదు', loginCheckMail: 'ధృవీకరణ కోసం మీ మెయిల్‌ని తనిఖీ చేయండి',
  loginSentCode: 'మేము 6-అంకెల కోడ్‌ను పంపాము', loginEnterCode: '6-అంకెల కోడ్‌ను నమోదు చేయండి', loginVerifyContinue: 'ధృవీకరించి కొనసాగించండి',
  loginWrongEmail: 'తప్పు ఈమెయిలా? వెనక్కి వెళ్ళండి', loginNoAccount: 'ఖాతా లేదా?', loginAlreadyAccount: 'ఇప్పటికే ఖాతా ఉందా?',
  loginSignUpFree: 'ఉచితంగా సైన్ అప్ చేయండి', loginSignInAction: 'సైన్ ఇన్ చేయండి', loginStartBreaking: 'ఈ రోజు నుండే భాషా అడ్డంకులను తొలగించడం ప్రారంభించండి. కేవలం పేరు, ఈమెయిల్ మరియు పాస్‌వర్డ్.',
  loginHistoryPro: 'మీ అనువాద చరిత్ర మరియు ప్రో ఫీచర్‌లను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి.',
  emergencyActive: 'సక్రియ — సహాయం అందుబాటులో ఉంది', emergencyCallHelp: 'సహాయం కోరండి', emergencyCalling: '112 కు కాల్ చేస్తోంది…',
  emergencySendLocation: 'స్థానాన్ని పంపండి', emergencySent: '✓ పంపబడింది!', emergencySpeakMsg: 'ఆపద సందేశాన్ని మాట్లాడండి',
  emergencyRecording: 'ఆపద సందేశం రికార్డ్ అవుతోంది…', emergencySelectLang: 'భాషను ఎంచుకోండి', emergencyQuickPhrases: 'త్వరిత పదబంధాలు',
  emergencyPrivacy: 'గోప్యత మరియు భద్రత', emergencyPrivacyDesc: 'మీ ఆపద ఆడియో సందేశం సురక్షితంగా రికార్డ్ చేయబడుతుంది, మీ పరికరంలో ఎన్‌క్రిప్ట్ చేయబడుతుంది మరియు ప్రైవేట్‌గా అనువదించబడుతుంది. డేటా మీ నియమించబడిన కాంటాక్ట్‌లకు మాత్రమే పంపబడుతుంది మరియు మా సర్వర్‌లలో ఎప్పటికీ శాశ్వతంగా నిల్వ చేయబడదు.',
  emergencyNotice: 'ఎమర్జెన్సీ మోడ్ మీ స్థానాన్ని మరియు ముందుగా పూరించిన సందేశాలను పంపుతుంది. తక్షణ ప్రమాదం కోసం ఎల్లప్పుడూ 112 కు కాల్ చేయండి.',
  vapiEnd: 'వాపి ముగించు', vapiCall: 'వాపి AI కాల్',
  minutes: 'నిమిషాలు', save: 'సేవ్', saving: 'సేవ్ అవుతోంది...', cancel: 'రద్దు',
  sessionReminders: 'సెషన్ రిమైండర్లు మరియు అప్‌డేట్లు', controlData: 'మీ డేటా మరియు రికార్డింగ్‌లను నియంత్రించండి', view: 'చూడండి',
  searchLanguages: 'భాషల కోసం వెతకండి...', guest: 'అతిథి', free: 'ఉచితం', msgs: 'సందేశాలు',
};
const KN  = makeSimple({ navHome: 'ಮನೆ', tapToSpeak: 'ಮಾತಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ', listening: 'ಕೇಳುತ್ತಿದ್ದೇನೆ…', translating: 'ಅನುವಾದ ಆಗುತ್ತಿದೆ…', originalLabel: 'ಮೂಲ', translationLabel: 'ಅನುವಾದ', signOut: 'ಸೈನ್ ಔಟ್', quickPhrases: ['ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', 'ನನಗೆ ಸಹಾಯ ಬೇಕು', 'ಧನ್ಯವಾದ', 'ಅಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ'] });
const ML  = makeSimple({ navHome: 'ഹോം', tapToSpeak: 'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക', listening: 'കേൾക്കുന്നു…', translating: 'വിവർത്തനം ചെയ്യുന്നു…', originalLabel: 'മൂലം', translationLabel: 'വിവർത്തനം', signOut: 'സൈൻ ഔട്ട്', quickPhrases: ['ആശുപത്രി എവിടെ?', 'എനിക്ക് സഹായം വേണം', 'നന്ദി', 'ആംബുലൻസ് വിളിക്കൂ'] });
const MR: UIStrings = {
  navHome: 'मुख्यपृष्ठ', navChat: 'संवाद', navAccess: 'प्रवेश', navSOS: 'आणीबाणी', navProfile: 'प्रोफाइल',
  appTagline: 'तुमचा आवाज, सर्वत्र समजला जातो', aiReady: 'AI तयार',
  statSessions: 'सत्र', statLanguages: 'भाषा', statAccuracy: 'अचूकता',
  tapToSpeak: 'बोलण्यासाठी टॅप करा', listening: 'ऐकत आहे…', processing: 'प्रक्रिया सुरू आहे…',
  translating: 'भाषांतर होत आहे…', speaking: 'बोलत आहे…',
  speakNow: 'आता बोला — मी ऐकत आहे 👂', sendingToBrain: 'AI कडे पाठवत आहे ✨',
  typeInstead: 'त्याऐवजी टाइप करा', history: 'इतिहास', fromLabel: 'कडून', toLabel: 'कडे',
  conversationTitle: 'संभाषण', noMessages: 'अद्याप कोणतेही संदेश नाहीत',
  noMessagesHint: 'मुख्यपृष्ठावर जा आणि माइक बटण दाबा किंवा प्रारंभ करण्यासाठी खाली टाइप करा.',
  clearBtn: 'साफ करा', typeMessage: 'संदेश टाइप करा किंवा माइक वापरा…', processingDots: 'प्रक्रिया सुरू आहे…',
  originalLabel: 'मूळ', translationLabel: 'भाषांतर',
  playBtn: 'चालवा', copyBtn: 'कॉपी', copiedBtn: 'कॉपी झाले!',
  quickPhrases: ['रुग्णालय कुठे आहे?', 'मला मदत हवी आहे', 'धन्यवाद', 'रुग्णवाहिका बोलवा'],
  profileTab: 'प्रोफाइल', voiceTab: 'आवाज', languagesTab: 'भाषा', historyTab: 'इतिहास',
  signOut: 'साइन आउट', noSessionsYet: 'अद्याप कोणतेही सत्र नाही',
  noSessionsHint: 'येथे तुमचा इतिहास पाहण्यासाठी मुख्यपृष्ठावर भाषांतर पूर्ण करा.',
  recentSessions: 'अलीकडील सत्रे', primaryLang: 'प्राथमिक भाषा', targetLang: 'लक्ष्य भाषा',
  voiceSelection: 'आवाज निवड', notifications: 'सूचना', privacyData: 'गोपनीयता आणि डेटा',
  editProfile: 'संपादित करा',
  accessTitle: 'सुलभता', accessSubtitle: 'तुमच्या गरजेनुसार सानुकूलित करा',
  activeLabel: 'सक्रिय', resetDefaults: 'डिफॉल्टवर रीसेट करा',
  autoSaved: 'सेटिंग्ज आपोआप सेव्ह होतात आणि लगेच लागू होतात.',
  catAll: 'सर्व', catVoice: 'आवाज', catDisplay: 'प्रदर्शन', catAccess: 'प्रवेश',
  toggleOn: 'चालू', toggleOff: 'बंद',
  optSpeechCorr: 'भाषण सुधारणा', optSpeechCorrDesc: 'व्याकरण आणि उच्चार त्रुटी रिअल टाइममध्ये सुधारा',
  optAutoSpeak: 'स्वयं-बोलणे', optAutoSpeakDesc: 'भाषांतरित आउटपुट स्वयंचलितपणे मोठ्याने बोला',
  optSlowSpeech: 'हळू बोलणे', optSlowSpeechDesc: 'स्पष्टतेसाठी कमी वेगाने बोला',
  optHighContrast: 'उच्च कॉन्ट्रास्ट', optHighContrastDesc: 'चांगल्या दृश्यमानतेसाठी दृश्य कॉन्ट्रास्ट वाढवा',
  optAudioFeedback: 'ऑडिओ फीडबॅक', optAudioFeedbackDesc: 'अ‍ॅप परस्परसंवादासाठी ध्वनी प्रभाव',
  optDyslexiaFont: 'डिस्लेक्सिया फॉन्ट', optDyslexiaFontDesc: 'वाचण्यास सोपे जाण्यासाठी फॉन्ट ऑप्टिमाइझ केला आहे',
  emergencyTitle: 'आणीबाणी',
  loginSignIn: 'साइन इन', loginCreateAccount: 'खाते तयार करा', loginWelcome: 'पुन्हा स्वागत आहे 👋', loginJoin: 'VoiceBridge मध्ये सामील व्हा 🚀',
  loginSubtitle: 'तुमचा आवाज, सर्वत्र समजला जातो', loginEmail: 'ईमेल पत्ता', loginPassword: 'पासवर्ड', loginFullName: 'तुमचे पूर्ण नाव',
  loginActionFailed: 'कृती अयशस्वी', loginEmailNotConfirmed: 'ईमेलची पुष्टी झालेली नाही', loginCheckMail: 'सत्यापनासाठी तुमचा मेल तपासा',
  loginSentCode: 'आम्ही ६-अंकी कोड पाठवला आहे', loginEnterCode: '६-अंकी कोड प्रविष्ट करा', loginVerifyContinue: 'सत्यापित करा आणि सुरू ठेवा',
  loginWrongEmail: 'चुकीचा ईमेल? मागे जा', loginNoAccount: 'खाते नाही?', loginAlreadyAccount: 'आधीच खाते आहे?',
  loginSignUpFree: 'विनामूल्य नोंदणी करा', loginSignInAction: 'साइन इन करा', loginStartBreaking: 'आजच भाषेतील अडथळे दूर करण्यास सुरुवात करा. फक्त नाव, ईमेल आणि पासवर्ड.',
  loginHistoryPro: 'तुमचा भाषांतर इतिहास आणि प्रो वैशिष्ट्ये वापरण्यासाठी साइन इन करा.',
  emergencyActive: 'सक्रिय — मदत उपलब्ध आहे', emergencyCallHelp: 'मदत मागवा', emergencyCalling: '११२ ला कॉल करत आहे…',
  emergencySendLocation: 'स्थान पाठवा', emergencySent: '✓ पाठवले!', emergencySpeakMsg: 'आणीबाणीचा संदेश बोला',
  emergencyRecording: 'आणीबाणीचा संदेश रेकॉर्ड होत आहे…', emergencySelectLang: 'भाषा निवडा', emergencyQuickPhrases: 'त्वरीत वाक्ये',
  emergencyPrivacy: 'गोपनीयता आणि सुरक्षा', emergencyPrivacyDesc: 'तुमचा आणीबाणीचा ऑडिओ संदेश सुरक्षितपणे रेकॉर्ड केला जातो, तुमच्या डिव्हाइसवर कडक कूटबद्ध केला जातो आणि खाजगीरित्या भाषांतरित केला जातो. डेटा केवळ तुमच्या नियुक्त संपर्कांना पाठवला जातो आणि आमच्या सर्व्हरवर कधीही कायमचा संग्रहित केला जात नाही.',
  emergencyNotice: 'आणीबाणी मोड तुमचे स्थान आणि आधीच भरलेले संदेश तुमच्या आपत्कालीन संपर्कास पाठवतो. तात्काळ धोक्यासाठी नेहमी स्थानिक आपत्कालीन सेवांना (११२/९११) कॉल करा.',
  vapiEnd: 'वापी समाप्त करा', vapiCall: 'वापी AI कॉल',
  minutes: 'मिनिटे', save: 'सेव्ह करा', saving: 'सेव्ह होत आहे...', cancel: 'रद्द करा',
  sessionReminders: 'सत्र स्मरणपत्रे आणि अपडेट्स', controlData: 'तुमचा डेटा आणि रेकॉर्डिंग नियंत्रित करा', view: 'पहा',
  searchLanguages: 'भाषा शोधा...', guest: 'अतिथी', free: 'विनामूल्य', msgs: 'संदेश',
};
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
