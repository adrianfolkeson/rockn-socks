'use client'

import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function PrivacyPage() {
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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Integritetspolicy</h1>
        
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Ansvarig för behandlingen</h2>
            <p className="text-slate-600 leading-relaxed">
              Aurora Ecom AB<br />
              Göteborg, Sverige<br />
              E-post: info@auroraecom.se
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Vilka uppgifter samlar vi in</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi samlar in följande personuppgifter när du handlar hos oss:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Namn och adress</li>
              <li>E-postadress</li>
              <li>Telefonnummer (frivilligt)</li>
              <li>Betalningsinformation (hanteras av betalningsleverantör)</li>
              <li>Beställningshistorik</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Hur vi använder uppgifterna</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi använder dina uppgifter för att:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Behandla och leverera din beställning</li>
              <li>Kommunicera med dig angående din order</li>
              <li>Skicka nyhetsbrev och marknadsföring (med ditt samtycke)</li>
              <li>Förbättra vår webbutik och tjänster</li>
              <li>Efterleva lagliga skyldigheter</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Laglig grund</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi behandlar dina uppgifter baserat på:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li><strong>Avtalets uppfyllelse:</strong> För att leverera din beställning</li>
              <li><strong>Rättslig förpliktelse:</strong> För bokföring och skatteregler</li>
              <li><strong>Samtycke:</strong> För marknadsföring och nyhetsbrev</li>
              <li><strong>Berättigat intresse:</strong> För att förhindra bedrägeri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Delning av uppgifter</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi delar dina uppgifter med:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Betalningsleverantörer (Klarna, Stripe)</li>
              <li>Logistikpartners (PostNord, Bring)</li>
              <li>IT-leverantörer (hosting, e-post)</li>
            </ul>
            <p className="text-slate-600 mt-2">
              Vi säljer aldrig dina uppgifter till tredje part.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Hur länge vi sparar uppgifterna</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi sparar dina uppgifter så länge det är nödvändigt för att uppfylla avtalet eller enligt lagliga krav. 
              Bokföringsmaterial sparas i 7 år.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Dina rättigheter</h2>
            <p className="text-slate-600 leading-relaxed">
              Du har rätt att:
            </p>
            <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
              <li>Få tillgång till dina uppgifter</li>
              <li>Få felaktiga uppgifter rättade</li>
              <li>Få uppgifter raderade (under vissa förutsättningar)</li>
              <li>Invända mot behandling</li>
              <li>Få dina uppgifter överförda</li>
            </ul>
            <p className="text-slate-600 mt-2">
              Kontakta oss på info@auroraecom.se för att utöva dina rättigheter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi använder cookies för att förbättra din upplevelse. Läs mer i vår Cookiepolicy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Kontakt</h2>
            <p className="text-slate-600 leading-relaxed">
              Vid frågor om vår personuppgiftsbehandling, kontakta oss:<br />
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
