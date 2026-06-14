import Link from 'next/link'

type Location = {_key: string; city: string; address: string; phones: string[]}
type Page = {_id: string; title: string; slug: {current: string}}
type Service = {_id: string; title: string; slug: {current: string}}

type Props = {
  companyName?: string
  legalName?: string
  shortDescription?: string
  phones: string[]
  emails: string[]
  locations: Location[]
  workingHours?: string
  saturdayHours?: string
  facebookUrl?: string
  linkedinUrl?: string
  mapUrl?: string
  pages: Page[]
  medicineServices: Service[]
}

export default function Footer({
  companyName,
  legalName,
  shortDescription,
  phones,
  emails,
  locations,
  workingHours,
  saturdayHours,
  facebookUrl,
  linkedinUrl,
  mapUrl,
  pages,
  medicineServices,
}: Props) {
  const year = new Date().getFullYear()
  const address = locations[0]?.address

  return (
    <footer className="bg-navy-900 text-slate-400">
      <div className="max-w-full mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1 — Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 72 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-9 flex-shrink-0">
              <path d="M36 72 C16 64 5 40 13 26 C21 16 36 44 36 72Z" fill="#3aafa9"/>
              <path d="M36 72 C56 64 67 40 59 26 C51 16 36 44 36 72Z" fill="white" fillOpacity="0.9"/>
              <circle cx="36" cy="13" r="9" fill="#3aafa9"/>
            </svg>
            <span className="leading-tight">
              <span className="font-bold text-base tracking-tight text-brand-400">MED</span>
              <span className="font-bold text-base tracking-tight text-white">FAKTOR</span>
            </span>
          </div>
          {shortDescription && (
            <p className="text-sm leading-relaxed text-slate-400">{shortDescription}</p>
          )}
          <div className="flex items-center gap-3 pt-1">
{linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center hover:bg-brand-500 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            )}
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label="Mapa"
                className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center hover:bg-brand-500 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Column 2 — Quick links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">Szybkie linki</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/#uslugi" className="text-sm hover:text-brand-400 transition-colors">
                Medycyna Pracy
              </Link>
            </li>
            {pages.map((p) => (
              <li key={p._id}>
                <Link href={`/${p.slug.current}`} className="text-sm hover:text-brand-400 transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        {medicineServices.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">Usługi</h4>
            <ul className="space-y-2.5">
              {medicineServices.map((s) => (
                <li key={s._id}>
                  <Link href={`/medycyna-pracy/${s.slug.current}`} className="text-sm hover:text-brand-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Column 4 — Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">Dane kontaktowe</h4>
          <ul className="space-y-3">
            {address && (
              <li className="flex items-start gap-2.5 text-sm">
                <svg className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{address}</span>
              </li>
            )}
            {phones[0] && (
              <li className="flex items-center gap-2.5 text-sm">
                <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href={`tel:${phones[0].replace(/\s/g, '')}`} className="hover:text-brand-400 transition-colors">{phones[0]}</a>
              </li>
            )}
            {emails[0] && (
              <li className="flex items-center gap-2.5 text-sm">
                <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href={`mailto:${emails[0]}`} className="hover:text-brand-400 transition-colors break-all">{emails[0]}</a>
              </li>
            )}
            {(workingHours || saturdayHours) && (
              <li className="flex items-start gap-2.5 text-sm">
                <svg className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>
                  {workingHours && <span className="block">{workingHours}</span>}
                  {saturdayHours && <span className="block">{saturdayHours}</span>}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-full mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {year} {legalName ?? companyName ?? 'MedFaktor'}. Wszelkie prawa zastrzeżone.</span>
          <div className="flex items-center gap-4">
            <Link href="/polityka-prywatnosci" className="hover:text-slate-300 transition-colors">Polityka prywatności</Link>
            <Link href="/rodo" className="hover:text-slate-300 transition-colors">RODO</Link>
            <Link href="/regulamin" className="hover:text-slate-300 transition-colors">Regulamin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
