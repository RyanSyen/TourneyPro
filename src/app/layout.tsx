import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Session } from "next-auth";

import Navbar from "@/components/navbar/navbar";
import AuthContext from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.PROJECT_NAME,
  description: process.env.PROJECT_DESC,
};

async function getSession(cookie: string): Promise<Session> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await res.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <body className={`${inter.className} !overflow-auto !mr-0`}>
        <AuthContext session={session}>
          <Navbar />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
