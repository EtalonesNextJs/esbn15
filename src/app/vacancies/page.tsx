import { Metadata } from "next";





export const metadata: Metadata = {
  title: "Все вакансии в Европе | ESBN",
  description: "Поиск работы в Европе. Все актуальные вакансии с жильём, достойной зарплатой и официальным оформлением.",
  openGraph: {
    title: "Все вакансии в Европе | ESBN",
    description: "Актуальные вакансии по профессиям и странам. Условия, жильё, зарплата — всё в одном месте.",
    url: "https://example.com/vacancies",
    siteName: "ESBN",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default async function VacancyProfessionPage() {
  
  return (
    <>
      
    </>
  );
}
