import type { Metadata, Viewport } from 'next';
import './globals.css';
import { VoiceProvider } from '@/context/VoiceContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'VoiceBridge – AI Voice Assistant for Everyone',
  description: 'Break language barriers and communicate effortlessly with VoiceBridge, the real-time AI voice assistant built for accessibility and inclusive communication.',
  keywords: ['voice assistant', 'AI', 'accessibility', 'translation', 'communication', 'real-time'],
  authors: [{ name: 'VoiceBridge Team' }],
  openGraph: {
    title: 'VoiceBridge – AI Voice Assistant for Everyone',
    description: 'Real-time AI voice translation and accessibility communication platform.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#080b14',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster DNS + TLS handshake */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          OPTIMIZATION: Load only weights 400, 600, 700, 800 (removed 300, 500, 900).
          Use font-display:swap so text is visible immediately while font loads.
          Only load Latin subset for initial render speed on most users.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap&subset=latin"
          rel="stylesheet"
        />
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VoiceBridge" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/*
          OPTIMIZATION: DNS prefetch translation APIs so the first translation
          request has near-zero DNS lookup time.
        */}
        <link rel="dns-prefetch" href="https://translate.googleapis.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.mymemory.translated.net" />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <VoiceProvider>
            {children}
          </VoiceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
