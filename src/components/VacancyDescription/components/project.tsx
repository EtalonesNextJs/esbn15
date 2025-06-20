'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { VacancyType } from '@/lib/types/vacancy';


type TProps = {
  vacancy: VacancyType;
  index: number;
};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

export const Project = ({ vacancy, index }: TProps) => {
  const { imageFB, title, location } = vacancy;
const encodedCity = encodeURIComponent(vacancy.city || "");
  const encodedTitle = encodeURIComponent(vacancy.title || "");
  const encodedSlug = encodeURIComponent(vacancy.slug || "");

  const href = `/vacancies/${encodedCity}/${encodedTitle}/${encodedSlug}`;

  return (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: true,
      }}
      custom={index}
      className="flex flex-col rounded border p-5 md:w-1/2"
    >
      <Link
        href={href}
        aria-label={title}
        target="_blank"
        className="overflow-hidden rounded"
      >
        <Image
          src={imageFB || '/images/logo/logo-red.png'}
          alt={'e'}
          height={350}
          width={400}
          className="rounded transition-transform hover:scale-105"
        />
      </Link>
      <h3 className="mt-3 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground mb-2 mt-1">{location}</p>
      <div className="flex flex-wrap gap-2">
        {/* {technologies.map((tech) => (
          <span className="rounded-full border px-3 py-1 text-sm" key={tech}>
            {tech}
          </span>
        ))} */}
      </div>
    </motion.div>
  );
};
