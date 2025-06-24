// import { slugify } from 'transliteration';

// export function generateSlugFromVacancy(vacancy: any): string {
//   const { title, location, roof_type } = vacancy;
//   const raw = `${title} ${location} ${roof_type}`;
//   return slugify(raw, { lowercase: true })
//     .replace(/-+/g, '-') // одинарные дефисы
//     .replace(/^-|-$/g, ''); // убираем дефис в начале/конце
// }

import { VacancyType } from '@/lib/types/vacancy';
import { slugify } from 'transliteration';

export function generateSlugFromVacancy(vacancy: VacancyType): string {
  const { city, profession, slug } = vacancy;
  const raw = `${city} ${profession} ${slug}`;
  return slugify(raw, { lowercase: true })
    .replace(/-+/g, '-') // одинарные дефисы
    .replace(/^-|-$/g, ''); // убираем дефис в начале/конце
}
