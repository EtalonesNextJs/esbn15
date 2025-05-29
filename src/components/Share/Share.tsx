'use client';

import { ShareIcon } from 'lucide-react';
import React from 'react';
import { toast } from "sonner";

interface ShareProps {
  vacancyId: string;  
}

const Share = ({ vacancyId }: ShareProps) => {
  const handleShareClick = async () => {
    const vacancyLink = `${window.location.origin}/vacancy/by-id/${vacancyId}`;  // формируем ссылку на вакансию
    try {
      await navigator.clipboard.writeText(vacancyLink);  // копируем ссылку в буфер обмена
      toast('Ссылка скопирована в буфер обмена!');
    } catch (err) {
      toast('Ошибка при копировании ссылки!');
      console.error('Ошибка при копировании ссылки:', err);  //  выводим ошибку в консоль
    }
  };

  return (
    <button onClick={handleShareClick} aria-label="Поделиться">
      {/* Можно вставить свою иконку, например, FontAwesome или SVG */}
     <ShareIcon/>
    </button>
  );
};

export default Share;
