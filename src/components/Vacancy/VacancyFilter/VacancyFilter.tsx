'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';

interface LocationGrouped {
  country: string;
  cities: string[];
}

interface Props {
  currentFilters: { [key: string]: string | undefined };
}

export default function VacancyFilter({ currentFilters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const profession = pathname.split('/')[2]; // /vacancies/[profession]/[country]
  const [locations, setLocations] = useState<LocationGrouped[]>([]);
  const [selectedCity, setSelectedCity] = useState(currentFilters.city || '');

  useEffect(() => {
    if (!profession) return;

    fetch(`/api/locations?title=${encodeURIComponent(profession)}`)
      .then(res => res.json())
      .then((data: LocationGrouped[]) => {
        setLocations(data);
      })
      .catch(err => {
        console.error('Ошибка загрузки локаций', err);
      });
  }, [profession]);

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    const params = new URLSearchParams(searchParams);
    params.set('city', value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="col-span-1 p-4 border rounded-xl">
      <h2 className="font-bold mb-4 text-lg">Фильтры</h2>

      {/* Фильтр по городу */}
      {locations.length > 0 && (
        <div className="mb-4">
          <label className="block mb-2 text-sm">Город</label>
          <Select value={selectedCity} onValueChange={handleCityChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(({ country, cities }) => (
                <SelectGroup key={country}>
                  <SelectLabel>{country}</SelectLabel>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
