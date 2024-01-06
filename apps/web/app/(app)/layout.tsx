import { Footer } from '@/components/footer'
import { Header } from './header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='background-repeat min-w-full min-h-[100svh] select-none'>
      <Header />

      <main className='max-w-[1400px] w-full mx-auto md:px-2 px-4 pt-10 pb-20'>{children}</main>

      <Footer />
    </main>
  )
}
