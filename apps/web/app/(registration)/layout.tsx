export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='background-repeat min-w-full min-h-[100svh]'>
      <main className='max-w-[1400px] w-full mx-auto md:px-2 px-4 pt-10 pb-20'>{children}</main>
    </main>
  )
}
