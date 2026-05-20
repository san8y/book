import type { Metadata } from "next"
import {
  IBM_Plex_Serif,
  Mona_Sans,
} from "next/font/google"

import "./globals.css"

import Navbar from "@/components/Navbar"

import { ClerkProvider } from "@clerk/nextjs"

// IBM PLEX
const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

// MONA SANS
const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
})

// METADATA
export const metadata: Metadata = {
  title: "Bookified",
  description:
    "Transform your PDFs into interactive AI conversations.",
}

// ROOT LAYOUT
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`
          ${ibmPlexSerif.variable}
          ${monaSans.variable}
          h-full
          antialiased
        `}
      >
        <body className="min-h-screen flex flex-col">
          
          {/* NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="flex-1 pt-20">
            {children}
          </main>

        </body>
      </html>
    </ClerkProvider>
  )
}