'use client';

import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Blocks, CircleCheck, HandCoins, Minus, Phone } from "lucide-react";
import { VacancyType } from "@/lib/types/vacancy"; // Тип вакансии
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import DialogFormTg from "@/components/Dialog/DialogFormTg";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";

export default function VacancyPageById({ vacancy }: { vacancy: VacancyType }) {
    
  return (
        <div className="  "> 
        <Breadcrumbs/>  
      <Card className="m-1 flex flex-wrap">
              <CardContent>
                <div className="flex flex-wrap gap-2"> 
                <Image
                  src={vacancy?.imageFB || "/main/logofordafaultimage.jpg"}
                  alt="Vacancy"
                  width={400}
                  height={200}
                  className="rounded-md object-cover flex justify-center items-center" />
                <div className=" rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                          <Label className="text-md font-bold my-2"><Blocks />Необходимые навыки</Label>
                          {vacancy?.skills?.split(';').map((item: string, index: number) => (
                              <div key={index} className="flex gap-2 justify-start items-center my-1">
                                  <CircleCheck size={18} className="flex-shrink-0" /> {item}
                              </div>
                          ))}
                      </div>
                      <div className=" rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                          <Label className="text-md font-bold my-2"><Blocks />Необходимые документы</Label>
                          {vacancy?.documents?.map((item: string, index: number) => (
                              <div key={index} className="flex gap-2 justify-start items-center my-1">
                                  <CircleCheck size={18} className="flex-shrink-0" /> {item}
                              </div>
                          ))}
                      </div>
                      <div className="w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                          <div>
                              <Label>Заработная плата</Label>
                              <div className="flex gap-2 items-center">
                                  <HandCoins />
                                  <span className="text-xl font-bold">{vacancy?.salary}</span>
                                  <span className="text-sm text-gray-600">НЕТТО</span>
                              </div>
                          </div>
                          <div>
                              <Label>Проживание</Label>
                              <div className="flex gap-2 items-center">
                                  <HandCoins />
                                  <span className="text-xl font-bold">{vacancy?.homePrice}</span>
                              </div>
                          </div>

                          <div>
                              {vacancy.grafik && vacancy.grafik.trim() !== '' && (
                                  <><Label>График</Label><div className="flex gap-2 items-center">
                                      <span className="text-md text-gray-600">
                                          {vacancy?.grafik?.split(';').map((item: any, index: any) => (
                                              <div key={index}>-{item.trim()}</div>
                                          ))}
                                      </span>
                                  </div></>)}
                          </div>
                      </div>
                      
                      <div className="w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                      <Label className="text-xl font-bold my-2">О работе</Label>
                      {vacancy.work_descr?.split(';').map((item: string, index: number) => (
                          <div key={index} className="flex gap-2 justify-start items-start my-1">
                              <Minus className="w-5 h-5 mt-0.5 flex-shrink-0" /> {item}
                          </div>
                      ))}
                  </div>
                  
                </div>
             
                  <div className="">
                      {/* <Image src={vacancy.imageFB || "/images/logo/logo-red.png"}
                    alt="Фото вакансии" width={350} height={200}
                    className="rounded-md max-h-max absolute top-3 right-3" /> */}
                  </div>
                 
                  {vacancy.workImageFB && vacancy.workImageFB.length > 0 && (
                      <div className="w-full">
                          <Label className="text-xl font-bold my-2">Фото с объекта</Label>
                          <Carousel orientation="horizontal" opts={{ align: "center", loop: true }} className="w-full">
                              <CarouselContent>
                                  {vacancy.workImageFB.map((image: string, index: number) => (
                                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                          <Image
                                              src={image}
                                              alt={`Image ${index + 1}`}
                                              width={650}
                                              height={400}
                                              className="flex aspect-4/3 items-center justify-center p-6" />
                                      </CarouselItem>
                                  ))}
                              </CarouselContent>
                              <CarouselPrevious type="button" className="ml-5">
                                  &lt;
                              </CarouselPrevious>
                              <CarouselNext type="button" className="mr-5">
                                  &gt;
                              </CarouselNext>
                          </Carousel>
                      </div>
                  )}
                  <div className=" rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                      <Label className="text-xl font-bold my-2">Быт</Label>
                      {vacancy.home_descr?.split(';').map((item: string, index: number) => (
                          <div key={index} className="flex gap-2 justify-start items-start my-1">
                              <Minus className="w-5 h-5 mt-0.5 flex-shrink-0" /> {item}
                          </div>
                      ))}
                  </div>
                  {vacancy.homeImageFB && vacancy.homeImageFB.length > 0 && (
                      <div className="w-full">
                          <Label className="text-xl font-bold my-2">Фото жилья</Label>
                          <Carousel orientation="horizontal" opts={{ align: "center", loop: true }} className="w-full">
                              <CarouselContent>
                                  {vacancy.homeImageFB.map((image: string, index: number) => (
                                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                          <Image
                                              src={image}
                                              alt={`Image ${index + 1}`}
                                              width={650}
                                              height={400}
                                              className="flex aspect-4/3 items-center justify-center p-6" />
                                      </CarouselItem>
                                  ))}
                              </CarouselContent>
                              <CarouselPrevious type="button" className="ml-5">
                                  &lt;
                              </CarouselPrevious>
                              <CarouselNext type="button" className="mr-5">
                                  &gt;
                              </CarouselNext>
                          </Carousel>
                      </div>
                  )}

              </CardContent>
              <div className="px-5">
            <Label className="my-2">Куратор:</Label>
            <span className="font-semibold">{vacancy.manager?.name}</span>
            <span className="text-gray-600 text-sm flex gap-1 justify-center items-center"><Phone size={16}/>+{vacancy.manager?.phone}</span>
          </div>
          </Card>
          <DialogFormTg vacancy={vacancy} />
          </div>
  );
}
