"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { vacancyMenuItems, userfulMenuItems, partnersMenuItems } from "./config";

export const NavMenu = (props: NavigationMenuProps) => (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-0 space-x-0 text-sm text-white ">
        <NavigationMenuItem>
          <Button variant="ghost" className="text-[1.1rem] font-normal" asChild>
            <Link href="/">Главная</Link>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[1.1rem] font-normal">
            Вакансии
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid text-[1.1rem] w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {vacancyMenuItems.map((vacancy) => (
                <ListItem
                  key={vacancy.title}
                  title={vacancy.title}
                  icon={vacancy.icon}
                  href={vacancy.href || '#'}
                >
                  {vacancy.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[1.1rem] font-normal">
            Полезно
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {userfulMenuItems.map((menuItem) => (
                <ListItem
                  key={menuItem.title}
                  title={menuItem.title}
                  icon={menuItem.icon}
                  iconSize="h-20 w-20"
                  href={menuItem.href || '#'}
                >
                  {menuItem.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="ghost" className="text-[1.1rem] font-normal" asChild>
            <Link href="/reviews">Отзывы</Link>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-[1.1rem] font-normal">
            Соискателям
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid text-[1.1rem] w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {partnersMenuItems.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  href={item.href || '#'}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="ghost" className="text-[1.1rem] font-normal" asChild>
            <Link href="/contacts">Контакты</Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
  
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon: LucideIcon, iconSize?: string }
>(({ href,className, title, children,iconSize = 'h-6 w-6', ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            "block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <props.icon className={`${iconSize} mb-4`} />
          <div className="text-[1.1rem] font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-md leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
