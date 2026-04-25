import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  
  // Get all query params and hash
  const searchParams = url.searchParams
  const hash = url.hash
  
  // Check for token in query params (type=recovery)
  const token = searchParams.get('token')
  const type = searchParams.get('type')
  
  // Check for token in hash fragment (Supabase often puts it here)
  let hashToken: string | null = null
  let hashType: string | null = null
  if (hash) {
    const hashParams = new URLSearchParams(hash.substring(1))
    hashToken = hashParams.get('access_token') || hashParams.get('token')
    hashType = hashParams.get('type') || searchParams.get('type')
  }
  
  // Use token from either source
  const finalToken = token || hashToken
  const finalType = type || hashType || 'recovery'
  
  // If we have a recovery token, redirect to reset-password page
  if (finalToken && finalType === 'recovery') {
    const resetUrl = new URL('/reset-password', url.origin)
    resetUrl.searchParams.set('token', finalToken)
    return NextResponse.redirect(resetUrl.toString())
  }
  
  // Fallback: redirect to home
  return NextResponse.redirect(new URL('/', url.origin))
}
