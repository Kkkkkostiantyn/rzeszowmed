import {PortableText} from '@portabletext/react'
import {urlFor} from '@/sanity/image'
import Image from 'next/image'

type Props = {
  value: Parameters<typeof PortableText>[0]['value']
}

const components = {
  block: {
    h2: ({children}: {children?: React.ReactNode}) => (
      <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 pb-2 border-b border-slate-100">{children}</h2>
    ),
    h3: ({children}: {children?: React.ReactNode}) => (
      <h3 className="text-base font-semibold mt-6 mb-2 text-slate-800 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-brand-500 inline-block flex-shrink-0" />
        {children}
      </h3>
    ),
    normal: ({children}: {children?: React.ReactNode}) => (
      <p className="mb-4 text-slate-600 leading-relaxed text-[15px]">{children}</p>
    ),
  },
  list: {
    bullet: ({children}: {children?: React.ReactNode}) => (
      <ul className="mb-5 space-y-2 text-slate-600">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({children}: {children?: React.ReactNode}) => (
      <li className="flex items-start gap-2.5 text-[15px] leading-relaxed">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({children}: {children?: React.ReactNode}) => (
      <strong className="font-semibold text-slate-800">{children}</strong>
    ),
    em: ({children}: {children?: React.ReactNode}) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({value}: {value: {asset?: object; alt?: string}}) => {
      if (!value?.asset) return null
      return (
        <div className="my-6 rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ''}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      )
    },
  },
}

export default function PortableTextRenderer({value}: Props) {
  return <PortableText value={value} components={components} />
}
