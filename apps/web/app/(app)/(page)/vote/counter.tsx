'use client'

interface Props {}

export const Counter = ({}: Props) => {
  return (
    <div className='bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 p-1 rounded-3xl w-fit h-fit'>
      <div className='bg-background rounded-3xl w-fit h-fit p-4 grid gap-4'>
        <div className='grid gap-2'>
          <div className='grid place-items-start'>
            <h3 className='md:text-6xl text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500'>
              12,500
            </h3>
          </div>
          <p className='md:text-2xl text-xl'>Sudah menentukan pilihan mereka</p>
        </div>

        <small>Hasil diupdate secara realtime loh!</small>
      </div>
    </div>
  )
}
