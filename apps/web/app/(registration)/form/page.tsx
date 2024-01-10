import parseUrl from '@/lib/parse-url'
import { redirect } from 'next/navigation'

export default function Page() {
  return redirect(parseUrl('/form/1').href)
}
