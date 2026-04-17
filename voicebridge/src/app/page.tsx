'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav, { type Screen } from '@/components/BottomNav';
import HomeScreen from '@/components/HomeScreen';
import ConversationScreen from '@/components/ConversationScreen';
import AccessibilityScreen from '@/components/AccessibilityScreen';
import EmergencyScreen from '@/components/EmergencyScreen';
import SettingsScreen from '@/components/SettingsScreen';
import LoginScreen from '@/components/LoginScreen';
import { useVoice } from '@/context/VoiceContext';
import { useAuth } from '@/context/AuthContext';

const emergencyBg = {
  background: `
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
    #080b14
  `,
};

const defaultBg = {
  background: `
    radial-gradient(ellipse 80% 50% at 20% -10%, rgba(124, 58, 237, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 100%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    #080b14
  `,
};

export default function VoiceBridgeApp() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const { pendingNavigate, clearPendingNavigate } = useVoice();
  const { isLoggedIn } = useAuth();

  // Auto-navigate to Conversation when voice input completes on the Home screen
  useEffect(() => {
    if (pendingNavigate) {
      clearPendingNavigate();
      setActiveScreen('conversation');
    }
  }, [pendingNavigate, clearPendingNavigate]);

  // Show login screen when not authenticated
  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const isEmergency = activeScreen === 'emergency';

  return (
    <motion.div
      animate={isEmergency ? emergencyBg : defaultBg}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0',
      }}
    >
      {/* Mobile frame / app shell */}
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Screen content area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            position: 'relative',
            minHeight: '100vh',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
              transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ minHeight: '100vh' }}
            >
              {activeScreen === 'home' && <HomeScreen />}
              {activeScreen === 'conversation' && <ConversationScreen />}
              {activeScreen === 'accessibility' && <AccessibilityScreen />}
              {activeScreen === 'emergency' && <EmergencyScreen />}
              {activeScreen === 'settings' && <SettingsScreen />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <BottomNav active={activeScreen} onChange={setActiveScreen} />
      </div>
    </motion.div>
  );
}

