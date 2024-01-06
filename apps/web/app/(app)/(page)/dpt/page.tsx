import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Daftar Pemilih Tetap',
  }
}

export default async function Page() {
  return <div>This is a page!</div>
}
