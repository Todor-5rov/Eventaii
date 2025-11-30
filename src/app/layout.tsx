import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eventai - AI-Powered Event Planning Marketplace',
  description: 'Automate your event planning with AI. Connect with the best vendors instantly for venues, catering, tech, and more.',
  keywords: 'event planning, AI automation, event marketplace, vendor booking, automated events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

