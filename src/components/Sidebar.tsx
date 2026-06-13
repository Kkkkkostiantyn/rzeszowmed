type Location = {
  _key: string
  city: string
  address: string
  phones: string[]
}

type Props = {
  appointmentLabel?: string
  appointmentUrl?: string
  legalName?: string
  locations: Location[]
  phones: string[]
  emails: string[]
}

export default function Sidebar({appointmentLabel, appointmentUrl, legalName, locations, phones, emails}: Props) {
  return (
    <aside className="space-y-4">
      {/* Appointment CTA */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-brand-500 to-navy-900 p-6 text-white shadow-lg shadow-navy-900/20">
        <div className="mb-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-200">Zaplanuj wizytę</span>
        </div>
        <p className="font-semibold text-lg leading-snug mb-4">
          {appointmentLabel || 'Umów badanie medyczne'}
        </p>
        {appointmentUrl && (
          <a
            href={appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-navy-900 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-50 transition-colors shadow-sm"
          >
            Umów wizytę
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>

      {/* Contact card */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900 text-base">Dane kontaktowe</h3>
          {legalName && <p className="text-xs text-slate-500 mt-0.5">{legalName}</p>}
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* Locations */}
          {locations.length > 0 && (
            <div className="space-y-3">
              {locations.map((loc) => (
                <div key={loc._key} className="flex gap-2.5">
                  <svg className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{loc.city}</p>
                    <p className="text-xs text-slate-500">{loc.address}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phones */}
          {phones.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              {phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[\s]/g, '')}`}
                  className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-brand-500 transition-colors"
                >
                  <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {phone}
                </a>
              ))}
            </div>
          )}

          {/* Emails */}
          {emails.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              {emails.map((mail) => (
                <a
                  key={mail}
                  href={`mailto:${mail}`}
                  className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-brand-500 transition-colors"
                >
                  <svg className="w-4 h-4 text-brand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="break-all">{mail}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
