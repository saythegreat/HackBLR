'use client';
import { useState, useEffect, lazy, Suspense, useCallback, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useVoice } from '@/context/VoiceContext';
import { useAuth } from '@/context/AuthContext';
import BottomNav, { type Screen } from '@/components/BottomNav';
import HomeScreen from '@/components/HomeScreen';
import SplashScreen from '@/components/SplashScreen';

// ─── OPTIMIZATION: Lazy-load all non-critical screens ──────────────────────────
// These are only downloaded when the user first navigates to them.
// Saves ~40-60KB from the initial bundle that must load before first paint.
const ConversationScreen  = lazy(() => import('@/components/ConversationScreen'));
const AccessibilityScreen = lazy(() => import('@/components/AccessibilityScreen'));
const EmergencyScreen     = lazy(() => import('@/components/EmergencyScreen'));
const SettingsScreen      = lazy(() => import('@/components/SettingsScreen'));
const LoginScreen         = lazy(() => import('@/components/LoginScreen'));

const LanguageSetupModal  = lazy(() => import('@/components/LanguageSetupModal'));

// ─── Lightweight screen skeleton — shown while lazy chunk downloads ─────────────
const ScreenSkeleton = memo(function ScreenSkeleton() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px',
      gap: 16,
    }}>
      {/* Header skeleton */}
      <div style={{
        height: 56,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.04)',
        animation: 'pulse 1.5s ease-in-out infinite',
      }} />
      {/* Content skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          height: 80,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.03)',
          animation: `pulse 1.5s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
});

// ─── Static background styles (avoids re-computing on every render) ─────────────
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

// ─── Prefetch a lazy screen after idle ─────────────────────────────────────────
function prefetchScreen(importer: () => Promise<unknown>) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => { importer().catch(() => {}); }, { timeout: 3000 });
  } else {
    setTimeout(() => { importer().catch(() => {}); }, 2000);
  }
}

export default function VoiceBridgeApp() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const isInitializing = false; // Splash screen removed — go directly to login/home
  const { pendingNavigate, clearPendingNavigate } = useVoice();
  const { isLoggedIn } = useAuth();

  // ─── OPTIMIZATION: Prefetch secondary screens during idle time ───────────────
  useEffect(() => {
    if (isLoggedIn) {
      prefetchScreen(() => import('@/components/ConversationScreen'));
      prefetchScreen(() => import('@/components/SettingsScreen'));
      prefetchScreen(() => import('@/components/AccessibilityScreen'));
      prefetchScreen(() => import('@/components/EmergencyScreen'));
    }
  }, [isLoggedIn]);

  // ─── Navigation from voice input ─────────────────────────────────────────────
  useEffect(() => {
    if (pendingNavigate) {
      clearPendingNavigate();
      requestAnimationFrame(() => setActiveScreen('conversation'));
    }
  }, [pendingNavigate, clearPendingNavigate]);

  // ─── Onboarding check ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isLoggedIn) {
      const needsLang = localStorage.getItem('vb_needs_lang_setup') === 'true';
      if (needsLang) setShowLanguagePicker(true);
    }
  }, [isLoggedIn]);

  const completeLangSetup = useCallback(() => {
    setShowLanguagePicker(false);
    localStorage.removeItem('vb_needs_lang_setup');
    // Clear any stale tutorial flag
    localStorage.removeItem('vb_show_tutorial');
  }, []);

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
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {isInitializing ? (
          <motion.div
            key="splash"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000 }}
          >
            <SplashScreen />
          </motion.div>
        ) : !isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%' }}
          >
            {/* LoginScreen lazy — only downloaded when user is not logged in */}
            <Suspense fallback={<ScreenSkeleton />}>
              <LoginScreen />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="app-shell"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              maxWidth: 480,
              minHeight: '100vh',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1, overflowY: 'auto', position: 'relative', minHeight: '100vh' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(3px)' }}
                  transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ minHeight: '100vh' }}
                >
                  {/*
                    HomeScreen is NOT lazy — it's the primary screen and must render
                    immediately after auth. All others use Suspense with skeleton.
                  */}
                  {activeScreen === 'home' && <HomeScreen onNavigate={setActiveScreen} />}

                  {activeScreen === 'conversation' && (
                    <Suspense fallback={<ScreenSkeleton />}>
                      <ConversationScreen />
                    </Suspense>
                  )}
                  {activeScreen === 'accessibility' && (
                    <Suspense fallback={<ScreenSkeleton />}>
                      <AccessibilityScreen />
                    </Suspense>
                  )}
                  {activeScreen === 'emergency' && (
                    <Suspense fallback={<ScreenSkeleton />}>
                      <EmergencyScreen />
                    </Suspense>
                  )}
                  {activeScreen === 'settings' && (
                    <Suspense fallback={<ScreenSkeleton />}>
                      <SettingsScreen />
                    </Suspense>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <BottomNav active={activeScreen} onChange={setActiveScreen} />

            {/* Language setup modal — shown after login/signup if needed */}
            <AnimatePresence>
              {showLanguagePicker && (
                <Suspense fallback={null}>
                  <LanguageSetupModal onComplete={completeLangSetup} />
                </Suspense>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
