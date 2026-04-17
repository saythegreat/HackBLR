// UI translations for VoiceBridge — adapts all interface text to the user's primary language
export interface UIStrings {
  // Nav
  navHome: string;
  navChat: string;
  navAccess: string;
  navSOS: string;
  navProfile: string;

  // Home screen
  appTagline: string;
  aiReady: string;
  statSessions: string;
  statLanguages: string;
  statAccuracy: string;
  tapToSpeak: string;
  listening: string;
  processing: string;
  translating: string;
  speaking: string;
  speakNow: string;
  sendingToBrain: string;
  typeInstead: string;
  history: string;
  fromLabel: string;
  toLabel: string;

  // Conversation
  conversationTitle: string;
  noMessages: string;
  noMessagesHint: string;
  clearBtn: string;
  typeMessage: string;
  processingDots: string;
  originalLabel: string;
  translationLabel: string;
  playBtn: string;
  copyBtn: string;
  copiedBtn: string;
  quickPhrases: string[];

  // Settings
  profileTab: string;
  voiceTab: string;
  languagesTab: string;
  historyTab: string;
  signOut: string;
  noSessionsYet: string;
  noSessionsHint: string;
  recentSessions: string;
  primaryLang: string;
  targetLang: string;
  voiceSelection: string;
  notifications: string;
  privacyData: string;
  editProfile: string;

  // Accessibility
  accessTitle: string;
  accessSubtitle: string;
  activeLabel: string;
  resetDefaults: string;
  autoSaved: string;

  // Emergency
  emergencyTitle: string;
}

const EN: UIStrings = {
  navHome: 'HOME', navChat: 'CHAT', navAccess: 'ACCESS', navSOS: 'SOS', navProfile: 'PROFILE',
  appTagline: 'Your voice, understood everywhere',
  aiReady: 'AI Ready',
  statSessions: 'Sessions', statLanguages: 'Languages', statAccuracy: 'Accuracy',
  tapToSpeak: 'Tap to speak', listening: 'Listening…', processing: 'Processing…',
  translating: 'Translating…', speaking: 'Speaking…',
  speakNow: "Speak now — I'm all ears 👂",
  sendingToBrain: 'Sending to AI brain ✨',
  typeInstead: 'Type instead', history: 'History',
  fromLabel: 'From', toLabel: 'To',
  conversationTitle: 'Conversation', noMessages: 'No messages yet',
  noMessagesHint: 'Go to Home and tap the mic button, or type below to start translating.',
  clearBtn: 'Clear', typeMessage: 'Type a message or use the mic…',
  processingDots: 'Processing…',
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
  emergencyTitle: 'Emergency',
};

const HI: UIStrings = {
  navHome: 'होम', navChat: 'चैट', navAccess: 'सुविधा', navSOS: 'आपात', navProfile: 'प्रोफ़ाइल',
  appTagline: 'आपकी आवाज़, हर जगह समझी जाती है',
  aiReady: 'AI तैयार',
  statSessions: 'सत्र', statLanguages: 'भाषाएँ', statAccuracy: 'सटीकता',
  tapToSpeak: 'बोलने के लिए टैप करें', listening: 'सुन रहा है…', processing: 'प्रोसेस हो रहा है…',
  translating: 'अनुवाद हो रहा है…', speaking: 'बोल रहा है…',
  speakNow: 'अब बोलें — मैं सुन रहा हूँ 👂',
  sendingToBrain: 'AI को भेजा जा रहा है ✨',
  typeInstead: 'टाइप करें', history: 'इतिहास',
  fromLabel: 'से', toLabel: 'को',
  conversationTitle: 'बातचीत', noMessages: 'अभी कोई संदेश नहीं',
  noMessagesHint: 'होम जाएं और माइक बटन दबाएं, या नीचे टाइप करें।',
  clearBtn: 'साफ करें', typeMessage: 'संदेश टाइप करें या माइक उपयोग करें…',
  processingDots: 'प्रोसेस हो रहा है…',
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
  emergencyTitle: 'आपातकाल',
};

