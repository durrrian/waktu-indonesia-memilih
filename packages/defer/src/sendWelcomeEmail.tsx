import { Resend } from 'resend'
import { defer } from '@defer/client'
import Email from '@repo/react-email/emails/new-registration'

const resend = new Resend(process.env.RESEND_API_KEY!!)

async function sendWelcomeEmail(email: string, name: string) {
  return new Promise(async (resolve, reject) => {
    try {
      await resend.emails.send({
        from: 'Waktu Indonesia Memilih <admin@waktuindonesiamemilih.id>',
        to: email,
        subject: 'Terima kasih sudah mendaftar di WIM!',
        react: <Email name={name} />,
      })

      resolve('Successfully run sendWelcomeEmail function! Check logs.')
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      reject(error)
    }
  })
}

export default defer(sendWelcomeEmail, {
  concurrency: 10,
  retry: 5,
})
