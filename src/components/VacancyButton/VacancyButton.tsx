import Link from 'next/link';

interface VacancyButtonProps {
  city: string;
  profession: string;
  slug: string;
  label?: string; // Текст кнопки, необязательно
}

export function VacancyButton({ city, profession, slug, label = "Подробнее" }: VacancyButtonProps) {
  // Кодируем параметры, чтобы URL был валидным
  const encodedCity = encodeURIComponent(city);
  const encodedProfession = encodeURIComponent(profession);
  const encodedSlug = encodeURIComponent(slug);

  const href = `/vacancies/${encodedCity}/${encodedProfession}/${encodedSlug}`;

  return (
    <Link href={href} passHref>
      <button type="button" className="btn btn-primary">
        {label}
      </button>
    </Link>
  );
}
