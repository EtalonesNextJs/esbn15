import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const allVacancies = await Vacancies.find().lean();

  const grouped = allVacancies.reduce((acc: Record<string, any[]>, vacancy) => {
    const city = vacancy.city || "Не указан";
    if (!acc[city]) acc[city] = [];
    acc[city].push(vacancy);
    return acc;
  }, {});

  return NextResponse.json(grouped);
}
