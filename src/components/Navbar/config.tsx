import {
    Drill,
    HardHat,
    Hotel,
    MapPin,
    Package,
    PackagePlus,
    PaintRoller,
    Plane,
    Smile,
    UtilityPole,
  } from "lucide-react";
  
  export const vacancyMenuItems = [
    {
      title: "Все вакансии",
      icon: Package,
      description: "Все актуальные вакансии.",
      href: "/vacancy/all",
    },
    {
      title: "Новые вакансии",
      icon: PackagePlus,
      description: "Добавленые вакансии за последний месяц.",
      href: "/vacancy/new",
    },
    {
      title: "Внутреняя отделка",
      icon: PaintRoller,
      description: "Штукатурка, малярка, плитка, ГПК, электрика, сантехника...",
      href: "/vacancy/indor",
    },
    {
      title: "Уличные работы",
      icon: HardHat,
      description: "Брусчатка, строительные леса, каменьщики, арматура-бетон...",
      href: "/vacancy/outdor",
    },
    {
      title: "Электрика",
      icon: UtilityPole,
      description: "Слаботочка, солнечные панели, подкючение щитов, электроника...",
      href: "/vacancy/electric",
    },
    {
      title: "Сантехника",
      icon: Drill,
      description: "Сан-узлы, ванные комнаты, отопление...",
      href: "/vacancy/sanitary",
    },
  ];
  
  export const userfulMenuItems = [
    {
      title: "Польская рабочая виза",
      icon: MapPin,
      description: "Как открыть и продлить Визу",
      href: `/news/66a39ba1bc8f430652eae1c0`,
    },
    {
      title: "PESEL в Польше",
      icon: Hotel,
      description: "Powszechny Elektroniczny System Ewidencji i Ludności.",
      href: `/news/66a7591518bfe65908584573`,
    },
    {
      title: "Открытие Банковского Счета",
      icon: Smile,
      description: "Польша - страна, которая привлекает граждан СНГ своими богатыми трудовыми...",
      href: `/news/66a756202e6554808181d42f`,
    },
    {
      title: "Документы для получения карты побыта",
      icon: Package,
      description: "Прежде чем начать процесс получения карты пребывания в Польше, вам нео...",
      href: '/news/66a75a29dbd299975c619d1f'
    },
    {
      title: "Билеты по Евросоюзу: Источники",
      icon: Plane,
      description: "Путешествие по Евросоюзу — это увлекательное приключение, но выбор и",
      href: '/news/66a750cadbd299975c619c25'
    },
    
  ];
  
  export const partnersMenuItems = [
    {
      title: "Партнёрам",
      icon: Smile,
      description: "Добавленые вакансии за последний месяц.",
      href: `/partners/`,
    },
    {
      title: "Рекрутерам",
      icon: Smile,
      description: "Добавленые вакансии за последний месяц.",
      href: `/partners/`,
    }
  ]