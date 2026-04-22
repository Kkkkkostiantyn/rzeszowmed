import {getPage, getAllPages} from '@/sanity/queries'
import {urlFor} from '@/sanity/image'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import Image from 'next/image'
import {notFound} from 'next/navigation'

type Props = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  const pages = await getAllPages()
  return pages.map((p: {slug: {current: string}}) => ({slug: p.slug.current}))
}

export default async function GenericPage({params}: Props) {
  const {slug} = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <article className="space-y-5">
      {page.heroImage ? (
        <div className="relative w-full h-44 rounded-2xl overflow-hidden">
          <Image
            src={urlFor(page.heroImage).width(900).height(350).url()}
            alt={page.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/30 to-transparent flex items-end p-7">
            <h1 className="text-white text-2xl font-bold">{page.title}</h1>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-700 px-7 py-6">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">MedFaktor Clinic</p>
          <h1 className="text-white text-2xl font-bold">{page.title}</h1>
        </div>
      )}

      {page.content && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-7 py-6">
          <PortableTextRenderer value={page.content} />
        </div>
      )}
    </article>
  )
}
