'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import dynamic from 'next/dynamic'

const OpenStreetMap = dynamic(() => import('@/components/OpenStreetMap'), {
  ssr: false,
})
      
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SidebarProvider>
            <OpenStreetMap>
                <AppSidebar />
                <main>
                    {children}
                </main>
            </OpenStreetMap>
        </SidebarProvider>
        </body>
        </html>
    )
}