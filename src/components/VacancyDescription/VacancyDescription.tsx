import { VacancyType } from "@/lib/types/vacancy";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Header } from "./components/header";
import { Intro } from "./components/intro";
import { Projects } from "./components/projects";
import { SectionDivider } from "./components/section-divider";
import Blog from "./components/blog";
import { fetchVacanciesByProfession } from "@/lib/api/api";

// async function fetchVacanciesByTitle(city: string, title: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/vacancy/by-title?city=${encodeURIComponent(city)}&title=${encodeURIComponent(title)}`,
//     { cache: 'no-store' }
//   );
//   if (!res.ok) return [];
//   return res.json();
// }
async function fetchArticleByCategory(category: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/by-category?category=${encodeURIComponent(category)}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching article by category:", error);
    return null;
  }
}

async function fetchRelatedPosts(category: string, excludeSlug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/related?category=${encodeURIComponent(category)}&exclude=${encodeURIComponent(excludeSlug)}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function VacancyDescription({ vacancy }: { vacancy: VacancyType }) {
  const { city, profession, category } = vacancy;

  const decodedCity = decodeURIComponent(city || "");
  const decodedTitle = decodeURIComponent(profession || "");

  const recommendedVacancies = await fetchVacanciesByProfession(decodedCity, decodedTitle);
  const article = await fetchArticleByCategory(category || "");
  const related = article?.slug
    ? await fetchRelatedPosts(category || "", article.slug)
    : [];

  return (
    <div className="container flex flex-col items-center">
      <Header {...vacancy} />
      <Intro {...vacancy} />
      <SectionDivider />
      <About {...vacancy} />
      <Blog 
        mainPost={article}
  relatedPosts={related}
      />
      <Projects vacancies={recommendedVacancies} />
      <Contact vacancy={vacancy} />
    </div>
  );
}
