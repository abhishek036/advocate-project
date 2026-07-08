'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE_NAME = 'rv_studio_auth'

export async function studioLogin(formData: FormData) {
  const enteredSecret = formData.get('secret') as string
  const from = (formData.get('from') as string) || '/studio'
  const STUDIO_SECRET = process.env.STUDIO_SECRET

  if (!STUDIO_SECRET || enteredSecret !== STUDIO_SECRET) {
    redirect(`/studio-login?error=1&from=${encodeURIComponent(from)}`)
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, STUDIO_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    // Session cookie (expires when browser closes) — no persistent storage
    maxAge: 60 * 60 * 8, // 8 hours
  })

  redirect(from)
}

export async function studioLogout() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  redirect('/studio-login')
}