const BN: UIStrings = {
  navHome: 'হোম', navChat: 'চ্যাট', navAccess: 'অ্যাক্সেস', navSOS: 'সাহায্য', navProfile: 'প্রোফাইল',
  appTagline: 'আপনার কণ্ঠ, সর্বত্র বোঝা যায়',
  aiReady: 'AI প্রস্তুত',
  statSessions: 'সেশন', statLanguages: 'ভাষা', statAccuracy: 'নির্ভুলতা',
  tapToSpeak: 'কথা বলতে ট্যাপ করুন', listening: 'শুনছি…', processing: 'প্রক্রিয়াকরণ…',
  translating: 'অনুবাদ হচ্ছে…', speaking: 'বলছি…',
  speakNow: 'এখন বলুন 👂', sendingToBrain: 'AI-এ পাঠানো হচ্ছে ✨',
  typeInstead: 'টাইপ করুন', history: 'ইতিহাস',
  fromLabel: 'থেকে', toLabel: 'তে',
  conversationTitle: 'কথোপকথন', noMessages: 'এখনো কোনো বার্তা নেই',
  noMessagesHint: 'হোমে যান এবং মাইক বোতাম চাপুন, বা নিচে টাইপ করুন।',
  clearBtn: 'মুছুন', typeMessage: 'বার্তা টাইপ করুন বা মাইক ব্যবহার করুন…',
  processingDots: 'প্রক্রিয়াকরণ…',
  originalLabel: 'মূল', translationLabel: 'অনুবাদ',
  playBtn: 'চালান', copyBtn: 'কপি', copiedBtn: 'কপি হয়েছে!',
  quickPhrases: ['হাসপাতাল কোথায়?', 'আমার সাহায্য দরকার', 'ধন্যবাদ', 'অ্যাম্বুলেন্স ডাকুন'],
  profileTab: 'প্রোফাইল', voiceTab: 'কণ্ঠ', languagesTab: 'ভাষা', historyTab: 'ইতিহাস',
  signOut: 'সাইন আউট', noSessionsYet: 'এখনো কোনো সেশন নেই',
  noSessionsHint: 'হোম স্ক্রিনে অনুবাদ করুন এবং এখানে ইতিহাস দেখুন।',
  recentSessions: 'সাম্প্রতিক সেশন', primaryLang: 'প্রাথমিক ভাষা', targetLang: 'লক্ষ্য ভাষা',
  voiceSelection: 'কণ্ঠ নির্বাচন', notifications: 'বিজ্ঞপ্তি', privacyData: 'গোপনীয়তা ও ডেটা',
  editProfile: 'সম্পাদনা',
  accessTitle: 'অ্যাক্সেসিবিলিটি', accessSubtitle: 'আপনার প্রয়োজন অনুযায়ী কাস্টমাইজ করুন',
  activeLabel: 'সক্রিয়', resetDefaults: 'ডিফল্টে রিসেট করুন',
  autoSaved: 'সেটিংস স্বয়ংক্রিয়ভাবে সংরক্ষিত এবং প্রয়োগ করা হয়।',
  emergencyTitle: 'জরুরি',
};

