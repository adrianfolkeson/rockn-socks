'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Language } from './translations'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Lazy initializer - runs only once on initialization
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('strumpmix-lang')
      if (saved === 'sv' || saved === 'en') {
        return saved
      }
    }
    return 'sv'
  }
  
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('strumpmix-lang', lang)
    }
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
