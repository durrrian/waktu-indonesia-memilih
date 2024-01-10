import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'
import { currentUser } from '@/lib/current-user'
import { db } from '@repo/database'
import { WIMProfile } from '../wim-profile'
import { No1 } from '../no1'
import { No2 } from '../no2'
import { No3 } from '../no3'
import { LogoWIM } from '../logo-wim'

export const runtime = 'edge'

export const revalidate = false

export async function GET(request: NextRequest, context: { params: { userId: string } }) {
  const userId = context.params.userId

  const user = await db.user.findFirst({ where: { id: userId } })

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const vote = await db.vote.findFirst({ where: { userId: user.id }, include: { candidate: true } })

  if (!vote) return NextResponse.json({ error: 'Vote not found' }, { status: 404 })

  const showImageParam = request.nextUrl.searchParams.get('showImage')

  if (!showImageParam) {
    return NextResponse.json({ error: 'Missing query params' }, { status: 400 })
  }

  const nomorUrut = vote.candidate.nomorUrut

  const voteNumber = vote.voteNumber

  const showImage = JSON.parse(showImageParam) === true ? true : false

  const datetime = new Date(vote.createdAt)

  const datetimeStr = datetime.toLocaleString('id-ID', { dateStyle: 'long' })

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FCFEE3',
          width: '100%',
          height: '100%',
          padding: '150px 100px',
          textAlign: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          borderRadius: '60px',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '10px',
          }}
        >
          {(() => {
            if (!showImage) return <WIMProfile />

            if (nomorUrut === 1) return <No1 />
            if (nomorUrut === 2) return <No2 />
            if (nomorUrut === 3) return <No3 />
          })()}

          {(() => {
            if (voteNumber > 9999)
              return (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '80px',
                      color: 'rgb(107, 114, 128)',
                      fontWeight: 200,
                      textAlign: 'left',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '20px',
                    }}
                  >
                    <div>Peserta</div>
                    <div>voting</div>
                    <div>ke</div>
                  </div>

                  <div
                    style={{
                      fontSize: '80px',
                      color: 'rgb(107, 114, 128)',
                      fontWeight: 200,
                      textAlign: 'left',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '20px',
                    }}
                  >
                    <div style={{ fontWeight: 600, display: 'flex' }}>{voteNumber.toLocaleString()}</div>
                    <div>di</div>
                    <div style={{ display: 'flex' }}>
                      <span style={{ color: '#FF5A5F' }}>W</span>aktu
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: '80px',
                      color: 'rgb(107, 114, 128)',
                      fontWeight: 200,
                      textAlign: 'left',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '20px',
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      <span style={{ color: '#FF5A5F' }}>I</span>ndonesia
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span style={{ color: '#FF5A5F' }}>M</span>emilih
                    </div>
                  </div>
                </div>
              )

            if (voteNumber > 999)
              return (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '80px',
                      color: 'rgb(107, 114, 128)',
                      fontWeight: 200,
                      textAlign: 'left',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '20px',
                    }}
                  >
                    <div>Peserta</div>
                    <div>voting</div>
                    <div>ke</div>
                    <div style={{ fontWeight: 600, display: 'flex' }}>{voteNumber.toLocaleString()}</div>
                  </div>

                  <div
                    style={{
                      fontSize: '80px',
                      color: 'rgb(107, 114, 128)',
                      fontWeight: 200,
                      textAlign: 'left',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '20px',
                    }}
                  >
                    <div>di</div>
                    <div style={{ display: 'flex' }}>
                      <span style={{ color: '#FF5A5F' }}>W</span>aktu
                    </div>
                    <div style={{ display: 'flex' }}>
                      <span style={{ color: '#FF5A5F' }}>I</span>ndonesia
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: '80px',
                      color: 'rgb(107, 114, 128)',
                      fontWeight: 200,
                      textAlign: 'left',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '20px',
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      <span style={{ color: '#FF5A5F' }}>M</span>emilih
                    </div>
                  </div>
                </div>
              )

            return (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: '80px',
                    color: 'rgb(107, 114, 128)',
                    fontWeight: 200,
                    textAlign: 'left',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '20px',
                  }}
                >
                  <div>Peserta</div>
                  <div>voting</div>
                  <div>ke</div>
                  <div style={{ fontWeight: 600, display: 'flex' }}>{voteNumber}</div>
                  <div>di</div>
                </div>

                <div
                  style={{
                    fontSize: '80px',
                    color: 'rgb(107, 114, 128)',
                    fontWeight: 200,
                    textAlign: 'left',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '20px',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <span style={{ color: '#FF5A5F' }}>W</span>aktu
                  </div>
                  <div style={{ display: 'flex' }}>
                    <span style={{ color: '#FF5A5F' }}>I</span>ndonesia
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '80px',
                    color: 'rgb(107, 114, 128)',
                    fontWeight: 200,
                    textAlign: 'left',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '20px',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <span style={{ color: '#FF5A5F' }}>M</span>emilih
                  </div>
                </div>
              </div>
            )
          })()}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              fontSize: '50px',
              border: '5px solid rgb(107, 114, 128)',
              color: 'rgb(107, 114, 128)',
              borderRadius: '20px',
              padding: '10px 25px',
            }}
          >
            {datetimeStr}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              maxWidth: '230px',
            }}
          >
            <LogoWIM />
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
    },
  )
}
