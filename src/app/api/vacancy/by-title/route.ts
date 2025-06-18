import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";
import { NextResponse } from "next/server";

interface RequestQuery {
  title?: string;
}

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || '';

  if (!title) {
    return NextResponse.json({ error: 'Title parameter is required' }, { status: 400 });
  }

  // Поиск вакансий с точным или похожим title (регистронезависимо)
  const vacancies = await Vacancies.find({
    title: { $regex: new RegExp(`^${title}$`, 'i') },
  }).lean();

  return NextResponse.json(vacancies);
}
