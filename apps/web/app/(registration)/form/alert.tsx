import { AlertDescription, AlertTitle, Alert as AlertComponent } from '@repo/web-ui/components'
import { Terminal } from 'lucide-react'

export const Alert = () => {
  return (
    <AlertComponent>
      <Terminal className='h-4 w-4' />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>Kamu hanya bisa pilih sekali dan gabisa balik lagi!</AlertDescription>
    </AlertComponent>
  )
}
