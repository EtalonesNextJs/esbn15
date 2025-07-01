import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  
  const vacancy = await Vacancies.findOne({ slug }).populate({
    path: 'manager',
    select: 'name phone' 
  })
  .lean();

  if (!vacancy) {
    return NextResponse.json({ error: "Vacancy not found" }, { status: 404 });
  }

  return NextResponse.json(vacancy);
}
