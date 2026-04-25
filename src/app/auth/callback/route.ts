import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: Request) {
  const { searchParams, hash } = new URL(request.url)
  
  const token = searchParams.get('token') || hash.split('&').find(p => p.startsWith('token='))?.split('=')[1]
  const type = searchParams.get('type') || 'recovery'
  
  if (token && type === 'recovery') {
    // Create a client-side safe URL to exchange the token
    const redirectUrl = new URL('/reset-password', request.url)
    redirectUrl.searchParams.set('token', token)
    
    return NextResponse.redirect(redirectUrl.toString())
  }
  
  // Fallback redirect to home
  return NextResponse.redirect(new URL('/', request.url))
}
