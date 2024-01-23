import { Body, Container, Head, Html, Link, Preview, Tailwind, Text, Hr, Button } from '@react-email/components'

interface Props {
  name: string
}

const Email = ({ name = 'Furqon Wilogo' }: Props) => {
  const previewText = `Jangan lupa voting yaa!`

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
              Nampaknya kamu udah registrasi tapi belum voting nih. Yuk segera voting!
            </Text>

            <Button href='https://waktuindonesiamemilih.id/vote'>Vote sekarang</Button>

            <Text className='text-black text-[14px] leading-[24px]'>
              Kalo kamu nemu kendala saat registrasi, jangan sungkan-sungkan untuk report kendala kamu lewat email. Bisa
              ke{' '}
              <Link className='underline text-blue-500' href='mailto:furqon@durrrian.com'>
                Furqon
              </Link>{' '}
              atau{' '}
              <Link className='underline text-blue-500' href='mailto:rizqy@durrrian.com'>
                Rizqy
              </Link>
            </Text>

            <Hr />

            <Text className='text-black text-[14px] leading-[24px]'>Selamat voting!</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Email
