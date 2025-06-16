'use client';

import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LocationGrouped {
  country: string;
  cities: string[];
}

interface LocationFilterProps {
  profession: string | null; // title из вакансии
  onChange?: (value: string) => void;
}

export default function LocationFilter({ profession, onChange }: LocationFilterProps) {
  const [locations, setLocations] = useState<LocationGrouped[]>([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (!profession) return;

    async function fetchLocations() {
      try {
        const res = await fetch(`/api/locations?title=${encodeURIComponent(profession as string)}`);
        if (!res.ok) throw new Error('Ошибка загрузки локаций');
        const data: LocationGrouped[] = await res.json();
        setLocations(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLocations();
  }, [profession]);

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  if (!profession) return null;

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Выберите город" />
      </SelectTrigger>
      <SelectContent>
        {locations.map(({ country, cities }) => (
          <SelectGroup key={country}>
            <SelectLabel>{country}</SelectLabel>
            {cities.map((city) => (
              <SelectItem key={city} value={`${country}|${city}`}>
                {city}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
