import Link from 'next/link'
import Image from 'next/image'
import {getSiteSettings, getAllMedicineServices, getAllPages} from '@/sanity/queries'
import {urlFor} from '@/sanity/image'
import Sidebar from '@/components/Sidebar'

type Service = {
  _id: string
  title: string
  slug: {current: string}
  shortDescription?: string
  icon?: string
  featured?: boolean
  processingTime?: string
}

const iconMap: Record<string, React.ReactNode> = {
  stethoscope: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  person: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
}

const defaultIcons = ['stethoscope', 'calendar', 'person', 'shield']

export default async function HomePage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getAllMedicineServices(),
  ])

  const heroImageUrl = settings?.heroImage ? urlFor(settings.heroImage).width(800).height(600).url() : null

  return (
    <>
      <div className="max-w-full mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Main content */}
          <div className="space-y-6 min-w-0">
            {/* Hero */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-brand-500 relative min-h-[340px]">
              {/* Doctors image — absolutely overlaid, does not take flex space */}
              <div className="hidden md:block absolute right-[-120] bottom-0 top-0 w-[620px] pointer-events-none">
                <Image
                  src={heroImageUrl ?? '/doctors.png'}
                  alt="MedFaktor — lekarze"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  priority
                />
              </div>
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center p-8 md:p-10 md:pr-48 min-h-[340px]">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-300 mb-4">
                  MedFaktor Clinic · Rzeszów
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                  Medycyna Pracy 
                </h1>
                <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-md mb-6">
                  Profesjonalna opieka zdrowotna dla pracowników i pracodawców. Badania wstępne, okresowe i kontrolne.
                </p>

                {/* Feature badges */}
                <div className="flex flex-col gap-3 mb-7">
                  {([
                    {
                      icon: (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      ),
                      title: 'Szybkie terminy',
                      sub: 'Badania nawet w 24h',
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                      title: 'Doświadczeni lekarze',
                      sub: 'Specjaliści medycyny pracy',
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      ),
                      title: 'Kompleksowa obsługa',
                      sub: 'Wszystko w jednym miejscu',
                    },
                  ] as const).map((b) => (
                    <div key={b.title} className="flex items-center gap-2.5">
                      <span className="text-brand-300">{b.icon}</span>
                      <div>
                        <p className="text-white text-base font-semibold leading-tight">{b.title}</p>
                        <p className="text-white/60 text-sm leading-tight mt-0.5">{b.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  {settings?.appointmentUrl && (
                    <a
                      href={settings.appointmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brand-400 hover:bg-brand-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-brand-500/30"
                    >
                      Umów wizytę
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                  <Link
                    href="#uslugi"
                    className="inline-flex items-center gap-2 border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Zobacz usługi
                  </Link>
                </div>
              </div>

            </div>

            {/* Services */}
            {services && services.length > 0 && (
              <div id="uslugi">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 px-1">
                  Nasze usługi
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {services.map((s: Service, i: number) => {
                    const iconKey = s.icon ?? defaultIcons[i % defaultIcons.length]
                    return (
                      <Link
                        key={s._id}
                        href={`/medycyna-pracy/${s.slug.current}`}
                        className={`group relative flex flex-col bg-white border rounded-2xl p-6 hover:shadow-md transition-all ${s.featured ? 'border-brand-300 shadow-sm shadow-brand-100' : 'border-slate-100 hover:border-brand-200'}`}
                      >
                        {s.featured && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-md whitespace-nowrap">
                            Najczęściej wybierane
                          </span>
                        )}
                        {/* Icon + title row */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${s.featured ? 'bg-brand-100 text-brand-600' : 'bg-brand-50 text-brand-500 group-hover:bg-brand-100'} transition-colors`}>
                            {iconMap[iconKey] ?? iconMap.shield}
                          </div>
                          <h3 className="font-bold text-navy-900 text-base leading-snug group-hover:text-brand-600 transition-colors">
                            {s.title}
                          </h3>
                        </div>
                        {/* Description */}
                        {s.shortDescription && (
                          <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{s.shortDescription}</p>
                        )}
                        {/* Footer */}
                        <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100 mt-auto">
                          <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs text-slate-400">Czas realizacji: {s.processingTime ?? 'do 7 dni'}</span>
                          <svg className="w-4 h-4 text-slate-300 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-[88px]">
            <Sidebar
              appointmentLabel={settings?.appointmentLabel}
              appointmentUrl={settings?.appointmentUrl}
              legalName={settings?.legalName}
              locations={settings?.locations ?? []}
              phones={settings?.phones ?? []}
              emails={settings?.emails ?? []}
              mapUrl={settings?.mapUrl}
              workingHours={settings?.workingHours}
              saturdayHours={settings?.saturdayHours}
            />
          </div>
        </div>
      </div>
    </>
  )
}
