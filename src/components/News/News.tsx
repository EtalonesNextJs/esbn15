'use client';
import { NewsType } from "@/lib/types/interfaces";
import Image from "next/image";
import { useState, useEffect } from "react";


  


  const News = () => {
    const [news, setNews] = useState<NewsType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchNews = async () => {
        try {
          setLoading(true);
          const response = await fetch("/api/news");
          const data = await response.json();
          setNews(data.news);
        } catch (error) {
          console.error("Error fetching news:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNews();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="w-full">
          <h2 className="text-2xl text-primary sm:text-3xl font-bold tracking-tight text-center">
            Новости
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
            {news.map((news: NewsType, index: number) => (
              <div key={index} className="flex flex-col text-start">

                <Image src={`data:${news.image.contentType};base64,${Buffer.from(news.image.data).toString('base64')}`}
                 width={200} height={200} alt="news" className="mb-5 sm:mb-6 w-full aspect-[4/5] bg-muted rounded-xl" />

                <span className="text-2xl font-semibold tracking-tight">
                  {news.title}
                </span>
                <p className="mt-2 max-w-[25ch] text-muted-foreground text-[17px]">
                  {news.description.slice(0, 35)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default News;
  