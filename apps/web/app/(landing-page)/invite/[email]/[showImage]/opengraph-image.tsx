import { ImageResponse } from 'next/og'
import { db } from '@repo/database'
import { LogoWIM, LogoWIMPutih, No1, No2, No3 } from './og-components'

export const runtime = 'edge'

export const alt = 'Kamu diundang ke Waktu Indonesia Memilih'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { email: string; showImage: string } }) {
  const showImage = JSON.parse(params.showImage) === true ? true : false

  const email = decodeURIComponent(params.email)

  const user = await db.user.findFirst({ where: { email }, include: { vote: { include: { candidate: true } } } })

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: showImage ? '#FCFEE3' : '#222222',
          width: '100%',
          height: '100%',
          padding: '0px 150px',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {(() => {
          if (showImage) {
            return (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  paddingTop: '60px',
                }}
              >
                <LogoWIM />

                <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '50px',
                      color: '#222222',
                      fontWeight: 200,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '20px',
                      textAlign: 'center',
                    }}
                  >
                    <div>Peserta</div>
                    <div>voting</div>
                    <div>ke</div>
                    <div style={{ fontWeight: 900, display: 'flex' }}>{user?.vote?.voteNumber.toLocaleString()}</div>
                  </div>

                  <div
                    style={{
                      fontSize: '50px',
                      color: '#222222',
                      fontWeight: 200,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '20px',
                      textAlign: 'center',
                    }}
                  >
                    <div>di</div>
                    <div style={{ color: '#FF5A5F' }}>Waktu</div>
                    <div style={{ color: '#FF5A5F' }}>Indonesia</div>
                    <div style={{ color: '#FF5A5F' }}>Memilih</div>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '20px',
                    border: '2px solid #222222',
                    color: '#222222',
                    borderRadius: '12px',
                    padding: '8px 20px',
                  }}
                >
                  {user?.vote?.createdAt.toLocaleString('id-ID', { dateStyle: 'long' })}
                </div>

                {(() => {
                  if (user?.vote?.candidate.nomorUrut === 1) return <No1 />
                  if (user?.vote?.candidate.nomorUrut === 2) return <No2 />
                  if (user?.vote?.candidate.nomorUrut === 3) return <No3 />
                })()}
              </div>
            )
          }

          return (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                textAlign: 'left',
                paddingTop: '100px',
                paddingBottom: '100px',
              }}
            >
              <LogoWIMPutih />

              <div style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: '60px',
                    color: '#F5FAFD',
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
                  <div style={{ fontWeight: 900, display: 'flex' }}>{user?.vote?.voteNumber.toLocaleString()}</div>
                </div>

                <div
                  style={{
                    fontSize: '60px',
                    color: '#F5FAFD',
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
                  <div style={{ color: '#FF5A5F' }}>Waktu</div>
                  <div style={{ color: '#FF5A5F' }}>Indonesia</div>
                  <div style={{ color: '#FF5A5F' }}>Memilih</div>
                </div>
              </div>

              <div
                style={{
                  fontSize: '30px',
                  border: '2.5px solid #F5FAFD',
                  color: '#F5FAFD',
                  borderRadius: '15px',
                  padding: '10px 25px',
                }}
              >
                {user?.vote?.createdAt.toLocaleString('id-ID', { dateStyle: 'long' })}
              </div>
            </div>
          )
        })()}
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  )
}
