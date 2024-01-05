import { Logout } from './logout'
import { Progress } from './progress'

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='grid gap-10'>
      {children}

      <Logout />

      <Progress />
    </main>
  )
}
