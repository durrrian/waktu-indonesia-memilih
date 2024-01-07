import { BASE_URL } from '@/lib/parse-url'
import { Metadata } from 'next'

const meta: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: 'Waktu Indonesia Memilih',

  description: 'Pilih calon presiden kalian dan cari tau sama-sama perkembangannya!',

  generator: 'Waktu Indonesia Memilih',
  applicationName: 'Waktu Indonesia Memilih',
  referrer: 'origin-when-cross-origin',
  keywords: ['Waktu Indonesia Memilih', 'Waktu Indonesia Memilih Web', 'Waktu Indonesia Memilih Web App'],
  authors: [{ name: 'Durrrian', url: 'https://durrrian.com' }],
  creator: 'Durrrian',
  publisher: 'Durrrian',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: 'Waktu Indonesia Memilih',
    description: 'Pilih calon presiden kalian dan cari tau sama-sama perkembangannya!',
    url: BASE_URL,
    siteName: 'Waktu Indonesia Memilih',
    images: [
      {
        url: '/meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Waktu Indonesia Memilih',
    description: 'Pilih calon presiden kalian dan cari tau sama-sama perkembangannya!',
    siteId: '1467726470533754880',
    creator: '@Audea_app',
    creatorId: '1467726470533754880',
    images: ['/meta.jpg'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/180x180.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/180x180.png',
    },
  },
}

export default meta
