import { Footer } from '@/components/footer'
import { Header } from './header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='background-repeat min-h-[100svh] min-w-full select-none'>
      <Header />

      <main className='mx-auto w-full max-w-[1400px] px-4 pb-20 pt-10 md:px-2'>{children}</main>

      <Footer />
    </main>
  )
}
