import { getPage, getAllPages, getSiteSettings } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((p: { slug: { current: string } }) => ({
    slug: p.slug.current,
  }));
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params;
  const [page, settings] = await Promise.all([
    getPage(slug),
    getSiteSettings(),
  ]);

  if (!page) notFound();

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
        <article className="space-y-5 min-w-0">
          {page.heroImage ? (
            <div className="relative w-full h-44 rounded-2xl overflow-hidden">
              <Image
                src={urlFor(page.heroImage).width(900).height(350).url()}
                alt={page.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent flex items-end p-7">
                <h1 className="text-white text-2xl font-bold">{page.title}</h1>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-brand-400 px-7 py-6">
              <p className="text-brand-200 text-xs font-semibold uppercase tracking-widest mb-1">
                MedFaktor Clinic
              </p>
              <h1 className="text-white text-2xl font-bold">{page.title}</h1>
            </div>
          )}

          {page.content && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-7 py-6">
              <PortableTextRenderer value={page.content} />
            </div>
          )}

          {slug === 'kontakt' && (
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=ul.+Kujawska+3,+35-323+Rzesz%C3%B3w&output=embed&z=16"
                width="100%"
                height="380"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MedFaktor — ul. Kujawska 3, Rzeszów"
              />
            </div>
          )}
        </article>

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
  );
}
