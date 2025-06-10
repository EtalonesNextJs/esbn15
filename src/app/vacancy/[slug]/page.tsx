import { getVacancyBySlug } from '@/lib/api'
import VacancyPageById from '@/components/Vacancy/VacancyPageById/VacancyPageById'
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import { generateSlugFromVacancy } from '@/utils/geterateSlugFromVac'
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  
  const vacancy = await getVacancyBySlug(slug)

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

 const generatedSlug = generateSlugFromVacancy(vacancy);
 const url = `https://etalones.com/vacancy/${generatedSlug}`;


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


export default async function VacancyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const vacancy = await getVacancyBySlug(slug);
  if (!vacancy) return notFound();

  return <VacancyPageById vacancy={vacancy} />;
}

// Компонент страницы
// export default async function VacancyPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   // const { id } = await params
//   // const vacancy = await getVacancyById(id)
//   const slug = await params
//   const vacancy = await getVacancyBySlug(slug); // ищем по slug
//   if (!vacancy) return notFound();
//   if (!vacancy) return notFound()

//   return <VacancyPageById vacancy={vacancy} />
// }

