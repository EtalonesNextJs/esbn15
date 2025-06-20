import Link from 'next/link';

interface VacancyButtonProps {
  city: string;
  profession: string;
  title: string;     // 👈 добавляем title
  slug: string;
  label?: string;
}

export function VacancyButton({
  city,
  profession,
  title,
  slug,
  label = "Подробнее"
}: VacancyButtonProps) {
  const encodedCity = encodeURIComponent(city);
  const encodedTitle = encodeURIComponent(title);
  const encodedSlug = encodeURIComponent(slug);

  const href = `/vacancies/${encodedCity}/${encodedTitle}/${encodedSlug}`;

  return (
   
    <Link href={href} passHref>
      <button type="button" className="flex items-center gap-3 rounded border px-3 py-1 border-green-400 cursor-pointer hover:border-green-500 hover:transform hover:scale-105 transition-all duration-200">
        {label}
      </button>
    </Link>
  );
}
