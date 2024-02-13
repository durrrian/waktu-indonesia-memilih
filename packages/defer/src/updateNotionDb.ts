import { defer } from '@defer/client'
import { db } from '@repo/database'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_INTEGRATION!!,
})

async function updateNotionDb() {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await db.user.findMany({
        where: { notionPageId: null },
        include: { vote: { include: { candidate: true } } },
      })

      for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i]

        const email = user.email
        const registerDate = user.createdAt.toISOString()

        const rentangUsia = (() => {
          const rentangUsia = user.rentanUsia

          if (rentangUsia === 'UNDER_17') return 'Dibawah 17 Tahun'
          if (rentangUsia === 'BETWEEN_17_AND_25') return '17 — 25 Tahun'
          if (rentangUsia === 'BETWEEN_26_AND_35') return '26 — 35 Tahun'
          if (rentangUsia === 'BETWEEN_36_AND_45') return '36 — 45 Tahun'
          if (rentangUsia === 'OVER_45') return 'Diatas 45 Tahun'

          return 'Belum Memilih'
        })()

        const vote = user.vote ? 'YES' : 'NO'

        const provinsi = user.provinsi ?? 'BELUM MEMILIH'

        const pasanganPilihan = (() => {
          if (!user.vote) return 'BELUM MEMILIH'

          const nomorKandidat = user.vote.candidate.nomorUrut as 1 | 2 | 3

          if (nomorKandidat === 1) return 'Anies & Cak Imin'

          if (nomorKandidat === 2) return 'Prabowo & Gibran'

          return 'Ganjar & Mahfud'
        })()

        const properties = {
          Name: {
            title: [
              {
                text: {
                  content: user.name,
                },
              },
            ],
          },

          Email: {
            email,
          },

          'Register Date': {
            date: {
              start: registerDate,
            },
          },

          'Rentang Usia': {
            select: {
              name: rentangUsia,
            },
          },

          Vote: {
            select: {
              name: vote,
            },
          },

          Provinsi: {
            select: {
              name: provinsi,
            },
          },

          'Pasangan Pilihan': {
            select: {
              name: pasanganPilihan,
            },
          },
        }

        const notionPage = await notion.pages.create({
          parent: {
            database_id: 'f68542b0074049d4b03badb581c4fb1b',
          },
          properties,
        })

        await db.user.update({ where: { id: user.id }, data: { notionPageId: notionPage.id } })

        console.log(`Successfully update notion for user's ${email}`)
      }

      resolve('Successfully run updateNotionDb function! Check logs.')
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
      reject(error)
    }
  })
}

export default defer.cron(updateNotionDb, '0 10 * * *', { retry: 5 })
