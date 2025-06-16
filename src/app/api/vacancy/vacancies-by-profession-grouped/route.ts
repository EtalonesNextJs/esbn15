// /app/api/vacancy/vacancies-by-profession-grouped/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";

export async function GET(request: Request) {
  try {
    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB connected");

    const { searchParams } = new URL(request.url);
    const profession = searchParams.get("profession");

    if (!profession) {
      console.warn("Missing profession param");
      return NextResponse.json({ error: "Profession required" }, { status: 400 });
    }

    console.log(`Fetching vacancies grouped by city for profession: "${profession}"`);

    const grouped = await Vacancies.aggregate([
      { $match: { title: { $regex: new RegExp(profession, "i") } } },
      {
        $group: {
          _id: "$city",
          vacancies: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          vacancies: 1,
        },
      },
      { $sort: { city: 1 } },
    ]);

    console.log(`Found ${grouped.length} grouped cities with vacancies`);

    return NextResponse.json(grouped);
  } catch (error) {
    console.error("Error in GET /vacancies-by-profession-grouped:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