const TA: UIStrings = {
  navHome: 'முகப்பு', navChat: 'அரட்டை', navAccess: 'அணுகல்', navSOS: 'அவசரம்', navProfile: 'சுயவிவரம்',
  appTagline: 'உங்கள் குரல், எங்கும் புரிகிறது',
  aiReady: 'AI தயார்',
  statSessions: 'அமர்வுகள்', statLanguages: 'மொழிகள்', statAccuracy: 'துல்லியம்',
  tapToSpeak: 'பேச தட்டவும்', listening: 'கேட்கிறேன்…', processing: 'செயலாக்குகிறேன்…',
  translating: 'மொழிபெயர்க்கிறேன்…', speaking: 'பேசுகிறேன்…',
  speakNow: 'இப்போது பேசுங்கள் 👂', sendingToBrain: 'AI-க்கு அனுப்புகிறேன் ✨',
  typeInstead: 'தட்டச்சு செய்யவும்', history: 'வரலாறு',
  fromLabel: 'இருந்து', toLabel: 'க்கு',
  conversationTitle: 'உரையாடல்', noMessages: 'இன்னும் செய்திகள் இல்லை',
  noMessagesHint: 'முகப்புக்கு சென்று மைக் பொத்தானை அழுத்துங்கள்.',
  clearBtn: 'அழி', typeMessage: 'செய்தி தட்டச்சு செய்யவும்…',
  processingDots: 'செயலாக்குகிறேன்…',
  originalLabel: 'அசல்', translationLabel: 'மொழிபெயர்ப்பு',
  playBtn: 'இயக்கு', copyBtn: 'நகலெடு', copiedBtn: 'நகலெடுத்தது!',
  quickPhrases: ['மருத்துவமனை எங்கே?', 'எனக்கு உதவி வேண்டும்', 'நன்றி', 'ஆம்புலன்ஸ் அழைக்கவும்'],
  profileTab: 'சுயவிவரம்', voiceTab: 'குரல்', languagesTab: 'மொழிகள்', historyTab: 'வரலாறு',
  signOut: 'வெளியேறு', noSessionsYet: 'இன்னும் அமர்வுகள் இல்லை',
  noSessionsHint: 'முகப்பு திரையில் மொழிபெயர்த்து வரலாற்றைப் பாருங்கள்.',
  recentSessions: 'சமீபத்திய அமர்வுகள்', primaryLang: 'முதன்மை மொழி', targetLang: 'இலக்கு மொழி',
  voiceSelection: 'குரல் தேர்வு', notifications: 'அறிவிப்புகள்', privacyData: 'தனியுரிமை & தரவு',
  editProfile: 'திருத்து',
  accessTitle: 'அணுகல்தன்மை', accessSubtitle: 'உங்கள் தேவைக்கேற்ப தனிப்பயனாக்கவும்',
  activeLabel: 'செயலில்', resetDefaults: 'இயல்புநிலைக்கு மீட்டமை',
  autoSaved: 'அமைப்புகள் தானாக சேமிக்கப்பட்டு உடனடியாக பயன்படுத்தப்படும்.',
  emergencyTitle: 'அவசரநிலை',
};

const TE: UIStrings = {
  navHome: 'హోమ్', navChat: 'చాట్', navAccess: 'యాక్సెస్', navSOS: 'అత్యవసరం', navProfile: 'ప్రొఫైల్',
  appTagline: 'మీ గొంతు, అన్నిచోట్లా అర్థమవుతుంది',
  aiReady: 'AI సిద్ధం',
  statSessions: 'సెషన్లు', statLanguages: 'భాషలు', statAccuracy: 'ఖచ్చితత్వం',
  tapToSpeak: 'మాట్లాడటానికి నొక్కండి', listening: 'వింటున్నాను…', processing: 'ప్రాసెస్ అవుతోంది…',
  translating: 'అనువదిస్తున్నాను…', speaking: 'మాట్లాడుతున్నాను…',
  speakNow: 'ఇప్పుడు మాట్లాడండి 👂', sendingToBrain: 'AI కి పంపిస్తున్నాను ✨',
  typeInstead: 'టైప్ చేయండి', history: 'చరిత్ర',
  fromLabel: 'నుండి', toLabel: 'కి',
  conversationTitle: 'సంభాషణ', noMessages: 'ఇంకా సందేశాలు లేవు',
  noMessagesHint: 'హోమ్ కు వెళ్ళి మైక్ బటన్ నొక్కండి.',
  clearBtn: 'క్లియర్', typeMessage: 'సందేశం టైప్ చేయండి…',
  processingDots: 'ప్రాసెస్ అవుతోంది…',
  originalLabel: 'అసలు', translationLabel: 'అనువాదం',
  playBtn: 'ప్లే', copyBtn: 'కాపీ', copiedBtn: 'కాపీ అయింది!',
  quickPhrases: ['ఆసుపత్రి ఎక్కడ?', 'నాకు సహాయం కావాలి', 'ధన్యవాదాలు', 'అంబులెన్స్ పిలవండి'],
  profileTab: 'ప్రొఫైల్', voiceTab: 'గొంతు', languagesTab: 'భాషలు', historyTab: 'చరిత్ర',
  signOut: 'సైన్ అవుట్', noSessionsYet: 'ఇంకా సెషన్లు లేవు',
  noSessionsHint: 'హోమ్ స్క్రీన్ లో అనువాదం చేసి చరిత్ర చూడండి.',
  recentSessions: 'ఇటీవలి సెషన్లు', primaryLang: 'ప్రాథమిక భాష', targetLang: 'లక్ష్య భాష',
  voiceSelection: 'గొంతు ఎంపిక', notifications: 'నోటిఫికేషన్లు', privacyData: 'గోప్యత & డేటా',
  editProfile: 'సవరించు',
  accessTitle: 'యాక్సిబిలిటీ', accessSubtitle: 'మీ అవసరాలకు అనుగుణంగా అనుకూలీకరించండి',
  activeLabel: 'యాక్టివ్', resetDefaults: 'డిఫాల్ట్ కు రీసెట్ చేయండి',
  autoSaved: 'సెట్టింగ్లు స్వయంచాలకంగా సేవ్ అవుతాయి.',
  emergencyTitle: 'అత్యవసర పరిస్థితి',
};

