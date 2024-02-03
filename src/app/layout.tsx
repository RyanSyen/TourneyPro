import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { getServerSession, Session } from "next-auth";

import Navbar from "@/components/navbar/navbar";
import AuthContext from "@/context/AuthProvider";

import { auth } from "./api/auth/[...nextauth]/auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.PROJECT_NAME,
  description: process.env.PROJECT_DESC,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await auth(); // helper function not working?
  const session = await getServerSession(authOptions);

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
