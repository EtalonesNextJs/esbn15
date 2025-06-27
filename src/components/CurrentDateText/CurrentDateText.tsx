'use client';

import { useEffect, useState } from 'react';

const CurrentDateText = () => {
  const [dateText, setDateText] = useState('');

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formatted = date.toLocaleDateString('ru-RU', options);
    setDateText(`Актуальные вакансии на ${formatted}`);
  }, []);

  return (
    <div className="text-2xl font-bold text-center text-primary p-2 md:px-10 py-3 md:text-3xl">
      {dateText}
    </div>
  );
};

export default CurrentDateText;
