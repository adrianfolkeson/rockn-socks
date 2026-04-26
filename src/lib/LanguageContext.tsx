'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language } from './translations'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('sv')
  
  // Load saved language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('strumpmix-lang') as Language
    if (saved === 'sv' || saved === 'en') {
      setLanguage(saved)
    }
  }, [])
  
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('strumpmix-lang', lang)
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
