import {getAllMedicineServices} from '@/sanity/queries'
import Link from 'next/link'

export default async function HomePage() {
  const services = await getAllMedicineServices()

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 p-8 md:p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
        <div className="relative">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-200 mb-3">
            MedFaktor Clinic · Rzeszów
          </span>
          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-3">
            Medycyna Pracy
          </h1>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-lg">
            Profesjonalna opieka zdrowotna dla pracowników i pracodawców. Badania wstępne, okresowe i kontrolne.
          </p>
        </div>
      </div>

      {/* Services */}
      {services && services.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 px-1">
            Nasze usługi
          </h2>
          <div className="grid gap-2">
            {services.map((s: {_id: string; title: string; slug: {current: string}}) => (
              <Link
                key={s._id}
                href={`/medycyna-pracy/${s.slug.current}`}
                className="group flex items-center justify-between bg-white border border-slate-100 rounded-xl px-5 py-4 hover:border-blue-200 hover:shadow-sm hover:shadow-blue-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-800 group-hover:text-blue-700 transition-colors">
                    {s.title}
                  </span>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
