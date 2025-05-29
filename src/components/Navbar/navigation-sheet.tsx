import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {  Menu } from "lucide-react";
import Link from "next/link";
import { vacancyMenuItems, userfulMenuItems, partnersMenuItems } from "./config";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";
export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-primary text-white">
    <ScrollArea className="h-screen overflow-auto">
        <Link href="/">
          <Image src="/main/logoWhite.png" onClick={closeMenu}  alt={""} width={150} height={150} className="m-5 mb-0" />
          </Link>
        <div className=" text-base space-y-4 px-4">
        <Accordion type='multiple'  className="w-full">
          <AccordionItem value="item-1" >
            <AccordionTrigger className="font-bold text-md">Вакансии</AccordionTrigger>
            <AccordionContent className="mt-2 space-y-3 ml-1 pl-4 border-l">
            {vacancyMenuItems.map((vacancyItem) => (
                <div key={vacancyItem.title}>
                  <Link href={vacancyItem.href ||"#"} onClick={closeMenu}  className="flex items-center gap-2">
                    <vacancyItem.icon className="h-7 w-7 mr-2 text-[#DE9433]" />
                    {vacancyItem.title}
                  </Link>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold text-md">Полезные статьи</AccordionTrigger>
            <AccordionContent className="mt-2 space-y-3 ml-1 pl-4 border-l">
            {userfulMenuItems.map((item) => (
    <div key={item.title}>
      <Link href={item.href || '#'} onClick={closeMenu}  className="flex items-center gap-2">
        <item.icon className="h-5 w-5 mr-2 text-muted-foreground" />
        {item.title}
      </Link>
    </div>
  ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold text-md">Соискателям</AccordionTrigger>
            <AccordionContent className="mt-2 space-y-3 ml-1 pl-4 border-l">
            {partnersMenuItems.map((item) => (
    <div key={item.title}>
      <Link href={item.href || '#'} onClick={closeMenu}  className="flex items-center gap-2">
        <item.icon className="h-5 w-5 mr-2 text-muted-foreground" />
        {item.title}
      </Link>
    </div>
  ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      
        <div className="flex flex-col mt-2 space-y-3 ml-1 pl-4 border-l">
<Link href="/reviews" onClick={closeMenu} >
Отзывы
</Link>
<Link href="/contacts" onClick={closeMenu} >
Контакты
</Link>
        </div>
        </div>
      </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
