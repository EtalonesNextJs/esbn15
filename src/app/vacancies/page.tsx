import Categories from '@/components/Categories/Categories';

const categories = [
  { key: 'beton', name: 'Бетон' },
  { key: 'electric', name: 'Электрика' },
  { key: 'indor', name: 'Внутренние работы' },
  { key: 'kamen', name: 'Каменная кладка' },
  { key: 'montazh', name: 'Монтаж' },
  { key: 'noexp', name: 'Без опыта' },
  { key: 'krovlya', name: 'Кровля' },
  { key: 'santehnic', name: 'Сантехника' },
  { key: 'tehnic', name: 'Техника' },
];

export const revalidate = false;

export default function VacanciesPage() {
  return <Categories categories={categories} />;
}
