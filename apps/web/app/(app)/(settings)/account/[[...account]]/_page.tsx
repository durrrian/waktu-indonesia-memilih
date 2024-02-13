import { UserProfile } from '@clerk/nextjs'
import './style.css'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WIM — Edit Akun',
  }
}

export default async function Page() {
  return (
    <main className='w-full max-w-[1100px] mx-auto h-fit mt-10 mb-20 select-none md:px-2 px-4'>
      <UserProfile
        path='/account'
        routing='path'
        appearance={{
          elements: {
            rootBox: 'w-full mx-auto background-repeat',
            card: 'border-0 shadow-none rounded-none w-full',
            navbar: 'hidden',
            scrollBox: 'text-foreground bg-background rounded-none w-full',
            pageScrollBox: 'text-foreground bg-background rounded-none w-full',
            page: 'text-foreground bg-background w-full',
            profilePage: 'text-foreground w-full',
            header: 'text-foreground w-full',
            headerTitle: 'text-foreground w-full',
            headerSubtitle: 'text-foreground w-full',
            profileSectionTitleText: 'text-foreground w-full',
            profileSectionTitle: 'border-border w-full',
            userPreviewMainIdentifier: 'text-foreground w-full',
            accordionTriggerButton: 'text-foreground w-full',
            accordionContent: 'text-foreground w-full',
            breadcrumbs: 'hidden',
            formField: 'text-foreground w-full',
            formFieldLabel: 'text-foreground w-full',
            form: 'text-foreground w-full',
            formFieldSuccessText: 'text-foreground w-full',
            formHeader: 'text-foreground w-full',
            formHeaderSubtitle: 'text-foreground w-full',
            otpCodeFieldInput: 'border-border text-foreground w-full',
            navbarMobileMenuButton: 'hidden',
            otpCodeFieldInputs: 'text-foreground w-full',
            otpCodeBox: 'text-foreground w-full',
            otpCodeField: 'text-foreground w-full',
            activeDevice: 'text-foreground w-full',
            profileSection: 'text-foreground w-full',
          },
        }}
      />
    </main>
  )
}
