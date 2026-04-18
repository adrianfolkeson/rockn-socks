import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rock\'N Socks | Vilda mönster för alla stilar',
  description: 'Unika strumpor för alla stilar. Från dinosaurier till Harry Potter – hitta din favorit! Gratis frakt över 249 kr.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
