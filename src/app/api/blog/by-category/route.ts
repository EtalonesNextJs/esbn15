import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const category = request.nextUrl.searchParams.get("category");

    if (!category) {
      return NextResponse.json({ error: "Категория не указана" }, { status: 400 });
    }

    const post = await Blog.findOne({ category, status: "published" })
      .select("title slug description category")
      .sort({ publishedAt: -1 })
      .lean();

    if (!post) {
      return NextResponse.json(null);
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Ошибка в API blog/by-category:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
