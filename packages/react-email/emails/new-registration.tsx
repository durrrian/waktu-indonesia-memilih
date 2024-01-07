import { Body, Container, Head, Html, Link, Preview, Tailwind, Text } from '@react-email/components'

interface Props {
  name: string
}

const Email = ({ name = 'Furqon Wilogo' }: Props) => {
  const previewText = `Cieee yang baru registrasi😁`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]'>
            <Text className='text-black text-[14px] leading-[24px]'>Hi, {name}!</Text>

            <Text className='text-black text-[14px] leading-[24px]'>
              Kenalin, kita{' '}
              <Link className='underline text-blue-500' href='https://durrrian.com'>
                Durrrian
              </Link>
              , software agency yang ngebuat website ini.
            </Text>

            <Text className='text-black text-[14px] leading-[24px]'>
              Kita ngirim email ini cuman mau kenalan, dan buat kamu yang demen coding, bisa kepo-in code kita di{' '}
              <Link className='underline text-blue-500' href='https://github.com/durrrian/waktu-indonesia-memilih'>
                Github
              </Link>
              .
            </Text>

            <Text className='text-black text-[14px] leading-[24px]'>Selamat vote! Semoga Indonesia makin maju!</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Email
