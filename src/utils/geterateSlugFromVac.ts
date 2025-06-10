import { slugify } from 'transliteration';

export function generateSlugFromVacancy(vacancy: any): string {
  const { title, location, roof_type } = vacancy;
  const raw = `${title} ${location} ${roof_type}`;
  return slugify(raw, { lowercase: true })
    .replace(/-+/g, '-') // одинарные дефисы
    .replace(/^-|-$/g, ''); // убираем дефис в начале/конце
}
