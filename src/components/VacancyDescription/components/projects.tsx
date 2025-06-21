'use client';

import { motion } from 'framer-motion';

import { Project } from './project';
import { SectionHeading } from './section-heading';
import { useSectionInView } from '@/components/VacancyDescription/hooks/use-section-in-view';
import { VacancyType } from '@/lib/types/vacancy';

export const Projects = ({ vacancies }: { vacancies: VacancyType[] }) => {
  const { ref } = useSectionInView('Похожие вакансии');

  return (
    <section ref={ref} id="projects" className="my-10 scroll-mt-28 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.175,
        }}
        viewport={{
          once: true,
        }}
      >
        <SectionHeading
          heading="Другие вакансии"
          content="Работа в других городах"
        />
      </motion.div>
      <div className="flex flex-col gap-7 md:flex-row">
        {vacancies.map((vacancy: VacancyType, index: number) => (
          <Project key={vacancy._id} vacancy={vacancy} index={index} />
        ))}
      </div>
    </section>
  );
};
