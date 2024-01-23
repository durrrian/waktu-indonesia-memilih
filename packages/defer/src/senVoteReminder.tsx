import { Resend } from 'resend'
import { defer } from '@defer/client'
import Email from '@repo/react-email/emails/vote-reminder'
import { db } from '@repo/database'

const resend = new Resend(process.env.RESEND_API_KEY!!)

async function sendVoteReminder() {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await db.user.findMany({ where: { vote: null } })

      for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i]

        await resend.emails.send({
          from: 'Waktu Indonesia Memilih <admin@waktuindonesiamemilih.id>',
          to: user.email,
          subject: 'Kamu belum voting!',
          react: <Email name={user.name} />,
        })

        console.log(`Successfully send email to ${user.email}`)
      }

      resolve('Successfully run sendVoteReminder function! Check logs.')
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      reject(error)
    }
  })
}

export default defer.cron(sendVoteReminder, '0 3 * * *', { retry: 5 })
