
'use client';
import { useEffect, useContext } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { NewsContext } from "@/context/NewsContext"; // Импортируем контекст

export default function VacancyList({ type, limit }: { type: string; limit?: number }) {
  // Используем контекст для получения данных о новостях и функции для их загрузки
  const { news, loadNews } = useContext(NewsContext);

  useEffect(() => {
    // Если новостей для данного типа нет в контексте, загружаем их
    if (!news[type] || news[type]?.length === 0) {
      const fetchData = async () => {
        try {
          const url = `/api/news/all?type=${type}${limit ? `&limit=${limit}` : ""}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch news');
          }
  
          const data: any[] = await response.json();
          loadNews(type, data);  
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }
  }, [type, limit, news, loadNews]);

  // Если новости не загружены, отображаем что-то по умолчанию
  const newsData = news[type] || [];

  return (
    <>
      <div className="text-center font-bold text-primary text-2xl md:px-10">Новости</div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
            {newsData.map((newsItem: any, index: number) => (
              <div key={index}>
                <NewsCard news={newsItem} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
