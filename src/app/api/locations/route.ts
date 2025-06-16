import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";

export async function GET(request: Request) {
  try {
    console.log("Connecting to DB...");
    await connectDB();
    console.log("Connected to DB");

    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");

    const matchStage: any = {
      country: { $exists: true, $ne: "" },
      city: { $exists: true, $ne: "" },
    };

    if (title) {
      matchStage.title = title;
      console.log(`Filtering locations by title: ${title}`);
    } else {
      console.log("No title filter applied. Returning all locations.");
    }

    const locations = await Vacancies.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { country: "$country", city: "$city" },
        },
      },
      {
        $group: {
          _id: "$_id.country",
          cities: { $addToSet: "$_id.city" },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          cities: 1,
        },
      },
      {
        $sort: { country: 1 },
      },
    ]);

    console.log("Locations aggregated:", JSON.stringify(locations, null, 2));

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error in GET /api/locations:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
