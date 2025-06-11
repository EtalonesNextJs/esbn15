import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { MapPinned, Blocks, CircleCheck, HandCoins, Minus, Phone } from "lucide-react"
import Image from "next/image"
import { Label } from "../ui/label"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import DialogAnketaContent from "../Dialog/DialogAnketaContent"
import { useState } from "react"
import Share from "../Share/Share"
import { generateSlugFromVacancy } from "@/utils/geterateSlugFromVac"
import Link from "next/link"
export default function DrawerContentComponent({ vacancy }: { vacancy: any }) {
  const [open, setOpen] = useState(false);
  const slug = generateSlugFromVacancy(vacancy);
      const vacancyLink = `${window.location.origin}/vacancy/${slug}`;
  return (
    <DrawerContent className="overflow-auto ">
    <div className="flex justify-between">
      <Share vacancy={vacancy} /> <Link href={vacancyLink} className="cursor-pointer font-bold text-primary/50 hover:text-primary hover:underline transition-colors duration-300 ease-in-out">
  На страницу вакансии
</Link>

    </div>
      <DrawerHeader >
        <DrawerTitle className="text-2xl">{vacancy?.title}</DrawerTitle>
        <div>
          <div className="text-md text-gray-600 flex gap-2 items-center">
            <MapPinned />
            <span>{vacancy?.location}</span>
          </div>
        </div>
      </DrawerHeader>
      <Card className="m-1">
      
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className=" rounded-md border border-gray-300 bg-white p-2 shadow-sm">
              <Label className="text-md font-bold my-2"><Blocks />Необходимые навыки</Label>
              {vacancy?.skills?.split(';').map((item: string, index: number) => (
                <div key={index} className="flex gap-2 justify-start items-center my-1">
                  <CircleCheck size={18} className="flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
            <div className=" rounded-md border border-gray-300 bg-white p-2 shadow-sm">
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

            {/* <Image src={vacancy.imageFB || "/images/logo/logo-red.png"}
                            alt="Фото вакансии" width={350} height={200}
                            className="rounded-md max-h-max absolute top-3 right-3" /> */}
          </div>
          <div className=" rounded-md border border-gray-300 bg-white p-2 shadow-sm">
              <Label className="text-xl font-bold my-2">О работе</Label>
              {vacancy.work_descr?.split(';').map((item: string, index: number) => (
                <div key={index} className="flex gap-2 justify-start items-start my-1">
                  <Minus className="w-5 h-5 mt-0.5 flex-shrink-0" /> {item}
                </div>
              ))}
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
              className="flex aspect-4/3 items-center justify-center p-6"
            />
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
              className="flex aspect-4/3 items-center justify-center p-6"
            />
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
        <CardFooter className="flex flex-col items-start">
          <div className="flex justify-between w-full ">
            <Label className="my-2">Куратор:</Label>
            <span className="font-semibold">{vacancy.manager?.name}</span>
            <span className="text-gray-600 text-sm flex gap-1 justify-center items-center"><Phone size={16}/>+{vacancy.manager?.phone}</span>
          </div>
        </CardFooter>
      </Card>
      <DrawerFooter className="grid grid-cols-2 gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button className="bg-green-800 hover:bg-green-700 text-white transition-all duration-200 ease-in-out">
      Оставить заявку
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
  <DialogAnketaContent vacancy={vacancy} setOpen={setOpen} />
      </DialogContent>
</Dialog>

        {/* <Button className="bg-green-800 hover:bg-green-700 text-white transition-all duration-200 ease-in-out">Оставить заявку</Button> */}
        <DialogTrigger asChild>
        <DrawerClose 
        className="rounded-md py-1 px-4 font-semibold bg-red-800 hover:bg-red-700 text-white transition-all duration-200 ease-in-out">
         Закрыть
        </DrawerClose>
        </DialogTrigger>
      </DrawerFooter>
     
    </DrawerContent>
    
  )
}