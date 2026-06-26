"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  defaultLanguage,
  isLanguage,
  translations,
  type Language,
  type Translation,
} from "@/lib/i18n/translations"

const storageKey = "portfolio-language"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function syncDocumentLanguage(language: Language) {
  document.documentElement.lang = language === "ua" ? "uk" : "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(storageKey)

    if (isLanguage(storedLanguage)) {
      setLanguageState(storedLanguage)
      syncDocumentLanguage(storedLanguage)
    }
  }, [])

  useEffect(() => {
    syncDocumentLanguage(language)
  }, [language])

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    window.localStorage.setItem(storageKey, nextLanguage)
    syncDocumentLanguage(nextLanguage)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "ua" : "en")
  }, [language, setLanguage])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
    }),
    [language, setLanguage, toggleLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }

  return context
}
