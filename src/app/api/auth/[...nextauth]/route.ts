// import { authOptions } from "@/lib/auth";
// import NextAuth from "next-auth";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
// src/app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers
