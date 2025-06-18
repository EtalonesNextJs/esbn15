// "use client";

// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";

// export function CarouselImagesVacancy({
//   images,
//   onSlideChange,
// }: {
//   images: string[];
//   onSlideChange?: (index: number) => void;
// }) {
//   const [emblaRef, setEmblaRef] = React.useState<any>(null);

//   React.useEffect(() => {
//     if (!emblaRef) return;

//     const handleSelect = () => {
//       const index = emblaRef.selectedScrollSnap();
//       onSlideChange?.(index);
//     };

//     emblaRef.on("select", handleSelect);
//     return () => emblaRef.off("select", handleSelect);
//   }, [emblaRef, onSlideChange]);

//   if (!images?.length) return null;

//   return (
//     <Carousel
//       className="w-full max-w-xs"
//       plugins={[Autoplay({ delay: 4000 })]}
//       opts={{ loop: true }}
//       setApi={setEmblaRef}
//     >
//       <CarouselContent>
//         {images.map((image, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-video items-center justify-center p-2">
//                   <Image
//                     src={image}
//                     alt={`Vacancy image ${index + 1}`}
//                     width={400}
//                     height={250}
//                     className="rounded-md object-cover w-full h-full"
//                   />
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//     </Carousel>
//   );
// }
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  images: string[];
  onSlideChange?: (index: number) => void;
  currentIndex?: number;
};

export function CarouselImagesVacancy({
  images,
  onSlideChange,
  currentIndex,
}: Props) {
  const [emblaRef, setEmblaRef] = React.useState<any>(null);

  // 👉 синхронизируем при внешнем изменении индекса
  React.useEffect(() => {
    if (emblaRef && typeof currentIndex === "number") {
      emblaRef.scrollTo(currentIndex);
    }
  }, [currentIndex, emblaRef]);

  // 👉 слушаем прокрутку
  React.useEffect(() => {
    if (!emblaRef) return;

    const handleSelect = () => {
      const index = emblaRef.selectedScrollSnap();
      onSlideChange?.(index);
    };

    emblaRef.on("select", handleSelect);
    return () => emblaRef.off("select", handleSelect);
  }, [emblaRef, onSlideChange]);

  if (!images?.length) return null;

  return (
    <Carousel
      className="w-full max-w-xs"
    //   plugins={[Autoplay({ delay: 4000 })]}
      opts={{ loop: true }}
      setApi={setEmblaRef}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-2">
                  <Image
                    src={image}
                    alt={`Vacancy image ${index + 1}`}
                    width={400}
                    height={250}
                    className="rounded-md object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
