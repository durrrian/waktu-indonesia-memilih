import { Body, Container, Head, Html, Preview, Tailwind, Text, Img, Link, Hr } from '@react-email/components'

interface Props {
  name: string
  nomorUrut: 1 | 2 | 3
}

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://waktuindonesiamemilih.id'

const Email = ({ name = 'Furqon Wilogo', nomorUrut = 1 }: Props) => {
  const previewText = `Pilihanmu adalah nomor urut ${nomorUrut}🥳`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]'>
            <Text className='text-black text-[14px] leading-[24px]'>
              <b className='font-semibold'>Hi, {name}!</b>
            </Text>

            <Text className='text-black text-[14px] leading-[24px]'>Terimakasih sudah nge-vote 😉</Text>

            <Text className='text-black text-[14px] leading-[24px]'>
              Kamu bisa pantau posisi pilihanmu di laman{' '}
              <Link className='underline text-blue-500' href='https://waktuindonesiamemilih.id/metrics'>
                Metrics
              </Link>
            </Text>

            <Text>
              <b className='font-semibold text-[14px] leading-[24px]'>
                {' '}
                Kalau kamu suka sama WIM, jangan lupa ajak teman-teman kamu voting juga ya! 😉
              </b>
            </Text>

            <Hr />

            <Container className='relative w-[350px]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='61'
                height='60'
                viewBox='0 0 61 60'
                fill='none'
                className='absolute top-0 right-0'
              >
                <path
                  d='M59.9907 34.7962C59.6641 36.6824 56.7703 37.8533 56.1069 39.5697C55.4173 41.3452 56.7797 44.1449 55.7896 45.725C54.7786 47.3335 51.6654 47.2881 50.3645 48.6393C49.061 50.006 49.2401 53.1103 47.7139 54.1996C46.1722 55.2862 43.3115 54.0584 41.5861 54.8266C39.8789 55.582 38.8595 58.5265 37.0176 58.9561C35.1965 59.3573 33.0307 57.1511 31.1139 57.1855C29.2589 57.2306 27.1987 59.565 25.3125 59.2384C23.4263 58.9118 22.2554 56.018 20.539 55.3546C18.7635 54.665 15.9638 56.0274 14.3836 55.0373C12.7752 54.0263 12.8206 50.9131 11.4694 49.6122C10.1027 48.3087 6.99837 48.4878 5.90908 46.9616C4.82248 45.42 6.05028 42.5592 5.28211 40.8339C4.52673 39.1266 1.58215 38.1072 1.15264 36.2653C0.751366 34.4442 2.95759 32.2784 2.92322 30.3616C2.87814 28.5066 0.543719 26.4464 0.870285 24.5602C1.19685 22.674 4.09072 21.5031 4.75413 19.7867C5.44372 18.0112 4.08128 15.2115 5.07144 13.6314C6.08241 12.0229 9.19563 12.0683 10.4965 10.7171C11.8 9.35038 11.6209 6.24608 13.1471 5.1568C14.6887 4.07019 17.5495 5.29799 19.2748 4.52982C20.9821 3.77444 22.0015 0.829863 23.8434 0.400348C25.6645 -0.000922382 27.8303 2.2053 29.7471 2.17093C31.6021 2.12584 33.6623 -0.20857 35.5485 0.117997C37.4347 0.444564 38.6056 3.33842 40.322 4.00184C42.0975 4.69143 44.8972 3.32899 46.4773 4.31915C48.0858 5.33013 48.0404 8.44334 49.3916 9.74418C50.7583 11.0477 53.8626 10.8686 54.9519 12.3948C56.0385 13.9365 54.8107 16.7972 55.5789 18.5226C56.3343 20.2298 59.2788 21.2492 59.7084 23.0911C60.1096 24.9122 57.9034 27.078 57.9378 28.9948C57.9829 30.8498 60.3173 32.91 59.9907 34.7962Z'
                  fill={(() => {
                    if (nomorUrut === 1) return '#749C75'
                    if (nomorUrut === 2) return '#FFB449'
                    return '#FF5A5F'
                  })()}
                />
                <text
                  x='50%'
                  y='50%'
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fill='#fff'
                  fontSize={20}
                  transform='rotate(15, 30.5, 30)'
                  fontWeight={600}
                >
                  {nomorUrut}
                </text>
              </svg>
              <Img
                src={`${baseUrl}/candidate/no_${nomorUrut}.png`}
                alt={`Foto pasangan nomor urut ${nomorUrut}`}
                width={350}
                height={170}
              />
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Email
