'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Send, Play, Pause, RefreshCw, Copy, CheckCheck, AlertCircle, X, PhoneCall, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';
import { useVoice } from '@/context/VoiceContext';
import { getUIStrings } from '@/lib/uiTranslations';
import type { Message } from '@/lib/types';

// ─── Streaming Text Hook ──────────────────────────────────────────────────────
function useStreamingText(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active || !text) { setDisplayed(text); return; }
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [text, active]);

  return displayed;
}

// ─── Message Bubble — shows Original + Translation ────────────────────────────
function MessageBubble({
  msg, index, totalCount, onPlay, onCopy, ui,
}: {
  msg: Message;
  index: number;
  totalCount: number;
  onPlay: (text: string, lang: string) => void;
  onCopy: (text: string) => void;
  ui: ReturnType<typeof getUIStrings>;
}) {
  const isUser = msg.role === 'user';
  const isLatest = index === totalCount - 1;
  const displayedOriginal = useStreamingText(msg.original, isLatest && msg.role === 'ai');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePlay = () => {
    const textToPlay = msg.translated || msg.original;
    const langToSpeak = msg.translated ? msg.targetLang : msg.lang;
    setIsPlaying(true);
    onPlay(textToPlay, langToSpeak);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleCopy = () => {
    onCopy(msg.translated || msg.original);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '92%', width: '100%' }}
    >
      {/* Avatar row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6,
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}>
        {!isUser && (
          <div style={{
            width: 24, height: 24, borderRadius: 8,
            background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, boxShadow: '0 0 8px rgba(124,58,237,0.4)',
          }}>🤖</div>
        )}
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
          {isUser ? `${ui.navProfile.trim() || 'You'} • ${msg.lang}` : `VoiceAI • ${msg.lang}`}
        </span>
        {isUser && (
          <div style={{ width: 24, height: 24, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>👤</div>
        )}
      </div>

      {/* Bubble */}
      <div className={isUser ? 'message-user' : 'message-ai'} style={{ width: '100%' }}>

        {/* Error badge */}
        {msg.error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <AlertCircle size={13} style={{ color: '#f87171' }} />
            <span style={{ fontSize: 11, color: '#f87171' }}>Translation unavailable</span>
          </div>
        )}

        {/* ── Original text ── */}
        <div style={{ marginBottom: msg.translated ? 10 : 0 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
            color: isUser ? 'rgba(192,132,252,0.7)' : 'var(--text-muted)',
            marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span>{msg.lang === 'English' ? '🇬🇧' : '🗣️'}</span>
            <span>{ui.originalLabel} · {msg.lang}</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-primary)' }}>
            {isUser ? msg.original : (displayedOriginal || msg.original)}
            {!isUser && displayedOriginal.length < msg.original.length && <span className="typing-cursor" />}
          </p>
        </div>

        {/* ── Translated text ── */}
        {msg.translated && msg.translated !== msg.original && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
              color: isUser ? 'rgba(129,140,248,0.8)' : '#a78bfa',
              marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span>🌐</span>
              <span>{ui.translationLabel} · {msg.targetLang}</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: isUser ? '#818cf8' : '#c084fc', fontWeight: 500 }}>
              {msg.translated}
            </p>
          </div>
        )}

        {/* Streaming indicator */}
        {msg.isStreaming && !msg.error && (
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 8 }}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#7c3aed' }}
              />
            ))}
            <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4 }}>{ui.processingDots}</span>
          </div>
        )}

        {/* Action buttons */}
        {!msg.isStreaming && (msg.translated || msg.original) && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <motion.button
              id={`play-btn-${msg.id}`}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlay}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11,
                background: isPlaying ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)',
                color: isPlaying ? '#a78bfa' : 'var(--text-muted)', transition: 'all 0.2s',
              }}
            >
              {isPlaying ? <Pause size={11} /> : <Play size={11} />}
              {isPlaying ? ui.playBtn : ui.playBtn}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11,
                background: 'rgba(255,255,255,0.06)', color: copied ? '#4ade80' : 'var(--text-muted)',
                transition: 'all 0.2s',
              }}
            >
              {copied ? <CheckCheck size={11} /> : <Copy size={11} />}
              {copied ? ui.copiedBtn : ui.copyBtn}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function ConversationScreen() {
  const {
    messages, voiceState, fromLang, toLang,
    sendText, clearMessages, errorMessage, clearError,
    speakText, startListening, stopListening,
  } = useVoice();

  const ui = getUIStrings(fromLang.label);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Vapi integration
  const vapi = useRef<any>(null);
  const [isVapiActive, setIsVapiActive] = useState(false);

  useEffect(() => {
    vapi.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "dummy-key");
    const onCallStart = () => setIsVapiActive(true);
    const onCallEnd = () => setIsVapiActive(false);

    vapi.current.on('call-start', onCallStart);
    vapi.current.on('call-end', onCallEnd);

    return () => {
      vapi.current?.stop();
    };
  }, []);

  const toggleVapi = () => {
    if (isVapiActive) {
      vapi.current?.stop();
    } else {
      vapi.current?.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "dummy-assistant");
    }
  };

  const isProcessing = voiceState === 'processing' || voiceState === 'translating';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSend = useCallback(async (text: string) => {
    const t = text.trim();
    if (!t || isProcessing) return;
    setInputText('');
    await sendText(t);
  }, [sendText, isProcessing]);

  const handleVoiceRecord = useCallback(() => {
    if (isRecording) {
      setIsRecording(false);
      stopListening();
    } else {
      setIsRecording(true);
      startListening();
    }
  }, [isRecording, startListening, stopListening]);

  useEffect(() => {
    if (voiceState !== 'listening') setIsRecording(false);
  }, [voiceState]);

  const handlePlayMessage = useCallback((text: string, langLabel: string) => {
    speakText(text, langLabel);
  }, [speakText]);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* ── Header ── */}
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>{ui.conversationTitle}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div className="status-dot active" />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {fromLang.flag} {fromLang.label} → {toLang.flag} {toLang.label} • Real-time AI
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <motion.button
              id="vapi-call"
              whileTap={{ scale: 0.9 }}
              onClick={toggleVapi}
              className="btn-secondary"
              style={{
                padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6,
                background: isVapiActive ? 'rgba(239,68,68,0.2)' : 'rgba(124,58,237,0.2)',
                color: isVapiActive ? '#f87171' : '#a78bfa',
                borderColor: isVapiActive ? 'rgba(239,68,68,0.3)' : 'rgba(124,58,237,0.3)'
              }}
            >
              {isVapiActive ? <PhoneOff size={13} /> : <PhoneCall size={13} />}
              {isVapiActive ? 'End Vapi' : 'Vapi AI Call'}
            </motion.button>
            <motion.button
              id="clear-conversation"
              whileTap={{ scale: 0.9 }}
              onClick={clearMessages}
              className="btn-secondary"
              style={{ padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <RefreshCw size={13} />
              {ui.clearBtn}
            </motion.button>
          </div>
        </div>

        {/* Error banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <AlertCircle size={13} style={{ color: '#f87171', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#fca5a5', flex: 1 }}>{errorMessage}</span>
              <button onClick={clearError} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}>
                <X size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Messages ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Empty state */}
        {messages.length === 0 && !isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '40px 0' }}
          >
            <div style={{ fontSize: 40 }}>🎙️</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)' }}>{ui.noMessages}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 220, lineHeight: 1.6 }}>
              {ui.noMessagesHint}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              msg={msg}
              index={i}
              totalCount={messages.length}
              onPlay={handlePlayMessage}
              onCopy={handleCopy}
              ui={ui}
            />
          ))}
        </AnimatePresence>

        {/* Processing indicator */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <div style={{ width: 24, height: 24, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 8px rgba(124,58,237,0.4)' }}>🤖</div>
            <div className="glass" style={{ padding: '12px 18px', display: 'flex', gap: 4, alignItems: 'center', borderRadius: '20px 20px 20px 6px' }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  style={{ width: 6, height: 6, borderRadius: 3, background: '#7c3aed' }}
                />
              ))}
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>
                {voiceState === 'translating' ? ui.translating : ui.processingDots}
              </span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Bar ── */}
      <div style={{ padding: '12px 20px', paddingBottom: 100, borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              id="message-input"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(inputText);
                }
              }}
              placeholder={isProcessing ? ui.processingDots : ui.typeMessage}
              disabled={isProcessing}
              rows={1}
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16, padding: '12px 16px', color: 'var(--text-primary)', fontSize: 14,
                resize: 'none', outline: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
                transition: 'border-color 0.2s', opacity: isProcessing ? 0.6 : 1,
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Mic button */}
            <motion.button
              id="voice-record-btn"
              whileTap={{ scale: 0.9 }}
              onClick={handleVoiceRecord}
              disabled={isProcessing}
              animate={{ scale: isRecording ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: isRecording ? Infinity : 0, duration: 0.6 }}
              style={{
                width: 44, height: 44, borderRadius: 14, border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer',
                background: isRecording ? 'rgba(239,68,68,0.2)' : 'rgba(124,58,237,0.2)',
                color: isRecording ? '#f87171' : '#a78bfa',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isRecording ? '0 0 16px rgba(239,68,68,0.4)' : 'none',
                transition: 'all 0.3s', opacity: isProcessing ? 0.5 : 1,
              }}
            >
              <Mic size={18} />
            </motion.button>
            {/* Send button */}
            <motion.button
              id="send-btn"
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSend(inputText)}
              disabled={!inputText.trim() || isProcessing}
              className="btn-primary"
              style={{ width: 44, height: 44, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', opacity: inputText.trim() && !isProcessing ? 1 : 0.4 }}
            >
              <Send size={16} />
            </motion.button>
          </div>
        </div>

        {/* Quick phrase chips */}
        <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ui.quickPhrases.map(phrase => (
            <button
              key={phrase}
              onClick={() => handleSend(phrase)}
              disabled={isProcessing}
              style={{
                padding: '4px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', fontSize: 11,
                cursor: isProcessing ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                opacity: isProcessing ? 0.5 : 1,
              }}
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
