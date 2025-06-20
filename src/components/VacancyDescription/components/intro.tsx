'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from './button';
import { Icons } from './icons';
import { useSectionInView } from '@/components/VacancyDescription/hooks/use-section-in-view';
import { VacancyType } from '@/lib/types/vacancy';

export const Intro = ({city, title, work_descr, status}: VacancyType) => {
  const { ref } = useSectionInView('Home');

  return (
    <section
      ref={ref}
      id="home"
      className="my-10 flex scroll-mt-96 flex-col items-center gap-5 text-center sm:mt-28"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'tween',
          duration: 0.2,
        }}
      >
        <Link
  href="#contact"
  className={`flex items-center gap-3 rounded border px-3 py-1 ${
    status === "open" ? "border-green-400" : "border-yellow-400"
  }`}
>
  <span className="relative flex size-2">
    {status === "open" ? (
      <>
        <span className="absolute flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative flex size-2 rounded-full bg-green-400"></span>
      </>
    ) : (
      <>
        <span className="absolute flex size-full animate-pulse rounded-full bg-yellow-400 opacity-75"></span>
        <span className="relative flex size-2 rounded-full bg-yellow-400"></span>
      </>
    )}
  </span>
  <span className="font-mono text-sm">
    {status === "open" ? "Набор открыт!" : "Набор приостановлен"}
  </span>
</Link>

      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading max-w-3xl text-4xl font-extrabold md:text-5xl"
      >
        Работа&nbsp;
        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {title}
        </span>{' '}
        в городе {city}.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="text-muted-foreground max-w-xl"
      >
        {work_descr}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="flex flex-row gap-2"
      >
        <Button asChild size="lg">
          <Link href="#contact">
            Записаться на собеседование <Icons.arrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        
      </motion.div>
    </section>
  );
};
