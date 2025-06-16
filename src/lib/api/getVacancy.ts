// lib/api/api.ts

import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";

interface VacancyFilters {
  profession?: string; // будет искаться в title через $text
  country?: string;
  city?: string;
  category?: string;
  location?: string;
  roof_type?: string;
  salary?: string;
  urgently?: boolean;
  last?: boolean;
}

export async function getVacancies(
  offset: number = 0,
  limit: number = 10,
  filters: VacancyFilters = {}
) {
  await connectDB();

  const query: any = {};

  // Поиск по профессии через полнотекстовый индекс
  if (filters.profession) {
    query.$text = { $search: filters.profession };
  }

  if (filters.country) query.country = filters.country;
  if (filters.city) query.city = filters.city;
  if (filters.category) query.category = filters.category;
  if (filters.location) query.location = filters.location;
  if (filters.roof_type) query.roof_type = filters.roof_type;
  if (filters.salary) query.salary = filters.salary;
  if (filters.urgently) query.urgently = true;
  if (filters.last) query.last = true;

  const [vacancies, total] = await Promise.all([
    Vacancies.find(query).sort({ createdAt: -1 }).skip(offset).limit(limit),
    Vacancies.countDocuments(query),
  ]);

  return { vacancies, total };
}

