import parseUrl from '@/lib/parse-url'
import { db } from '@repo/database'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'

interface Props {
  params: { email: string; showImage: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams: _ }: Props, __: ResolvingMetadata): Promise<Metadata> {
  const email = params.email ? decodeURIComponent(params.email.toString()) : undefined

  const showImageParam = params.showImage ? decodeURIComponent(params.showImage.toString()) : undefined

  const showImage = showImageParam ? (JSON.parse(showImageParam) === true ? true : false) : false

  const user = await db.user.findFirst({ where: { email }, include: { vote: { include: { candidate: true } } } })

  return {
    title: 'Kamu diundang untuk vote di Waktu Indonesia Memilih',
    openGraph: {
      images: [
        parseUrl(
          `/api/og?showImage=${showImage}&voteNumber=${user?.vote?.voteNumber}&nomorUrut=${user?.vote?.candidate
            .nomorUrut}&datetime=${user?.vote?.createdAt.toISOString()}`,
        ).href,
      ],
    },
  }
}

export default async function Page({ params }: Props) {
  return redirect(parseUrl(`/?ref=${params.email}&showImage=${params.showImage}`).href)
}
