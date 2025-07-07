import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TourneyPro",
  description: "Next Gen Tournament Management | Tournament Builder Suite",
};

export default function TournamentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
