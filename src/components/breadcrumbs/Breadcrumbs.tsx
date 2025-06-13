'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

// Словарь: slug => отображаемое название
const BREADCRUMB_LABELS: Record<string, string> = {
  'vacancy': 'Вакансия',
  'voditel-trir-rabota-po-okrestnostyam-trira-marshruty-ot-50-do-150-km': 'Водитель Трир',
  'krovelshchik-frankfurt-na-mayne-rabota-na-ploskih-i-skatnyh-kryshah': 'Кровельщик Франкфурт на Майне',
  'shtukatur-burghaun-rabota-shtukaturom-v-germanii-burghaun': 'Штукатур Бургхаун',
  'master-universal-dyusseldorf-remont-kvartir': 'Мастер Универсал Дюссельдорф',
  'suhaya-styazhka-rennerod-brigada-na-suhuyu-styazhku': 'Сухая Стяжка Реннерод',
  'master-universal-valdbron-vypolnenie-remontno-otdelochnyh-rabot': 'Мастер Универсал Вальдброн',
  'bruschatochnik-trir-rabota-po-bruschadke-v-germanii-trir': 'Брушаточник Трир',
  'avtomehanik-trir-rabota-po-obsluzhivaniyu-avtoparka-kompanii': 'Автомеханик Трир',
  'silikonovaya-shtukaturka-belgiya-bryussel-antverpen-nanesenie-silikonovoy-shtukaturki': 'Силиконовая штукатурка Бельгия',
  'klinkernaya-kladka-belgiya-bryussel-i-antverpen-rabota-s-klinkernoy-plitkoy': 'Клинкерная кладка Бельгия',
  'podsobnyy-rabochiy-belgiya-bryussel-antverpen-rabota-na-stroyke': 'Подсобный рабочий Бельгия',
  'master-universal-frankfurt-na-mayne': 'Мастер Универсал Франкфурт на Майне',
  'gipsokartonshchik-essen-demontazh-i-montazh-gipsokartona': 'Гипсокартонщик Эссен',
  'santehnik-dortmund-santehnika-v-vannyh-komnatah': 'Сантехник Дортмунд',
  'plitochnik-essen-plitochnye-raboty-v-kvartirah': 'Плиточник Эссен',
  'krovelshchik-berlin-rabota-s-krovley-na-ploskih-i-skatnyh-kryshah': 'Кровельщик Берлин',
  'hausmaster-gamburg-delaem-terrasy-vezdy-dorogi-zabory-prudy-gazony-zemlyanye-raboty-drenazh-i-dr': 'Хаусмастер Гамбург',
  'armaturshchik-garmish-partenkirhen-rabota-s-armaturoy-i-kamnem': 'Арматуршик Гармиш',
  'podsobnyy-rabochiy-garmish-partenkirhen-rabota-na-stroyke': 'Подсобный рабочий Гармиш',
  'montazh-okon-i-dverey-frankfurt-na-mayne-ustanovka-plastikovyh-okon-i-dverey': 'Монтаж Окон и Дверей Франкфурт на Майне',
  'master-universal-belgiya-lezh-vnutrennyaya-otdelka-chastnyh-domov-i-kvartir': 'Мастер Универсал Бельгия',
  'ventilyaciya-dyuren-montazh-ventilyacionnyh-system': 'Вентиляция Дюрен',
  'montazh-bashennyh-kranov-myullaker-montazh-bashennyh-kranov-sborka-i-razborka': 'Монтаж Башенных Кранов Мюллакер',
  'podsobnyy-rabochiy-wurzburg-pomoshchnik-na-mashinnuyu-shtukaturku': 'Подсобный рабочий Вюрбртсбург',
  'peskostruyshchik-gollanadiya-rotterdam-rabota-s-peskostruynym-oborudovaniem': 'Пескостружчик Голландия',
  'elektrik-dyuren-elektromontazh-slabotochnogo-oborudovaniya': 'Электрик Дюрен',
  'malyar-zalcgitter-socialnye-obekty': 'Мальяр Зальцгиттер',
  'plitochnik-zalcgitter-socialnye-obekty': 'Плиточник Зальцгиттер',
  'santehnik-dortmund-santehnika-v-vannoy-komnate': 'Сантехник Дортмунд',
  'fasadchik-burghaun-mokrye-fasady': 'Фасадчик Бургхаун',
  'solnechnye-paneli-dyusseldorf-germaniya-montazh-solnechnyh-paneley-na-kryshah': 'Солнечные панели Дюссельдорф',
  'solnechnye-paneli-osnabryuk-germaniya-montazh-solnechnyh-paneley-v-gorode-osnabryuk-germaniya-dlya-grazhdan-sng-v-germanii': 'Солнечные панели Оснабрюк Германия',
  'ekskavatorshchik-trir-rabota-na-ekskavatore-v-gorode-myunhen': 'Экскаваторшик Трир',
  'podsobnyy-rabochiy-kassel-rabota-podsobnym-rabochim-na-dorozhnyh-rabotah.-ustanovka-bordyurov-ukladka-asfalta-montazh-kanalizacionnyh-lyukov-v-gorode-kassel': 'Подсобный рабочий Кассель',
  'avtomehanik-kassel-germaniya-rabota-v-otlichnom-avtoservise-s-horoshimi-usloviyami': 'Автомеханик Кассель Германия',
  'stroitelnye-lesa-kyoln-rabota-voditelem-v-gorode-kyoln-transportirovka-stroitelnyh-lesov-i-uchastie-v-montazhe': 'Строительные леса Кёльн',
  'master-universal-ahen-rabota-po-vnutrenney-otdelke-aahen-germaniya': 'Мастер Универсал Ахен',
  'solnechnye-paneli-germagiya-montazh-solnechnyh-paneley-na-kryshah-podklyuchenie': 'Солнечные панели Германия',
} 



function formatLabel(segment: string) {
  return (
    BREADCRUMB_LABELS[segment] ||
    segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()) // С Заглавной Буквы
  )
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb className="w-full max-w-screen-xl mx-auto p-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Главная</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/')
          const isLast = index === pathSegments.length - 1

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatLabel(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{formatLabel(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
