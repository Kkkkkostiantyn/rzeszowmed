'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState, useRef, useEffect} from 'react'

type MedicineService = {_id: string; title: string; slug: {current: string}}
type Page = {_id: string; title: string; slug: {current: string}}

type Props = {
  phones: string[]
  instagram?: string
  whatsapp?: string
  facebookUrl?: string
  email?: string
  workingHours?: string
  appointmentUrl?: string
  medicineServices: MedicineService[]
  pages: Page[]
}

export default function Header({phones, instagram, whatsapp, facebookUrl, email, workingHours, appointmentUrl, medicineServices, pages}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isMedycyna = pathname?.startsWith('/medycyna-pracy')

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-full mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {phones[0] && (
              <a href={`tel:${phones[0].replace(/[\s]/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phones[0]}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </a>
            )}
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:flex hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            {workingHours && (
              <span className="hidden md:flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {workingHours}
              </span>
            )}
            <div className="flex items-center gap-3">
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <svg viewBox="0 0 72 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-10 flex-shrink-0">
                <path d="M36 72 C16 64 5 40 13 26 C21 16 36 44 36 72Z" fill="#3aafa9"/>
                <path d="M36 72 C56 64 67 40 59 26 C51 16 36 44 36 72Z" fill="#1b2d5e"/>
                <circle cx="36" cy="13" r="9" fill="#3aafa9"/>
              </svg>
              <span className="leading-tight">
                <span className="font-bold text-lg tracking-tight" style={{color: '#3aafa9'}}>MED</span><span className="font-bold text-lg tracking-tight" style={{color: '#1b2d5e'}}>FAKTOR</span>
                <br />
                <span className="text-slate-400 font-medium text-[9px] tracking-widest uppercase">Medycyna Pracy · Badania · Szkolenia</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {/* Medycyna Pracy dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isMedycyna ? 'text-brand-500' : 'text-slate-600 hover:text-brand-500 hover:bg-brand-50'}`}
                >
                  Medycyna Pracy
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isMedycyna && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-400 rounded-full" />}
                </button>

                {dropdownOpen && medicineServices.length > 0 && (
                  <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-xl shadow-lg border border-slate-100 min-w-60 py-1.5 z-50">
                    {medicineServices.map((s) => (
                      <Link
                        key={s._id}
                        href={`/medycyna-pracy/${s.slug.current}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-navy-900 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {pages.map((p) => {
                const active = pathname === `/${p.slug.current}`
                return (
                  <Link
                    key={p._id}
                    href={`/${p.slug.current}`}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${active ? 'text-brand-500' : 'text-slate-600 hover:text-brand-500 hover:bg-brand-50'}`}
                  >
                    {p.title}
                    {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-400 rounded-full" />}
                  </Link>
                )
              })}

              {/* CTA button */}
              {appointmentUrl && (
                <a
                  href={appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 px-4 py-2 bg-brand-400 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Umów wizytę
                </a>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2">
            <div className="space-y-0.5">
              <button
                onClick={() => setMobileDropdownOpen((o) => !o)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Medycyna Pracy
                <svg className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileDropdownOpen && medicineServices.map((s) => (
                <Link
                  key={s._id}
                  href={`/medycyna-pracy/${s.slug.current}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 pl-7 pr-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-500"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                  {s.title}
                </Link>
              ))}
              {pages.map((p) => (
                <Link
                  key={p._id}
                  href={`/${p.slug.current}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {p.title}
                </Link>
              ))}
              {appointmentUrl && (
                <a
                  href={appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 px-4 py-2.5 bg-brand-400 text-white text-sm font-semibold rounded-lg text-center"
                >
                  Umów wizytę
                </a>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
