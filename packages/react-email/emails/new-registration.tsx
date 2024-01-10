import { Body, Container, Head, Html, Link, Preview, Tailwind, Text, Hr } from '@react-email/components'

interface Props {
  name: string
}

const Email = ({ name = 'Furqon Wilogo' }: Props) => {
  const previewText = `Kamu sudah bisa voting 😁`

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

            <Text className='text-black text-[14px] leading-[24px]'>
              Kenalin, kami{' '}
              <Link className='underline text-blue-500' href='https://durrrian.com'>
                Durrrian
              </Link>
              , software agency yang ngebuat tools ini.
            </Text>

            <Text className='text-black text-[14px] leading-[24px]'>
              Kami harap WIM bisa menjadi tempat voting yang independen untuk warga Indonesia 🇮🇩
            </Text>

            <Text className='text-black text-[14px] leading-[24px]'>
              Oiya, buat kamu yang suka coding, kamu bisa kepo-in code kita di{' '}
              <Link className='underline text-blue-500' href='https://github.com/durrrian/waktu-indonesia-memilih'>
                Github
              </Link>
              .
            </Text>

            <Hr />

            <Text>
              <b className='font-semibold text-[14px] leading-[24px]'>
                {' '}
                Bukan untuk memilih yang terbaik, tapi untuk mencegah yang terburuk berkuasa.
              </b>
            </Text>

            <Text className='text-black text-[14px] leading-[24px]'>Selamat voting!</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Email
