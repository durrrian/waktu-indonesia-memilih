import { Counter } from './counter'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-fit flex flex-col gap-32 items-center justify-center'>
      {children}

      <Counter />
    </div>
  )
}
