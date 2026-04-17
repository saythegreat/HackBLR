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
  themeColor: '#080b14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
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
