
// import { connectDB } from "@/lib/db";
// import Manager from "@/models/Manager";
// import { NextAuthConfig, Session, User } from "next-auth"; // Import necessary types
// import { JWT } from "next-auth/jwt"; // Import the JWT type
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";


// export const authOptions: NextAuthConfig  = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID as string,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
//       profile: (profile) => {
//         return {
//           id: profile.sub, 
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectDB();

//         const managerFound = await Manager.findOne({
//           email: credentials?.email,
//         });

//         if (!managerFound) {
//           throw new Error("Access denied: Email not found for any manager.");
//         }

//         return managerFound; // Возвращаем данные менеджера
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: User }) { // Specify types for `token` and `user`
//       if (user) {
//         return {
//           ...token,
//           id: user.id, // ID пользователя
//           name: user.name,
//           email: user.email,
//           image: user.image ?? null, // Ensure `image` has the correct type
//         };
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) { // Specify types for `session` and `token`
//       session.user = {
//         id: token.id as string | undefined, // ID пользователя
//         name: token.name as string | null | undefined,
//         email: token.email as string | null | undefined,
//         image: token.image as string | null | undefined, // Ensure `image` has the correct type
//       } as Session["user"]; // Type assertion for session.user
//       return session;
//     },
//   },
// };
// src/lib/auth.ts
// import { NextAuthConfig } from "next-auth"; // Импортируем правильный тип для NextAuth
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthConfig = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID as string,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
//       profile: (profile) => {
//         return {
//           id: profile.sub ?? "", // Убедитесь, что id всегда строка
//           name: profile.name ?? "", // Убедитесь, что name всегда строка
//           email: profile.email ?? "", // Если email null или undefined, заменим на пустую строку
//           image: profile.picture ?? "", // Если image null или undefined, заменим на пустую строку
//           emailVerified: profile.email_verified ?? null, // Добавляем emailVerified, если оно есть в ответе
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Указание страницы для входа
//   },
//   session: {
//     strategy: "jwt", // Указание стратегии сессии
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           id: user.id ?? "", // Убедитесь, что id всегда строка
//           name: user.name ?? "", // Убедитесь, что name всегда строка
//           email: user.email ?? "", // Убедитесь, что email всегда строка
//           image: user.image ?? "", // Убедитесь, что image всегда строка
//           emailVerified: user.emailVerified ? new Date() : null, // Обрабатываем поле emailVerified
//         };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         id: token.id as string, // Убедитесь, что id всегда строка
//         name: token.name as string | null | undefined,
//         email: token.email as string, // Убедитесь, что email всегда строка
//         image: token.image as string | null | undefined,
//         emailVerified: token.emailVerified ? new Date() : null, // Добавляем emailVerified в session
//       };
//       return session;
//     },
//   },
// };
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

const providers = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: {
    strategy: "jwt", // Если используете JWT
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token", // Имя cookie для сессии
      options: {
        httpOnly: true, // Запрещает доступ к cookie через JavaScript
        secure: process.env.NODE_ENV === "production", // Использовать secure cookies только в production
        maxAge: 24 * 60 * 60, // Время жизни cookie (24 часа)
      },
    },
  },
  callbacks: {
    async session({ session }) {
     
      return session;
    },

    // Этот колбэк выполняется при попытке входа
    async signIn({ profile }) {
      try {
        await connectDB();

        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            role: 'user',
            googleId: profile.id
          });
        }

        const manager = await Manager.findOne({ email: profile.email });

        if (manager) {
          // Если менеджер найден, сохраняем его ID и роль в токен
          return true;  // Разрешаем вход
        }

        // Если менеджер не найден, возвращаем false (не разрешаем вход)
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    // Этот колбэк выполняется при генерации токена
    async jwt({ token, user }) {
      if (user && user.email) {
        // Ищем менеджера по email пользователя
        const manager = await Manager.findOne({ email: user.email }).populate('role');  
        if (manager) {
          // Проверяем, существует ли роль у менеджера
          if (manager.role && manager.role.name) {
            token.managerRole = manager.role.name.toString();  // Сохраняем роль менеджера
          } else {
            console.log("Manager role not found or incorrect structure");
          }

          token.managerId = manager._id.toString();  
          token.managerRole = manager.role.name.toString();  
        }

        
      }
      return token;
    },
  },
});