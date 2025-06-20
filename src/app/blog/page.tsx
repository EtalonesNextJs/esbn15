// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import {
//   BadgeDollarSign,
//   Bike,
//   BookHeart,
//   BriefcaseBusiness,
//   Calendar,
//   ClockIcon,
//   Cpu,
//   FlaskRound,
//   HeartPulse,
//   Scale,
// } from "lucide-react";

// const categories = [
//   {
//     name: "Technology",
//     totalPosts: 10,
//     icon: Cpu,
//     background: "bg-indigo-500",
//     color: "text-indigo-500",
//   },
//   {
//     name: "Business",
//     totalPosts: 5,
//     icon: BriefcaseBusiness,
//     background: "bg-amber-500",
//     color: "text-amber-500",
//   },
//   {
//     name: "Finance",
//     totalPosts: 8,
//     icon: BadgeDollarSign,
//     background: "bg-emerald-500",
//     color: "text-emerald-500",
//   },
//   {
//     name: "Health",
//     totalPosts: 12,
//     icon: HeartPulse,
//     background: "bg-rose-500",
//     color: "text-rose-500",
//   },
//   {
//     name: "Lifestyle",
//     totalPosts: 15,
//     icon: BookHeart,
//     background: "bg-cyan-500",
//     color: "text-cyan-500",
//   },
//   {
//     name: "Politics",
//     totalPosts: 20,
//     icon: Scale,
//     background: "bg-teal-500",
//     color: "text-teal-500",
//   },
//   {
//     name: "Science",
//     totalPosts: 25,
//     icon: FlaskRound,
//     background: "bg-purple-500",
//     color: "text-purple-500",
//   },
//   {
//     name: "Sports",
//     totalPosts: 30,
//     icon: Bike,
//     background: "bg-cyan-500",
//     color: "text-cyan-500",
//   },
// ];

// const Blog03Page = () => {
//   return (
//     <div className="max-w-screen-xl mx-auto py-10  flex flex-col lg:flex-row items-start gap-12">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight">Posts</h2>

//         <div className="mt-4 space-y-12">
//           {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
//             <Card
//               key={i}
//               className="flex flex-col sm:flex-row sm:items-center shadow-none overflow-hidden rounded-md border-none"
//             >
//               <CardHeader className="px-0 sm:p-0">
//                 <div className="aspect-video sm:w-56 sm:aspect-square bg-muted rounded-lg" />
//               </CardHeader>
//               <CardContent className="px-0 sm:px-6 py-0 flex flex-col">
//                 <div className="flex items-center gap-6">
//                   <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
//                     Technology
//                   </Badge>
//                 </div>

//                 <h3 className="mt-4 text-2xl font-semibold tracking-tight">
//                   A beginner&apos;s guide to blackchain for engineers
//                 </h3>
//                 <p className="mt-2 text-muted-foreground line-clamp-3 text-ellipsis">
//                   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
//                   consequatur minus dicta accusantium quos, ratione suscipit id
//                   adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur
//                   dolores.
//                 </p>
//                 <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
//                   <div className="flex items-center gap-2">
//                     <ClockIcon className="h-4 w-4" /> 5 min read
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4" /> Nov 20, 2024
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//       <aside className="sticky top-8 shrink-0 lg:max-w-sm w-full">
//         <h3 className="text-3xl font-bold tracking-tight">Categories</h3>
//         <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
//           {categories.map((category) => (
//             <div
//               key={category.name}
//               className={cn(
//                 "flex items-center justify-between gap-2 bg-muted p-3 rounded-md bg-opacity-15 dark:bg-opacity-25",
//                 category.background
//               )}
//             >
//               <div className="flex items-center gap-3">
//                 <category.icon className={cn("h-5 w-5", category.color)} />
//                 <span className="font-medium">{category.name}</span>
//               </div>
//               <Badge className="px-1.5 rounded-full">
//                 {category.totalPosts}
//               </Badge>
//             </div>
//           ))}
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Blog03Page;
// app/blog/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, ClockIcon } from 'lucide-react';

const BlogPage = () => {
  const [categories, setCategories] = useState<{ name: string; totalPosts: number }[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Загрузка категорий
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    }
    fetchCategories();
  }, []);

  // Загрузка постов при смене категории
  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = selectedCategory
          ? `/api/blog?category=${encodeURIComponent(selectedCategory)}`
          : '/api/blog';
        const res = await fetch(url);
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Ошибка загрузки постов:', error);
      }
    }
    fetchPosts();
  }, [selectedCategory]);

  // При загрузке страницы, если нет выбранной категории,
  // поставить первую из списка категорий (если есть)
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory]);

  return (
    <div className="max-w-screen-xl mx-auto py-10 flex flex-col lg:flex-row items-start gap-12">
      {/* Посты */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
        <div className="mt-4 space-y-12">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="flex flex-col sm:flex-row sm:items-center shadow-none overflow-hidden rounded-md border-none"
            >
              <CardHeader className="px-0 sm:p-0">
                <div className="aspect-video sm:w-56 sm:aspect-square bg-muted rounded-lg" />
              </CardHeader>
              <CardContent className="px-0 sm:px-6 py-0 flex flex-col">
                <div className="flex items-center gap-6">
                  <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                    {post.category}
                  </Badge>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                  <Link href={`/blog/${post.slug}`}>
                    <p>{post.title}</p>
                  </Link>
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-3 text-ellipsis">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" />
                    5 min read
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Сайдбар с категориями */}
      <aside className="sticky top-8 shrink-0 lg:max-w-sm w-full">
        <h3 className="text-3xl font-bold tracking-tight">Categories</h3>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              className={cn(
                "flex items-center justify-between gap-2 bg-muted p-3 rounded-md cursor-pointer",
                selectedCategory === category.name
                  ? 'bg-primary text-white'
                  : 'bg-muted dark:bg-opacity-25'
              )}
              onClick={() => setSelectedCategory(category.name)}
            >
              <span className="font-medium">{category.name}</span>
              <Badge className="px-1.5 rounded-full">{category.totalPosts}</Badge>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default BlogPage;
