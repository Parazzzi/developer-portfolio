"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
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

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(storageKey)
    return isLanguage(stored) ? stored : defaultLanguage
  } catch {
    return defaultLanguage
  }
}

const subscribeHydration = () => () => {}
const clientHydrationSnapshot = () => true
const serverHydrationSnapshot = () => false

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
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrationSnapshot, serverHydrationSnapshot)
  const [preferredLanguage, setLanguageState] = useState<Language>(readStoredLanguage)
  // The server and first hydration render always agree; storage is read only once.
  const language = hydrated ? preferredLanguage : defaultLanguage

  useEffect(() => {
    syncDocumentLanguage(language)
  }, [language])

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    try {
      window.localStorage.setItem(storageKey, nextLanguage)
    } catch {
      // Language switching still works when the browser blocks persistent storage.
    }
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
