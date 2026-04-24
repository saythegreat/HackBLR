'use client';
// OPTIMIZATION: SplashScreen uses CSS animations only — zero framer-motion cost here.
// framer-motion is still in the bundle (used elsewhere), but this component avoids
// adding extra motion nodes that would force layout recalculation during startup.
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Use a faster interval — perceived as more responsive
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: '#080b14',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Pure CSS glow — no JS animation overhead */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.2) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 50% 110%, rgba(59,130,246,0.1) 0%, transparent 50%)
        `,
      }} />

      <div style={{
        width: 80, height: 80, borderRadius: 24,
        background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 50px rgba(124,58,237,0.6)', marginBottom: 24,
        // Pure CSS pulse — no JS
        animation: 'splashPulse 2s ease-in-out infinite',
      }}>
        {/* Inline SVG mic — no lucide-react import needed in splash */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      </div>

      <h1 className="gradient-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1, marginBottom: 8 }}>
        VoiceBridge
      </h1>

      <p style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 500, minWidth: 160, textAlign: 'center' }}>
        Initializing{dots}
      </p>

      {/* Pure CSS loading bar */}
      <div style={{
        position: 'absolute', bottom: 60, width: 140, height: 4,
        background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden',
      }}>
        <div style={{
          width: 70, height: '100%',
          background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
          animation: 'splashSlide 1.5s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes splashPulse {
          0%, 100% { box-shadow: 0 0 50px rgba(124,58,237,0.6); }
          50% { box-shadow: 0 0 80px rgba(124,58,237,0.9); }
        }
        @keyframes splashSlide {
          0% { transform: translateX(-140px); }
          100% { transform: translateX(280px); }
        }
      `}</style>
    </div>
  );
}