const KN: UIStrings = {
  navHome: 'ಮನೆ', navChat: 'ಚಾಟ್', navAccess: 'ಪ್ರವೇಶ', navSOS: 'ತುರ್ತು', navProfile: 'ಪ್ರೊಫೈಲ್',
  appTagline: 'ನಿಮ್ಮ ಧ್ವನಿ, ಎಲ್ಲೆಡೆ ಅರ್ಥವಾಗುತ್ತದೆ',
  aiReady: 'AI ಸಿದ್ಧ',
  statSessions: 'ಸೆಷನ್‌ಗಳು', statLanguages: 'ಭಾಷೆಗಳು', statAccuracy: 'ನಿಖರತೆ',
  tapToSpeak: 'ಮಾತಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ', listening: 'ಕೇಳುತ್ತಿದ್ದೇನೆ…', processing: 'ಪ್ರಕ್ರಿಯೆ ಆಗುತ್ತಿದೆ…',
  translating: 'ಅನುವಾದ ಆಗುತ್ತಿದೆ…', speaking: 'ಮಾತಾಡುತ್ತಿದ್ದೇನೆ…',
  speakNow: 'ಈಗ ಮಾತಾಡಿ 👂', sendingToBrain: 'AI ಗೆ ಕಳುಹಿಸುತ್ತಿದ್ದೇನೆ ✨',
  typeInstead: 'ಟೈಪ್ ಮಾಡಿ', history: 'ಇತಿಹಾಸ',
  fromLabel: 'ನಿಂದ', toLabel: 'ಗೆ',
  conversationTitle: 'ಸಂಭಾಷಣೆ', noMessages: 'ಇನ್ನೂ ಸಂದೇಶಗಳಿಲ್ಲ',
  noMessagesHint: 'ಮನೆಗೆ ಹೋಗಿ ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ.',
  clearBtn: 'ತೆರವು', typeMessage: 'ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ…',
  processingDots: 'ಪ್ರಕ್ರಿಯೆ ಆಗುತ್ತಿದೆ…',
  originalLabel: 'ಮೂಲ', translationLabel: 'ಅನುವಾದ',
  playBtn: 'ಪ್ಲೇ', copyBtn: 'ಕಾಪಿ', copiedBtn: 'ಕಾಪಿ ಆಯಿತು!',
  quickPhrases: ['ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', 'ನನಗೆ ಸಹಾಯ ಬೇಕು', 'ಧನ್ಯವಾದ', 'ಅಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ'],
  profileTab: 'ಪ್ರೊಫೈಲ್', voiceTab: 'ಧ್ವನಿ', languagesTab: 'ಭಾಷೆಗಳು', historyTab: 'ಇತಿಹಾಸ',
  signOut: 'ಸೈನ್ ಔಟ್', noSessionsYet: 'ಇನ್ನೂ ಸೆಷನ್‌ಗಳಿಲ್ಲ',
  noSessionsHint: 'ಮನೆ ಪರದೆಯಲ್ಲಿ ಅನುವಾದ ಮಾಡಿ ಮತ್ತು ಇತಿಹಾಸ ನೋಡಿ.',
  recentSessions: 'ಇತ್ತೀಚಿನ ಸೆಷನ್‌ಗಳು', primaryLang: 'ಪ್ರಾಥಮಿಕ ಭಾಷೆ', targetLang: 'ಗುರಿ ಭಾಷೆ',
  voiceSelection: 'ಧ್ವನಿ ಆಯ್ಕೆ', notifications: 'ಅಧಿಸೂಚನೆಗಳು', privacyData: 'ಗೌಪ್ಯತೆ ಮತ್ತು ಡೇಟಾ',
  editProfile: 'ಸಂಪಾದಿಸಿ',
  accessTitle: 'ಪ್ರವೇಶಸಾಧ್ಯತೆ', accessSubtitle: 'ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಕಸ್ಟಮೈಸ್ ಮಾಡಿ',
  activeLabel: 'ಸಕ್ರಿಯ', resetDefaults: 'ಡೀಫಾಲ್ಟ್‌ಗೆ ಮರುಹೊಂದಿಸಿ',
  autoSaved: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ.',
  emergencyTitle: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿ',
};

