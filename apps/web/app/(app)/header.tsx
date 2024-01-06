'use client'

import { BarChart, FormInput, LogOut, User2, Vote } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Button,
} from '@repo/web-ui/components'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Fragment } from 'react'
import { useClerk } from '@clerk/nextjs'
import { bindKeyCombo } from '@rwh/react-keystrokes'
import { ToggleTheme } from '@/components/toggle-theme'

export const Header = () => {
  const menu = [
    [
      { name: 'Vote', path: '/vote', icon: Vote },
      { name: 'Metrics', path: '/metrics', icon: BarChart },
      { name: 'Daftar Pemilih Tetap', path: '/dpt', icon: FormInput },
    ],
    [{ name: 'Edit Account', path: '/account', icon: User2 }],
  ]

  const pathname = usePathname()

  const { signOut } = useClerk()

  const router = useRouter()

  const logout = async () => {
    await signOut()
    router.push('/login')
  }

  bindKeyCombo('shift > q', {
    onPressed: logout,
  })

  return (
    <nav className='w-full h-fit flex items-center justify-between max-w-[1400px] md:px-2 px-4 mx-auto pt-10 pb-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          {menu.map((itemMenu, i) => (
            <Fragment key={`${i}-itemmenu`}>
              <DropdownMenuGroup>
                {itemMenu.map((item, j) => {
                  const disabled = item.path.includes(pathname)

                  return (
                    <DropdownMenuItem key={`${j}-individual`} disabled={disabled} asChild>
                      <Link
                        href={item.path}
                        className={
                          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                        }
                      >
                        <item.icon className='mr-2 h-4 w-4' />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
            </Fragment>
          ))}

          <DropdownMenuItem onClick={logout}>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ToggleTheme />
    </nav>
  )
}
