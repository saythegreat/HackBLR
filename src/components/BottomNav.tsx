'use client';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Shield, AlertTriangle, User } from 'lucide-react';
import { clsx } from 'clsx';
import { useVoice } from '@/context/VoiceContext';
import { getUIStrings } from '@/lib/uiTranslations';

export type Screen = 'home' | 'conversation' | 'accessibility' | 'emergency' | 'settings';

interface BottomNavProps {
  active: Screen;
  onChange: (s: Screen) => void;
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  const { fromLang } = useVoice();
  const ui = getUIStrings(fromLang.label);

  const navItems: { id: Screen; icon: React.FC<{ size?: number }>; label: string }[] = [
    { id: 'home', icon: Home, label: ui.navHome },
    { id: 'conversation', icon: MessageSquare, label: ui.navChat },
    { id: 'accessibility', icon: Shield, label: ui.navAccess },
    { id: 'emergency', icon: AlertTriangle, label: ui.navSOS },
    { id: 'settings', icon: User, label: ui.navProfile },
  ];

  return (
    <div
      className="glass"
      style={{
        position: 'fixed',
        bottom: 'calc(16px + var(--sab, 0px))',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: 420,
        zIndex: 100,
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 24,
        backdropFilter: 'blur(30px)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}
    >
      {navItems.map((item) => {
        const isActive = active === item.id;
        const isEmergency = item.id === 'emergency';
        const Icon = item.icon;
        return (
          <motion.button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => onChange(item.id)}
            whileTap={{ scale: 0.9 }}
            className={clsx('nav-item', isActive && 'active')}
            style={{
              color: isEmergency && isActive
                ? '#f87171'
                : isEmergency
                ? '#ef444488'
                : undefined,
              background: isEmergency && isActive ? 'rgba(239,68,68,0.12)' : undefined,
              flex: 1,
            }}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.15 : 1,
                color: isEmergency ? '#ef4444' : isActive ? '#c084fc' : '#4a5580',
              }}
              transition={{ duration: 0.25 }}
            >
              <Icon size={20} />
            </motion.div>
            <span style={{ fontSize: 9, letterSpacing: 0.3 }}>{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                style={{
                  position: 'absolute',
                  bottom: -8,
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  background: isEmergency ? '#ef4444' : '#7c3aed',
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