const ML: UIStrings = {
  navHome: 'ഹോം', navChat: 'ചാറ്റ്', navAccess: 'ആക്‌സസ്', navSOS: 'അടിയന്തരം', navProfile: 'പ്രൊഫൈൽ',
  appTagline: 'നിങ്ങളുടെ ശബ്ദം, എല്ലായിടത്തും മനസ്സിലാകും',
  aiReady: 'AI തയ്യാർ',
  statSessions: 'സെഷനുകൾ', statLanguages: 'ഭാഷകൾ', statAccuracy: 'കൃത്യത',
  tapToSpeak: 'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക', listening: 'കേൾക്കുന്നു…', processing: 'പ്രോസസ് ചെയ്യുന്നു…',
  translating: 'വിവർത്തനം ചെയ്യുന്നു…', speaking: 'സംസാരിക്കുന്നു…',
  speakNow: 'ഇപ്പോൾ സംസാരിക്കൂ 👂', sendingToBrain: 'AI ലേക്ക് അയക്കുന്നു ✨',
  typeInstead: 'ടൈപ്പ് ചെയ്യുക', history: 'ചരിത്രം',
  fromLabel: 'നിന്ന്', toLabel: 'ലേക്ക്',
  conversationTitle: 'സംഭാഷണം', noMessages: 'ഇതുവരെ സന്ദേശങ്ങൾ ഇല്ല',
  noMessagesHint: 'ഹോമിൽ പോയി മൈക്ക് ബട്ടൺ അമർത്തുക.',
  clearBtn: 'മായ്ക്കുക', typeMessage: 'സന്ദേശം ടൈപ്പ് ചെയ്യുക…',
  processingDots: 'പ്രോസസ് ചെയ്യുന്നു…',
  originalLabel: 'മൂലം', translationLabel: 'വിവർത്തനം',
  playBtn: 'പ്ലേ', copyBtn: 'കോപ്പി', copiedBtn: 'കോപ്പി ചെയ്തു!',
  quickPhrases: ['ആശുപത്രി എവിടെ?', 'എനിക്ക് സഹായം വേണം', 'നന്ദി', 'ആംബുലൻസ് വിളിക്കൂ'],
  profileTab: 'പ്രൊഫൈൽ', voiceTab: 'ശബ്ദം', languagesTab: 'ഭാഷകൾ', historyTab: 'ചരിത്രം',
  signOut: 'സൈൻ ഔട്ട്', noSessionsYet: 'ഇതുവരെ സെഷനുകൾ ഇല്ല',
  noSessionsHint: 'ഹോം സ്‌ക്രീനിൽ വിവർത്തനം ചെയ്ത് ചരിത്രം കാണുക.',
  recentSessions: 'സമീപകാല സെഷനുകൾ', primaryLang: 'പ്രാഥമിക ഭാഷ', targetLang: 'ലക്ഷ്യ ഭാഷ',
  voiceSelection: 'ശബ്ദ തിരഞ്ഞെടുപ്പ്', notifications: 'അറിയിപ്പുകൾ', privacyData: 'സ്വകാര്യത & ഡേറ്റ',
  editProfile: 'എഡിറ്റ്',
  accessTitle: 'ആക്‌സസബിലിറ്റി', accessSubtitle: 'നിങ്ങളുടെ ആവശ്യങ്ങൾക്ക് അനുസരിച്ച് ക്രമീകരിക്കുക',
  activeLabel: 'സജീവം', resetDefaults: 'ഡിഫോൾട്ടിലേക്ക് പുനഃസജ്ജമാക്കുക',
  autoSaved: 'ക്രമീകരണങ്ങൾ സ്വയമേവ സംരക്ഷിക്കപ്പെടുന്നു.',
  emergencyTitle: 'അടിയന്തരാവസ്ഥ',
};

