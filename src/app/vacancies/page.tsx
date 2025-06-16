import Link from "next/link";

const professions = ["плиточник", "электрик", "сантехник"];

export default function VacanciesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Все профессии</h1>
      <ul className="list-disc pl-5 space-y-2">
        {professions.map((profession) => (
          <li key={profession}>
            <Link href={`/vacancies/${profession}`}>
              {profession.charAt(0).toUpperCase() + profession.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
