"use client";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname().trim();

  return (
    <div className={`${pathName !== "/" && "pt-24 px-4"}`}>{children}</div>
  );
}
