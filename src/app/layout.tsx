import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/layouts/Default";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Etalones S&B | Работа в Европе",
  description: "Работа в Европе. Германия, Нидерланды, Бельгия.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
console.log(`
Dedicated to everyone who doesn’t like our website and to those who believe they can make it better — we believe in your abilities and wish you success.
If you know how to do it better, sit down and build a site better than ours!

If you want to offer your services, know this: we only pay for results.
Don’t expect any upfront payments or advances from us.
`);

  return (
    <html lang="ru">

       <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          
      <DefaultLayout>
        {children}
        <Analytics />
        <SpeedInsights />
      </DefaultLayout>
      </body>
    </html>
  );
}
