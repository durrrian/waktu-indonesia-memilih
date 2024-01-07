import Image from 'next/image'

export default function Loading() {
  return (
    <div className='h-[100svh] w-full flex items-center justify-center select-none overflow-hidden fixed inset-0 bg-background'>
      <div className='loading-animation w-fit h-fit flex items-center justify-center gap-2'>
        <Image
          src={'/logo_primary_dark.svg'}
          alt={''}
          width={125}
          height={125}
          draggable={false}
          quality={100}
          suppressHydrationWarning
        />
      </div>
    </div>
  )
}
