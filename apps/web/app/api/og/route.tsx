import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'
import { LogoWIMPutih } from './logo-wim-putih'
import { LogoWIM } from './logo-wim'
import { No1 } from './no-1'
import { No2 } from './no-2'
import { No3 } from './no-3'

export const runtime = 'edge'

export const revalidate = false

export async function GET(request: NextRequest) {
  const showImageParam = request.nextUrl.searchParams.get('showImage')
  const voteNumberParam = request.nextUrl.searchParams.get('voteNumber')
  const nomorUrutParam = request.nextUrl.searchParams.get('nomorUrut')
  const datetimeParam = request.nextUrl.searchParams.get('datetime')

  if (!showImageParam || !voteNumberParam || !nomorUrutParam || !datetimeParam) {
    return NextResponse.json({ error: 'Missing query params' }, { status: 400 })
  }

  const showImage = JSON.parse(showImageParam) === true ? true : false
  const voteNumber = parseInt(voteNumberParam)
  const nomorUrut = parseInt(nomorUrutParam)
  const datetime = new Date(datetimeParam).toLocaleString('id-ID', { dateStyle: 'long' })

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
                    <div style={{ fontWeight: 900, display: 'flex' }}>{voteNumber.toLocaleString()}</div>
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
                  {datetime}
                </div>

                {(() => {
                  if (nomorUrut === 1) return <No1 />
                  if (nomorUrut === 2) return <No2 />
                  if (nomorUrut === 3) return <No3 />
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
                  <div style={{ fontWeight: 900, display: 'flex' }}>{voteNumber.toLocaleString()}</div>
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
                {datetime}
              </div>
            </div>
          )
        })()}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
