import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AI } from './action'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI booking assistant',
  description: 'A booking assistant powered by AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <AI>{children}</AI>
      </body>
    </html>
  )
}

export const runtime = 'edge'
