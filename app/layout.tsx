import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dementiy-besarab.vercel.app'),
  title: 'Dementiy Besarab - Unity C# Developer',
  description:
    'Premium Unity C# Developer portfolio for mobile games, VR/XR experiences, gameplay systems, production UI, integrations, architecture, and optimization.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dementiy Besarab - Unity C# Developer',
    description:
      'Unity C# Developer focused on mobile games, VR/XR experiences and production-ready gameplay systems.',
    url: '/',
    siteName: 'Dementiy Besarab Portfolio',
    images: [
      {
        url: '/vr-football-penalty-poster.png',
        width: 1280,
        height: 720,
        alt: 'VR Football Penalty gameplay preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dementiy Besarab - Unity C# Developer',
    description:
      'Unity C# Developer focused on mobile games, VR/XR experiences and production-ready gameplay systems.',
    images: ['/vr-football-penalty-poster.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.VERCEL === '1' ? <Analytics /> : null}
      </body>
    </html>
  )
}
