import { VacancyType } from "@/lib/types/vacancy";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Header } from "./components/header";
import { Intro } from "./components/intro";
import { Projects } from "./components/projects";
import { SectionDivider } from "./components/section-divider";
import Blog from "./components/blog";

async function fetchVacanciesByTitle(city: string, title: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/vacancy/by-title?city=${encodeURIComponent(city)}&title=${encodeURIComponent(title)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function VacancyDescription({ vacancy }: { vacancy: VacancyType }) {
  const { city, title } = vacancy;

  const decodedCity = decodeURIComponent(city || "");
  const decodedTitle = decodeURIComponent(title || "");

  const recommendedVacancies = await fetchVacanciesByTitle(decodedCity, decodedTitle);

  return (
    <div className="container flex flex-col items-center">
      <Header {...vacancy} />
      <Intro {...vacancy} />
      <SectionDivider />
      <About {...vacancy} />
      <Blog />
      <Projects vacancies={recommendedVacancies} />
      <Contact />
    </div>
  );
}
