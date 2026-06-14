export const revalidate = 60

import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
          facebookUrl={settings?.facebookUrl}
          email={settings?.emails?.[0]}
          workingHours={settings?.workingHours}
          appointmentUrl={settings?.appointmentUrl}
          medicineServices={medicineServices ?? []}
          pages={pages ?? []}
        />

        <main className="flex-1">
          {children}
        </main>

        <Footer
          companyName={settings?.companyName}
          legalName={settings?.legalName}
          shortDescription={settings?.shortDescription}
          phones={settings?.phones ?? []}
          emails={settings?.emails ?? []}
          locations={settings?.locations ?? []}
          workingHours={settings?.workingHours}
          saturdayHours={settings?.saturdayHours}
          facebookUrl={settings?.facebookUrl}
          linkedinUrl={settings?.linkedinUrl}
          mapUrl={settings?.mapUrl}
          pages={pages ?? []}
          medicineServices={medicineServices ?? []}
        />
      </body>
    </html>
  )
}
