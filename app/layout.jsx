import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '../components/Navbar'
// In app/layout.jsx
import SignOut from '../components/SignOut.jsx' // ✅ Matches actual file name
// ... later use as <SignOutButton />

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
          <Navbar />
          <SignOut />  {/* <-- FIX IS HERE */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}