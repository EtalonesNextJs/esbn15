'use client';

import { ShareIcon } from 'lucide-react';
import React from 'react';
import { toast } from "sonner";
import { generateSlugFromVacancy } from '@/utils/geterateSlugFromVac';

interface ShareProps {
  vacancy: {
   slug: string;
  };
}

const Share = ({ vacancy }: ShareProps) => {
  console.log("Vacancy9999", vacancy);
  const handleShareClick = async () => {
    const slug = generateSlugFromVacancy(vacancy);
    const vacancyLink = `${window.location.origin}/vacancy/${slug}`;

    try {
      await navigator.clipboard.writeText(vacancyLink);
      toast('Ссылка скопирована в буфер обмена!');
    } catch (err) {
      toast('Ошибка при копировании ссылки!');
      console.error('Ошибка при копировании ссылки:', err);
    }
  };

  return (
    <button onClick={handleShareClick} aria-label="Поделиться">
      <ShareIcon />
    </button>
  );
};

export default Share;
