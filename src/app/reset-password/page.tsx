'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Logo } from '@/components/Logo'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      // Get token from query params (passed from callback)
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')
      
      // Also check hash fragment
      const hash = window.location.hash
      let hashToken: string | null = null
      if (hash) {
        const hashParams = new URLSearchParams(hash.substring(1))
        hashToken = hashParams.get('access_token')
      }
      
      // If we have a token, we need to exchange it for a session
      if (token || hashToken) {
        // The token exchange happens automatically with getSession when using the same supabase client
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error || !session) {
          setIsValidToken(false)
        } else {
          setIsValidToken(true)
        }
      } else {
        // No token, check if there's already a valid session
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error || !session) {
          setIsValidToken(false)
        } else {
          setIsValidToken(true)
        }
      }
    }
    checkSession()
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password.length < 6) {
      setError('Lösenordet måste vara minst 6 tecken')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte')
      return
    }
    
    setIsLoading(true)
    
    try {
      const { error } = await supabase.auth.updateUser({ password })
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        // Redirect to home after 2 seconds
        setTimeout(() => router.push('/'), 2000)
      }
    } catch (_err) {
      setError('Ett fel uppstod. Försök igen.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isValidToken === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <Logo className="h-12 mb-4" />
          <p className="text-slate-500">Laddar...</p>
        </div>
      </div>
    )
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Ogiltig länk</h1>
          <p className="text-slate-500 mb-6">
            Den här återställningslänken är inte längre giltig eller har redan använts.
          </p>
          <Link 
            href="/"
            className="inline-block w-full bg-pink-500 hover:bg-pink-600 text-white py-3.5 rounded-xl font-bold text-base transition-colors touch-manipulation min-h-[48px]"
          >
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Lösenordet är ändrat!</h1>
          <p className="text-slate-500 mb-6">
            Du kan nu logga in med ditt nya lösenord.
          </p>
          <p className="text-slate-400 text-sm">Omdirigerar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Logo className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900">Nytt lösenord</h1>
          <p className="text-slate-500 mt-2">Ange ditt nya lösenord nedan</p>
        </div>
        
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nytt lösenord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minst 6 tecken"
              className="w-full p-4 border border-slate-200 rounded-xl text-base min-h-[48px] focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              required
              minLength={6}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Bekräfta lösenord
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Bekräfta ditt lösenord"
              className="w-full p-4 border border-slate-200 rounded-xl text-base min-h-[48px] focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              required
              minLength={6}
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white py-3.5 rounded-xl font-bold text-base shadow-lg transition-colors touch-manipulation min-h-[48px] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Ändrar...</span>
              </>
            ) : (
              'Spara nytt lösenord'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-pink-500 hover:text-pink-600 text-sm font-medium">
            ← Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </div>
  )
}
