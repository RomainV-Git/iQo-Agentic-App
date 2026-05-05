import './globals.css'

export const metadata = {
  title: 'iQo Agentic App',
  description: 'Plateforme de pilotage des agents IA — cabinet iQo',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4F46E5',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
