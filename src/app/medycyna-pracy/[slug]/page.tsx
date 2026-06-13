import {getMedicineService, getAllMedicineServices} from '@/sanity/queries'
import {urlFor} from '@/sanity/image'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import Image from 'next/image'
import {notFound} from 'next/navigation'

type Props = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  const services = await getAllMedicineServices()
  return services.map((s: {slug: {current: string}}) => ({slug: s.slug.current}))
}

export default async function MedicineServicePage({params}: Props) {
  const {slug} = await params
  const service = await getMedicineService(slug)

  if (!service) notFound()

  return (
    <article className="space-y-5">
      {service.heroImage ? (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden">
          <Image
            src={urlFor(service.heroImage).width(900).height(350).url()}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent flex items-end p-7">
            <h1 className="text-white text-2xl font-bold">{service.title}</h1>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-brand-400 px-7 py-6">
          <p className="text-brand-200 text-xs font-semibold uppercase tracking-widest mb-1">Medycyna Pracy</p>
          <h1 className="text-white text-2xl font-bold">{service.title}</h1>
        </div>
      )}

      {service.content && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-7 py-6">
          <PortableTextRenderer value={service.content} />
        </div>
      )}
    </article>
  )
}
