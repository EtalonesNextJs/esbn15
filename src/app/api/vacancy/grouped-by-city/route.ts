import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const profession = searchParams.get("profession");

    if (!profession) {
      return NextResponse.json({ message: "Profession is required" }, { status: 400 });
    }

    const grouped = await Vacancies.aggregate([
      {
        $match: {
          title: profession,
          city: { $exists: true, $ne: "" },
          published: true,
        },
      },
      {
        $group: {
          _id: "$city",
          vacancies: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          city: "$_id",
          vacancies: 1,
          _id: 0,
        },
      },
      {
        $sort: { city: 1 },
      },
    ]);

    return NextResponse.json(grouped);
  } catch (error) {
    console.error("API /grouped-by-city error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
