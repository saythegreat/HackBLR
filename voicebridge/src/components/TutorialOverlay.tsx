'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, Globe, Zap, Settings, Shield, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useVoice } from '@/context/VoiceContext';

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function TutorialOverlay({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { fromLang } = useVoice();

  const steps: Step[] = [
    {
      title: 'Welcome to VoiceBridge',
      description: 'Your premium companion for breaking language barriers instantly using AI.',
      icon: <Sparkles size={40} color="#a78bfa" />,
      color: '#7c3aed',
    },
    {
      title: 'Set Your Languages',
      description: 'Choose your primary language and the language you want to translate to at the top.',
      icon: <Globe size={40} color="#60a5fa" />,
      color: '#3b82f6',
    },
    {
      title: 'Tap to Speak',
      description: 'Press the large button in the center to start listening. Our AI will translate in real-time.',
      icon: <Mic size={40} color="#f472b6" />,
      color: '#ec4899',
    },
    {
      title: 'Accessibility First',
      description: 'Customize the experience in the Access tab—from high contrast to dyslexia-friendly fonts.',
      icon: <Settings size={40} color="#34d399" />,
      color: '#10b981',
    },
    {
      title: 'Emergency SOS',
      description: 'In urgent situations, use the SOS tab for quick, pre-defined emergency phrases.',
      icon: <Shield size={40} color="#f87171" />,
      color: '#ef4444',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5, 8, 15, 0.9)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass"
        style={{
          width: '100%', maxWidth: 400,
          padding: '40px 30px', borderRadius: 32,
          position: 'relative', overflow: 'hidden',
          textAlign: 'center',
          boxShadow: `0 0 50px ${steps[currentStep].color}22`,
        }}
      >
        {/* Background Glow */}
        <div style={{
          position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%',
          background: `radial-gradient(circle at 50% 50%, ${steps[currentStep].color}11 0%, transparent 70%)`,
          zIndex: -1, pointerEvents: 'none', transition: 'all 0.5s ease',
        }} />

        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{
              width: 80, height: 80, borderRadius: 24,
              background: `${steps[currentStep].color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24, border: `1px solid ${steps[currentStep].color}33`,
            }}>
              {steps[currentStep].icon}
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: 'white' }}>
              {steps[currentStep].title}
            </h2>
            
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 40 }}>
              {steps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 32 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: i === currentStep ? 20 : 6, height: 6, borderRadius: 3,
              background: i === currentStep ? steps[currentStep].color : 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="btn-secondary"
              style={{ flex: 1, padding: '14px', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="btn-primary"
            style={{ 
              flex: 2, padding: '14px', borderRadius: 16, 
              background: steps[currentStep].color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 
            }}
          >
            <span>{currentStep === steps.length - 1 ? 'Start Using App' : 'Next Step'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
