// src/lib/generateArticle.ts
import OpenAI from "openai";

// 1. Создаём клиента OpenAI
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Убедись, что .env файл содержит ключ
});

// 2. Асинхронная функция генерации статьи
export async function generateArticle(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Ты — помощник по созданию SEO-оптимизированных статей для строительной компании в Европе. Пиши внятно, профессионально и убедительно.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // 3. Вернуть сгенерированный текст
    return completion.choices[0]?.message?.content ?? null;
  } catch (error: any) {
    console.error("Ошибка генерации статьи:", error);
    return null;
  }
}

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// const completion = openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   store: true,
//   messages: [
//     {"role": "user", "content": "write a haiku about ai"},
//   ],
// });

// completion.then((result) => console.log(result.choices[0].message));