const MR: UIStrings = {
  navHome: 'होम', navChat: 'चॅट', navAccess: 'प्रवेश', navSOS: 'आणीबाणी', navProfile: 'प्रोफाइल',
  appTagline: 'तुमचा आवाज, सर्वत्र समजला जातो',
  aiReady: 'AI तयार',
  statSessions: 'सत्रे', statLanguages: 'भाषा', statAccuracy: 'अचूकता',
  tapToSpeak: 'बोलण्यासाठी टॅप करा', listening: 'ऐकत आहे…', processing: 'प्रक्रिया होत आहे…',
  translating: 'भाषांतर होत आहे…', speaking: 'बोलत आहे…',
  speakNow: 'आता बोला 👂', sendingToBrain: 'AI ला पाठवत आहे ✨',
  typeInstead: 'टाइप करा', history: 'इतिहास',
  fromLabel: 'पासून', toLabel: 'ला',
  conversationTitle: 'संभाषण', noMessages: 'अद्याप कोणतेही संदेश नाहीत',
  noMessagesHint: 'होमवर जा आणि माइक बटण दाबा.',
  clearBtn: 'साफ करा', typeMessage: 'संदेश टाइप करा…',
  processingDots: 'प्रक्रिया होत आहे…',
  originalLabel: 'मूळ', translationLabel: 'भाषांतर',
  playBtn: 'वाजवा', copyBtn: 'कॉपी', copiedBtn: 'कॉपी झाले!',
  quickPhrases: ['रुग्णालय कुठे आहे?', 'मला मदत हवी आहे', 'धन्यवाद', 'रुग्णवाहिका बोलवा'],
  profileTab: 'प्रोफाइल', voiceTab: 'आवाज', languagesTab: 'भाषा', historyTab: 'इतिहास',
  signOut: 'साइन आउट', noSessionsYet: 'अद्याप कोणतेही सत्र नाहीत',
  noSessionsHint: 'होम स्क्रीनवर भाषांतर करा आणि इथे इतिहास पहा.',
  recentSessions: 'अलीकडील सत्रे', primaryLang: 'प्राथमिक भाषा', targetLang: 'लक्ष्य भाषा',
  voiceSelection: 'आवाज निवड', notifications: 'सूचना', privacyData: 'गोपनीयता आणि डेटा',
  editProfile: 'संपादित करा',
  accessTitle: 'प्रवेशयोग्यता', accessSubtitle: 'तुमच्या गरजेनुसार सानुकूलित करा',
  activeLabel: 'सक्रिय', resetDefaults: 'डीफॉल्टवर रीसेट करा',
  autoSaved: 'सेटिंग्ज आपोआप जतन होतात.',
  emergencyTitle: 'आणीबाणी',
};

