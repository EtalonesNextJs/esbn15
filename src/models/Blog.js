import { Schema, model, models, Types } from "mongoose";
import { Vacancies } from "./Vacancies";
const BlogSchema = new Schema(
  {
    imageFB: [
      {
        type: String, // массив изображений
      },
    ],

    source: {
      type: String,
      required: true, // например: "auto" | "manual"
    },

    title: {
      type: String,
      required: true, // основной заголовок H1
    },

    slug: {
      type: String,
      required: true,
      unique: true, // SEO-friendly URL (автоматически можно генерировать)
    },

    description: {
      type: String,
      required: true, // meta description (до 160 символов)
    },

    category: {
      type: String,
      required: true, // например: "Работа в Германии"
    },

    tags: {
      type: [String], // для поиска и фильтрации (например: ["гипсокартонщик", "Chemnitz"])
      default: [],
    },

    content: [
      {
        title: String, // подзаголовок
        content: String, // HTML или markdown
      },
    ],

    relatedVacancyIds: [
      {
        type: Types.ObjectId,
        ref: "Vacancies", // связываем с коллекцией вакансий
      },
    ],

    city: {
      type: String,
    },

    titleKeyword: {
      type: String, // ключевое слово, например: "гипсокартонщик"
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt и updatedAt автоматически
  }
);

const Blog = models?.Blog || model("Blog", BlogSchema);
export default Blog;
