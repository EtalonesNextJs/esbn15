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
      <button type="button" className="btn btn-primary">
        {label}
      </button>
    </Link>
  );
}
