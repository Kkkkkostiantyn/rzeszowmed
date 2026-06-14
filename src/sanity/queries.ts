import {cache} from 'react'
import {client} from './client'

export const getSiteSettings = cache(async () => {
  return client.fetch(`*[_type == "siteSettings"][0]{
    companyName,
    legalName,
    shortDescription,
    phones,
    emails,
    instagram,
    whatsapp,
    facebookUrl,
    linkedinUrl,
    mapUrl,
    workingHours,
    saturdayHours,
    locations[]{
      _key,
      city,
      address,
      phones
    },
    appointmentLabel,
    appointmentUrl,
    heroImage,
    stats[]{value, label}
  }`)
})

export async function getPage(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      heroImage,
      content
    }`,
    {slug},
  )
}

export async function getAllPages() {
  return client.fetch(`*[_type == "page"] | order(navOrder asc){
    _id,
    title,
    slug,
    navOrder
  }`)
}

export async function getMedicineService(slug: string) {
  return client.fetch(
    `*[_type == "medicineService" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      heroImage,
      content
    }`,
    {slug},
  )
}

export async function getAllMedicineServices() {
  return client.fetch(`*[_type == "medicineService"] | order(order asc){
    _id,
    title,
    slug,
    order,
    shortDescription,
    icon,
    featured,
    processingTime
  }`)
}
