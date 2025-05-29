// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User; // Используем User, который определяем ниже
  }

  interface User {
    id: string; // Обеспечиваем, что id всегда строка
    name?: string | null;
    email?: string | null;
    image?: string | null;
    emailVerified?:  Date | null;
  }
}
