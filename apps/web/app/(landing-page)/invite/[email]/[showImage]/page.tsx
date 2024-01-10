import parseUrl from '@/lib/parse-url'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface Props {
  params: { email: string; showImage: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      title: 'Kamu diundang untuk vote di Waktu Indonesia Memilih',
      description: 'Hi, kamu diundang untuk vote di Waktu Indonesia Memilih loh! Yuk, vote sekarang!',
    },
  }
}

export default async function Page({ params }: Props) {
  return redirect(parseUrl(`/?ref=${params.email}&showImage=${params.showImage}`).href)
}
