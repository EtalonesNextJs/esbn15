
import { ActiveSectionProvider } from '@/components/VacancyDescription/components/active-section-provider'
import VacancyDescription from '@/components/VacancyDescription/VacancyDescription'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    city: string
    profession: string
    slug: string
  }>
}

async function fetchVacancyBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/by-slug?slug=${encodeURIComponent(slug)}`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  return res.json()
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city, profession, slug } = await params
  const vacancy = await fetchVacancyBySlug(slug)

  if (!vacancy) {
    return {
      title: 'Вакансия не найдена',
      description: 'Данная вакансия не существует или была удалена.',
      robots: { index: false, follow: false },
    }
  }

  const {
    title,
    city: cityFromVacancy,
    salary,
    work_descr,
    imageFB,
    skills,
    roof_type,
  } = vacancy

  const cleanDescription = work_descr
    ? work_descr.replace(/<[^>]*>/g, '').slice(0, 160)
    : ''
  const metaDescription = `${title} (${roof_type || ''}) в ${cityFromVacancy}. Навыки: ${skills || ''}. ${cleanDescription} Зарплата: ${salary || ''}.`

  const url = `https://etalones.com/vacancies/${encodeURIComponent(city)}/${encodeURIComponent(profession)}/${encodeURIComponent(slug)}`

  return {
    title: `${title} – Работа в ${cityFromVacancy} | Etalones`,
    description: metaDescription,
    openGraph: {
      title: `${title} – Работа в ${cityFromVacancy}`,
      description: metaDescription,
      type: 'article',
      url,
      locale: 'ru_RU',
      images: imageFB ? [imageFB] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} – Работа в ${cityFromVacancy}`,
      description: metaDescription,
      images: imageFB ? [imageFB] : undefined,
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

export default async function VacancyPage({ params }: Props) {
const { slug } = await params;

  const vacancy = await fetchVacancyBySlug(slug);

  if (!vacancy) return notFound();

  
  return (
      <ActiveSectionProvider>
    <main className="max-w-screen-xl mx-auto p-5">
      <VacancyDescription vacancy={vacancy} />
      {/* <h1 className="text-3xl font-bold mb-4">{vacancy.title}</h1>
      <p><strong>Город:</strong> {vacancy.city}</p>
      <p><strong>Зарплата:</strong> {vacancy.salary}</p>
      <p><strong>Описание работы:</strong></p>
      <div dangerouslySetInnerHTML={{ __html: vacancy.work_descr || '' }} /> */}
    </main>
      </ActiveSectionProvider>
  )
}