// Shared fallback for languages without full translation (uses English for most, adds key terms)
function makeSimple(nativeName: string, base: Partial<UIStrings> = {}): UIStrings {
  return { ...EN, ...base };
}

const GU = makeSimple('Gujarati', {
  navHome: 'હોમ', navChat: 'ચેટ', navAccess: 'ઍક્સેસ', navSOS: 'SOS', navProfile: 'પ્રોફાઇલ',
  tapToSpeak: 'બોલવા માટે ટૅપ કરો', listening: 'સાંભળી રહ્યો છું…',
  translating: 'અનુવાદ થઈ રહ્યો છે…', speaking: 'બોલી રહ્યો છું…',
  originalLabel: 'મૂળ', translationLabel: 'અનુવાદ', signOut: 'સાઇન આઉટ',
  quickPhrases: ['હોસ્પિટલ ક્યાં છે?', 'મને મદદ જોઈએ છે', 'આભાર', 'એમ્બ્યુલન્સ બોલાવો'],
});

const PA = makeSimple('Punjabi', {
  navHome: 'ਘਰ', navChat: 'ਚੈਟ', navAccess: 'ਪਹੁੰਚ', navSOS: 'SOS', navProfile: 'ਪ੍ਰੋਫਾਈਲ',
  tapToSpeak: 'ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ', listening: 'ਸੁਣ ਰਿਹਾ ਹਾਂ…',
  translating: 'ਅਨੁਵਾਦ ਹੋ ਰਿਹਾ ਹੈ…', speaking: 'ਬੋਲ ਰਿਹਾ ਹਾਂ…',
  originalLabel: 'ਮੂਲ', translationLabel: 'ਅਨੁਵਾਦ', signOut: 'ਸਾਈਨ ਆਉਟ',
  quickPhrases: ['ਹਸਪਤਾਲ ਕਿੱਥੇ ਹੈ?', 'ਮੈਨੂੰ ਮਦਦ ਚਾਹੀਦੀ ਹੈ', 'ਧੰਨਵਾਦ', 'ਐਂਬੂਲੈਂਸ ਬੁਲਾਓ'],
});

const UR = makeSimple('Urdu', {
  tapToSpeak: 'بولنے کے لیے ٹیپ کریں', listening: 'سن رہا ہوں…',
  translating: 'ترجمہ ہو رہا ہے…', originalLabel: 'اصل', translationLabel: 'ترجمہ',
  signOut: 'سائن آؤٹ',
  quickPhrases: ['ہسپتال کہاں ہے؟', 'مجھے مدد چاہیے', 'شکریہ', 'ایمبولینس بلائیں'],
});

const ES = makeSimple('Spanish', {
  navHome: 'INICIO', navChat: 'CHAT', navAccess: 'ACCESO', navSOS: 'SOS', navProfile: 'PERFIL',
  appTagline: 'Tu voz, entendida en todas partes',
  tapToSpeak: 'Toca para hablar', listening: 'Escuchando…',
  translating: 'Traduciendo…', speaking: 'Hablando…',
  originalLabel: 'Original', translationLabel: 'Traducción', signOut: 'Cerrar sesión',
  clearBtn: 'Limpiar', typeMessage: 'Escribe un mensaje…',
  quickPhrases: ['¿Dónde está el hospital?', 'Necesito ayuda', 'Gracias', 'Llamen a una ambulancia'],
});

