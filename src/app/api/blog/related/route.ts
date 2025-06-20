import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const category = request.nextUrl.searchParams.get("category");
    const excludeSlug = request.nextUrl.searchParams.get("exclude");

    if (!category) {
      return NextResponse.json({ error: "Категория не указана" }, { status: 400 });
    }

    const posts = await Blog.find({
      category,
      status: "published",
      slug: { $ne: excludeSlug },
    })
      .select("title slug")
      .sort({ publishedAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Ошибка в API blog/related:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
