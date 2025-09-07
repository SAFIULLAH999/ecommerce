import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '@/components/CartProvider'
import { AuthProvider } from '@/components/AuthProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  )
}
