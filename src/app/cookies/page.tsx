'use client'

import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center">
            <Logo className="h-8" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Cookiepolicy</h1>
        
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Vad är cookies?</h2>
            <p className="text-slate-600 leading-relaxed">
              Cookies är små textfiler som sparas på din enhet när du besöker en webbplats. De används för att förbättra 
              din upplevelse och för att webbplatsen ska fungera korrekt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Vilka cookies vi använder</h2>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">Nödvändiga cookies</h3>
            <p className="text-slate-600 leading-relaxed">
              Dessa cookies är absolut nödvändiga för att webbplatsen ska fungera. De möjliggör kundvagn, kassan 
              och säker inloggning. Du kan inte stänga av dessa.
            </p>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">Funktionella cookies</h3>
            <p className="text-slate-600 leading-relaxed">
              Dessa cookies kommer ihåg dina preferenser som språk och platsinställningar.
            </p>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">Analyscookies</h3>
            <p className="text-slate-600 leading-relaxed">
              Vi använder analysverktyg för att förstå hur besökare använder vår webbplats. 
              Detta hjälper oss att förbättra sidan.
            </p>
            
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">Marknadsföringscookies</h3>
            <p className="text-slate-600 leading-relaxed">
              Vi använder dessa för att visa relevanta annonser baserat på dina intressen. 
              Du kan välja bort dessa i cookie-inställningarna.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Tredjepartscookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi använder tjänster från tredje part som kan sätta egna cookies:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li><strong>Supabase:</strong> Användarautentisering</li>
              <li><strong>Vercel:</strong> Webbläsning och analys</li>
              <li><strong>Klarna:</strong> Betalningshantering</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Hur du hanterar cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              De flesta webbläsare låter dig:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Se vilka cookies som är installerade</li>
              <li>Radera alla eller vissa cookies</li>
              <li>Blockera cookies från alla eller vissa sajter</li>
              <li>Blockera tredjepartscookies</li>
              <li>Radera alla cookies när du stänger webbläsaren</li>
            </ul>
            <p className="text-slate-600 mt-3">
              Instruktioner för att hantera cookies finns i din webbläsares hjälpfunktion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Konsekvenser av att blockera cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Om du blockerar cookies kan vissa funktioner på webbplatsen sluta fungera, såsom:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Varukorgen fungerar inte</li>
              <li>Du kan inte logga in</li>
              <li>Vissa inställningar sparas inte</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Uppdateringar av policyn</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi uppdaterar denna cookiepolicy regelbundet. Senaste uppdatering: April 2026.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Kontakt</h2>
            <p className="text-slate-600 leading-relaxed">
              Vid frågor om vår användning av cookies, kontakta oss:<br />
              E-post: info@auroraecom.se
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-pink-500 hover:text-pink-600 font-medium">
            ← Tillbaka till startsidan
          </Link>
        </div>
      </main>
    </div>
  )
}
