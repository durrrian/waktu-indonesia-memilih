import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@repo/web-ui/styles.css'
import './globals.css'
import { ThemeProvider } from '@/provider/theme-provider'
import { ViewportProvider } from '@/provider/viewport-provider'
import { QueryProvider } from '@/provider/query-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@repo/web-ui/components'
import { KeystrokesProvider } from '@/provider/keystroke-provider'
import meta from './meta'
import viewportNext from './viewport'
import { SocketProvider } from '@/provider/socket-provider'
import { GTag } from './gtag'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = meta

export const viewport: Viewport = viewportNext

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
          <SocketProvider>
            <QueryProvider>
              <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                <ViewportProvider>
                  <KeystrokesProvider>
                    {children}
                    <Toaster />
                  </KeystrokesProvider>
                </ViewportProvider>
              </ThemeProvider>
            </QueryProvider>
          </SocketProvider>
        </body>

        <GTag />
      </html>
    </ClerkProvider>
  )
}
