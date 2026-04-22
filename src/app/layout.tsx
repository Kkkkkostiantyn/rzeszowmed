import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import {getSiteSettings, getAllPages, getAllMedicineServices} from '@/sanity/queries'

const inter = Inter({subsets: ['latin', 'latin-ext']})

export const metadata: Metadata = {
  title: 'MedFaktor CLINIC — Medycyna Pracy',
  description: 'Profesjonalne badania z zakresu medycyny pracy i usługi BHP w Rzeszowie.',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const [settings, pages, medicineServices] = await Promise.all([
    getSiteSettings(),
    getAllPages(),
    getAllMedicineServices(),
  ])

  return (
    <html lang="pl" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-slate-50">
        <Header
          phones={settings?.phones ?? []}
          instagram={settings?.instagram}
          whatsapp={settings?.whatsapp}
          email={settings?.emails?.[0]}
          medicineServices={medicineServices ?? []}
          pages={pages ?? []}
        />

        <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          <main className="min-w-0">{children}</main>
          <div className="lg:sticky lg:top-[88px]">
            <Sidebar
              appointmentLabel={settings?.appointmentLabel}
              appointmentUrl={settings?.appointmentUrl}
              legalName={settings?.legalName}
              locations={settings?.locations ?? []}
              phones={settings?.phones ?? []}
              emails={settings?.emails ?? []}
            />
          </div>
        </div>

        <footer className="bg-slate-900 text-slate-400 mt-auto">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <span className="text-white font-semibold">{settings?.companyName ?? 'MedFaktor CLINIC'}</span>
            <span>© {new Date().getFullYear()} Wszelkie prawa zastrzeżone.</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
