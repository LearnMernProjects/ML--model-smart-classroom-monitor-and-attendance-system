import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../components/Navbar'
import SignOut from '../components/SignOut'

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
