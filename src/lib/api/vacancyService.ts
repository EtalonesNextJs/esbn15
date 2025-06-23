import Vacancies from "@/models/Vacancies";
import { connectDB } from "../db";


export async function getVacanciesByType(type: string) {
  await connectDB();

  let filter = {};

  if (type === 'new') {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    filter = { createdAt: { $gte: oneMonthAgo } };
  } else if (type !== 'all') {
    filter = { category: type };
  }

  const vacancies = await Vacancies.find(filter).sort({ createdAt: -1 });
  return vacancies;
}
