"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type BlogPost = {
  title: string;
  slug: string;
  description: string;
};

type BlogProps = {
  mainPost: BlogPost | null;
  relatedPosts: BlogPost[];
};

const Blog = ({ mainPost, relatedPosts }: BlogProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(relatedPosts.length);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);


  return (
    <section className="my-10 scroll-mt-28 md:mb-20">
      <SectionHeading heading="Блог" content="Тематические посты о работе в Европе." />

      <div className="max-w-3xl mx-auto p-6 bg-accent rounded-xl mb-12">
        {mainPost ? (
          <>
            <h3 className="text-2xl font-bold mb-3">{mainPost.title}</h3>
            <p className="text-muted-foreground mb-4">{mainPost.description}</p>
            <Link href={`/blog/${mainPost.slug}`} className="text-primary underline">
              Читать статью →
            </Link>
          </>
        ) : (
          <p>Постов нет.</p>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <h4 className="text-xl font-semibold mb-6">Похожие статьи:</h4>

          <Carousel setApi={setApi} className="relative">
            <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <CarouselItem key={post.slug} className="bg-muted p-4 rounded-md hover:bg-primary/10 transition cursor-pointer">
                  <Link href={`/blog/${post.slug}`}>
                    <h5 className="font-medium text-lg">{post.title}</h5>
                    <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-between mt-4">
              <CarouselPrevious className="btn btn-primary">← Назад</CarouselPrevious>
              <CarouselNext className="btn btn-primary">Вперед →</CarouselNext>
            </div>

            <div className="flex justify-center gap-2 mt-3">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border-2",
                    current === i ? "bg-primary border-primary" : "border-muted-foreground"
                  )}
                  aria-label={`Перейти к слайду ${i + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default Blog;


// const TestimonialCard = ({
//   testimonial,
// }: {
//   testimonial: (typeof testimonials)[number];
// }) => (
//   <div className="mb-8 bg-accent rounded-xl py-8 px-6 sm:py-6">
//     <div className="flex items-center justify-between gap-20">
//       <div className="hidden lg:block relative shrink-0 aspect-[3/4] max-w-[10rem] w-full bg-muted-foreground/20 rounded-xl">
//         <div className="absolute top-1/4 right-0 translate-x-1/2 h-12 w-12 bg-primary rounded-full flex items-center justify-center">
//           <svg
//             width="102"
//             height="102"
//             viewBox="0 0 102 102"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//           >
//             <path
//               d="M26.0063 19.8917C30.0826 19.8625 33.7081 20.9066 36.8826 23.024C40.057 25.1414 42.5746 28.0279 44.4353 31.6835C46.2959 35.339 47.2423 39.4088 47.2744 43.8927C47.327 51.2301 44.9837 58.4318 40.2444 65.4978C35.4039 72.6664 28.5671 78.5755 19.734 83.2249L2.54766 74.1759C8.33598 71.2808 13.2548 67.9334 17.3041 64.1335C21.2515 60.3344 23.9203 55.8821 25.3105 50.7765C20.5179 50.4031 16.6348 48.9532 13.6612 46.4267C10.5864 44.0028 9.03329 40.5999 9.00188 36.2178C8.97047 31.8358 10.5227 28.0029 13.6584 24.7192C16.693 21.5381 20.809 19.9289 26.0063 19.8917ZM77.0623 19.5257C81.1387 19.4965 84.7641 20.5406 87.9386 22.6581C91.1131 24.7755 93.6306 27.662 95.4913 31.3175C97.3519 34.9731 98.2983 39.0428 98.3304 43.5268C98.383 50.8642 96.0397 58.0659 91.3004 65.1319C86.4599 72.3005 79.6231 78.2095 70.79 82.859L53.6037 73.8099C59.392 70.9149 64.3108 67.5674 68.3601 63.7676C72.3075 59.9685 74.9763 55.5161 76.3665 50.4105C71.5739 50.0372 67.6908 48.5873 64.7172 46.0608C61.6424 43.6369 60.0893 40.2339 60.0579 35.8519C60.0265 31.4698 61.5787 27.6369 64.7145 24.3532C67.7491 21.1722 71.865 19.563 77.0623 19.5257Z"
//               className="fill-primary-foreground"
//             />
//           </svg>
//         </div>
//       </div>
//       <div className="flex flex-col justify-center">
//         <div className="flex items-center justify-between gap-1">
//           <div className="hidden sm:flex md:hidden items-center gap-4">
//             <Avatar className="w-8 h-8 md:w-10 md:h-10">
//               <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
//                 {testimonial.name.charAt(0)}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="text-lg font-semibold">{testimonial.name}</p>
//               <p className="text-sm text-gray-500">{testimonial.designation}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-1">
//             <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
//             <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
//             <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
//             <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
//             <StarIcon className="w-5 h-5 fill-muted-foreground stroke-muted-foreground" />
//           </div>
//         </div>
//         <p className="mt-6 text-xl  leading-normal lg:!leading-normal font-semibold tracking-tight">
//           &quot;{testimonial.testimonial}&quot;
//         </p>
//         <div className="flex sm:hidden md:flex mt-6 items-center gap-4">
//           <Avatar>
//             <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
//               {testimonial.name.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//           <div>
//             <p className="text-lg font-semibold">{testimonial.name}</p>
//             <p className="text-sm text-gray-500">{testimonial.designation}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

