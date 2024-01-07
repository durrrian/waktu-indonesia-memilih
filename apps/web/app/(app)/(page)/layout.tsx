import { db } from '@repo/database'
import { Counter } from './counter'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const vote = await db.vote.count()

  return (
    <div className='w-full h-fit flex flex-col gap-32 items-center justify-center'>
      {children}

      <Counter initialData={vote} />
    </div>
  )
}
