'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from './section-heading';
import { Skills } from './skills';
import { useSectionInView } from '@/components/VacancyDescription/hooks/use-section-in-view';
import { VacancyType } from '@/lib/types/vacancy';

export const About = ({city, title, work_descr, home_descr}: VacancyType) => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      id="about"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="О вакансии" />
      <div className="-mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4">
          Работа по вакансии {title} в городе {city}.
          Условия труда: {work_descr}
        </p>
        <p>
          Условия проживания:
          {home_descr}
        </p>
      </div>
      <Skills />
    </motion.section>
  );
};
