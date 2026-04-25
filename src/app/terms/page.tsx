'use client'

import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function TermsPage() {
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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Köpvillkor</h1>
        
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Avtal</h2>
            <p className="text-slate-600 leading-relaxed">
              Genom att genomföra ett köp på Strumpmix godkänner du dessa köpvillkor. Avtal ingås när du mottagit orderbekräftelsen via e-post.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Priser</h2>
            <p className="text-slate-600 leading-relaxed">
              Alla priser anges i svenska kronor (SEK) och inkluderar moms. Vi förbehåller oss rätten att ändra priser utan förhandsavisering.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Betalning</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi accepterar följande betalningsmetoder: Kredit-/betalkort, Swish, Klarna. Betalning sker säkert genom våra samarbetspartners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Leverans</h2>
            <p className="text-slate-600 leading-relaxed">
              Normal leveranstid är 3-5 vardagar. Vi skickar med PostNord eller Bring. Fraktkostnad tillkommer enligt val i kassan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Returer</h2>
            <p className="text-slate-600 leading-relaxed">
              Du har 14 dagars ångerrätt enligt distansavtalslagen. Produkterna ska returneras i originalförpackning och vara oanvända. 
              Returfrakt betalas av kund om inget annat överenskommits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Reklamationer</h2>
            <p className="text-slate-600 leading-relaxed">
              Vid reklamation kontakta oss via e-post på info@auroraecom.se. Vi följer konsumentköplagen och Kemp Lag (1990:412).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Personuppgifter</h2>
            <p className="text-slate-600 leading-relaxed">
              Vi behandlar dina personuppgifter enligt GDPR. Läs mer i vår Integritetspolicy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Kontakt</h2>
            <p className="text-slate-600 leading-relaxed">
              Aurora Ecom AB<br />
              Göteborg, Sverige<br />
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
