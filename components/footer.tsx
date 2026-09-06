"use client"

import { ArrowUp } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const { language } = useLanguage()
  return <footer className="site-footer site-shell"><a href="#top" className="footer-signature">DB<span className="accent">✳</span></a><p>© {new Date().getFullYear()} DEMENTIY BESARAB</p><span className="footer-concept">DIGITAL ARTIFACTS / UNITY · C# · XR</span><a href="#top" className="back-top">{language === "en" ? "Back to top" : "На початок"}<ArrowUp size={15} /></a></footer>
}
