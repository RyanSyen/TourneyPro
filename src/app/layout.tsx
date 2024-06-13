import "./globals.scss";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import Navbar from "@/components/navbar/navbar";
import CustomBounceLoader from "@/components/spinner/customBounceLoader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthContextProvider } from "@/context/AuthContext";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { UserContextProvider } from "@/context/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.PROJECT_NAME,
  description: process.env.PROJECT_DESC,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="!overflow-auto">
      <body
        className={`${inter.className}`}
        style={{ marginRight: `0px !important` }}
      >
        {/* <ReactQueryProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<CustomBounceLoader />}>
            {/* <UserContextProvider> */}
            <AuthContextProvider>
              <Navbar />
              <Toaster />
              {/* <Suspense fallback={<Loading />}>{props.children}</Suspense> */}
              {props.children}
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              {/* </UserContextProvider> */}
            </AuthContextProvider>
          </Suspense>
        </ThemeProvider>
        {/* </ReactQueryProvider> */}
      </body>
    </html>
  );
}
