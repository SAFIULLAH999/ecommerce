import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/contexts/CartContext'
import { Toaster as SonnerToaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mantu - Modern E-commerce',
  description: 'Discover luxury fashion that defines your unique style',
  keywords: ['ecommerce', 'fashion', 'shopping', 'mantu'],
  authors: [{ name: 'Mantu Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        <CartProvider>
          <Providers>
            {children}
            <Toaster />
            <SonnerToaster position="top-right" />
          </Providers>
        </CartProvider>
      </body>
    </html>
  )
}
