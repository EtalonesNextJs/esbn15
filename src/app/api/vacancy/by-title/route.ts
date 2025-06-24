import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const profession = searchParams.get('profession') || '';

  if (!profession) {
    return NextResponse.json({ error: 'profession parameter is required' }, { status: 400 });
  }

  // Поиск вакансий с точным или похожим profession (регистронезависимо)
  const vacancies = await Vacancies.find({
    profession: { $regex: new RegExp(`^${profession}$`, 'i') },
  }).lean();
console.log("Vacancies889988", vacancies);
  return NextResponse.json(vacancies);
}
