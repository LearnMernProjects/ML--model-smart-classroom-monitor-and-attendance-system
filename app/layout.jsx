import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../components/Navbar' // Note: This path might be wrong based on your error log
import SignOut from '../components/SignOut' // Note: This path might be wrong based on your error log

// This is the metadata export, which is allowed by Next.js
export const metadata = {
  title: 'Explain Me At Home',
  description: 'AI-powered lecture notes and summaries',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
        <Navbar />
        <SignOut />
        {children}
        </body>
      </html>
    </ClerkProvider>
  )
}