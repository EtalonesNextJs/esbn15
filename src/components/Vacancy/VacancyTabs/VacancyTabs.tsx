'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useRouter } from 'next/navigation';

export default function VacancyTabs() {
  const params = useParams();
  const router = useRouter();
  
  // Приводим `params?.type` к строке
  const type = Array.isArray(params?.type) ? params.type[0] : params?.type ?? 'all';

  const handleTabChange = (value: string) => {
    router.push(`/vacancy/${value}`);
  };

  return (
    <Tabs defaultValue={type} onValueChange={handleTabChange} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="all">Все</TabsTrigger>
        <TabsTrigger value="new">Новые</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
