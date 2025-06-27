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
      href: "/vacancies",
    },
    {
      title: "Без опыта",
      icon: PackagePlus,
      description: "Вакансии для работников без опыта.",
      href: "/vacancies/categories/noexp",
    },
    {
      title: "Внутреняя отделка",
      icon: PaintRoller,
      description: "Штукатурка, малярка, плитка, ГПК, электрика, сантехника...",
      href: "/vacancies/categories/indor",
    },
    {
      title: "Кровля",
      icon: HardHat,
      description: "Черепица, металлочерепица, двухскатные крыши, ...",
      href: "/vacancies/categories/krovlya",
    },
    {
      title: "Электрика",
      icon: UtilityPole,
      description: "Слаботочка, солнечные панели, подкючение щитов, электроника...",
      href: "/vacancies/categories/electric",
    },
    {
      title: "Сантехника",
      icon: Drill,
      description: "Сан-узлы, ванные комнаты, отопление...",
      href: "/vacancies/categories/santehnic",
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