import { getVacancyById } from '@/lib/api'
import VacancyPageById from '@/components/Vacancy/VacancyPageById/VacancyPageById'
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  const vacancy = await getVacancyById(id)

  if (!vacancy) {
    return {
      title: 'Вакансия не найдена',
      description: 'Данная вакансия не существует или была удалена.',
    }
  }

   const {
    title,
    location,
    salary,
    work_descr,
    imageFB,
    skills,
    roof_type,
  } = vacancy

  const cleanDescription = work_descr.replace(/<[^>]*>/g, '').slice(0, 160) // SEO-safe
  const metaDescription = `${title} (${roof_type}) в ${location}. Основные навыки: ${skills}. ${cleanDescription} Зарплата: ${salary}.`

  const keywordsArr = [title, location, roof_type, ...skills.split(', ')].map(k => k.trim())
  const keywords = [...new Set([...keywordsArr, 'работа за границей', 'вакансия', 'трудоустройство'])].join(', ')

  const url = `https://etalones.com/vacancy/${id}`

  return {
    title: `${title} – Работа в ${location} | Etalones`,
    description: metaDescription,
    keywords,
    openGraph: {
      title: `${title} – Работа в ${location}`,
      description: metaDescription,
      type: 'article',
      url,
      locale: 'ru_RU',
      images: [imageFB],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} – Работа в ${location}`,
      description: metaDescription,
      images: [imageFB],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'og:type': 'job.vacancy',
      'og:site_name': 'Etalones',
    },
  }
}

// Компонент страницы
export default async function VacancyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vacancy = await getVacancyById(id)

  if (!vacancy) return notFound()

  return <VacancyPageById vacancy={vacancy} />
}

