import { Resend } from 'resend'
import { defer } from '@defer/client'
import Email from '@repo/react-email/emails/after-vote'

const resend = new Resend(process.env.RESEND_API_KEY!!)

async function sendAfterVoteEMail(email: string, name: string, nomorUrut: 1 | 2 | 3) {
  return new Promise(async (resolve, reject) => {
    try {
      await resend.emails.send({
        from: 'Waktu Indonesia Memilih <admin@waktuindonesiamemilih.id>',
        to: email,
        subject: 'Vote kamu diterima!',
        react: <Email name={name} nomorUrut={nomorUrut} />,
      })

      resolve('Successfully run sendAfterVoteEMail function! Check logs.')
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      reject(error)
    }
  })
}

export default defer(sendAfterVoteEMail, {
  concurrency: 10,
  retry: 5,
})