const FR = makeSimple('French', {
  navHome: 'ACCUEIL', navChat: 'CHAT', navAccess: 'ACCÈS', navSOS: 'SOS', navProfile: 'PROFIL',
  appTagline: 'Votre voix, comprise partout',
  tapToSpeak: 'Appuyez pour parler', listening: 'Écoute…',
  translating: 'Traduction…', speaking: 'Parle…',
  originalLabel: 'Original', translationLabel: 'Traduction', signOut: 'Se déconnecter',
  clearBtn: 'Effacer', typeMessage: 'Tapez un message…',
  quickPhrases: ['Où est l\'hôpital ?', 'J\'ai besoin d\'aide', 'Merci', 'Appelez une ambulance'],
});

const DE = makeSimple('German', {
  tapToSpeak: 'Zum Sprechen tippen', listening: 'Höre zu…',
  translating: 'Übersetze…', originalLabel: 'Original', translationLabel: 'Übersetzung',
  signOut: 'Abmelden', clearBtn: 'Löschen',
  quickPhrases: ['Wo ist das Krankenhaus?', 'Ich brauche Hilfe', 'Danke', 'Rufen Sie einen Krankenwagen'],
});

const JA = makeSimple('Japanese', {
  tapToSpeak: 'タップして話す', listening: '聞いています…',
  translating: '翻訳中…', originalLabel: '原文', translationLabel: '翻訳',
  signOut: 'サインアウト',
  quickPhrases: ['病院はどこですか？', '助けてください', 'ありがとう', '救急車を呼んでください'],
});

const ZH = makeSimple('Mandarin', {
  tapToSpeak: '点击说话', listening: '聆听中…',
  translating: '翻译中…', originalLabel: '原文', translationLabel: '翻译',
  signOut: '退出登录',
  quickPhrases: ['医院在哪里？', '我需要帮助', '谢谢', '请叫救护车'],
});

const KO = makeSimple('Korean', {
  tapToSpeak: '탭하여 말하기', listening: '듣는 중…',
  translating: '번역 중…', originalLabel: '원문', translationLabel: '번역',
  signOut: '로그아웃',
  quickPhrases: ['병원이 어디에 있나요?', '도움이 필요합니다', '감사합니다', '구급차를 불러주세요'],
});

const AR = makeSimple('Arabic', {
  tapToSpeak: 'اضغط للتحدث', listening: 'أستمع…',
  translating: 'جارٍ الترجمة…', originalLabel: 'الأصل', translationLabel: 'الترجمة',
  signOut: 'تسجيل الخروج',
  quickPhrases: ['أين المستشفى؟', 'أحتاج مساعدة', 'شكرًا', 'اتصل بالإسعاف'],
});

const PT = makeSimple('Portuguese', {
  tapToSpeak: 'Toque para falar', listening: 'Ouvindo…',
  translating: 'Traduzindo…', originalLabel: 'Original', translationLabel: 'Tradução',
  signOut: 'Sair',
  quickPhrases: ['Onde fica o hospital?', 'Preciso de ajuda', 'Obrigado', 'Chame uma ambulância'],
});

const RU = makeSimple('Russian', {
  tapToSpeak: 'Нажмите, чтобы говорить', listening: 'Слушаю…',
  translating: 'Перевод…', originalLabel: 'Оригинал', translationLabel: 'Перевод',
  signOut: 'Выйти',
  quickPhrases: ['Где больница?', 'Мне нужна помощь', 'Спасибо', 'Вызовите скорую'],
});

/** Map from language label → UIStrings */
export const UI_TRANSLATIONS: Record<string, UIStrings> = {
  English: EN,
  Hindi: HI,
  Bengali: BN,
  Tamil: TA,
  Telugu: TE,
  Kannada: KN,
  Malayalam: ML,
  Marathi: MR,
  Gujarati: GU,
  Punjabi: PA,
  Urdu: UR,
  Spanish: ES,
  French: FR,
  German: DE,
  Japanese: JA,
  Mandarin: ZH,
  Korean: KO,
  Arabic: AR,
  Portuguese: PT,
  Russian: RU,
};

export function getUIStrings(langLabel: string): UIStrings {
  return UI_TRANSLATIONS[langLabel] ?? EN;
}
