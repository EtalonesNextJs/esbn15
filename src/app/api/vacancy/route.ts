import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";  
import Vacancies from "@/models/Vacancies";  

export const GET = async () => {
  try {
    await connectDB();

    const vacancy = await Vacancies.find().sort({ createdAt: -1 })
    return new NextResponse(JSON.stringify(vacancy), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Ошибка при получении вакансий: ${error.message}`, {
      status: 500,
    });
  }
};


