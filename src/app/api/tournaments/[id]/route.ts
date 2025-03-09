// import fs from "fs";
// import path from "path";
// import { NextApiRequest, NextApiResponse } from "next";

// const filePath = path.join(process.cwd(), "data", "tournaments.json");

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   const tournaments = JSON.parse(fs.readFileSync(filePath, "utf8"));

//   if (req.method === "PUT") {
//     const updatedTournament = JSON.parse(req.body);
//     const index = tournaments.findIndex((t: any) => t.id === id);
//     if (index === -1) return res.status(404).json({ error: "Tournament not found" });

//     tournaments[index] = { ...tournaments[index], ...updatedTournament };
//     fs.writeFileSync(filePath, JSON.stringify(tournaments, null, 2));
//     return res.status(200).json(tournaments[index]);
//   }

//   if (req.method === "DELETE") {
//     const updatedTournaments = tournaments.filter((t: any) => t.id !== id);
//     fs.writeFileSync(filePath, JSON.stringify(updatedTournaments, null, 2));
//     return res.status(204).end();
//   }

//   return res.status(405).end();
// }

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), "public/data", "tournaments.json");

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const tournaments = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedTournament = await request.json();
  const index = tournaments.findIndex((t: any) => t.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
  }

  tournaments[index] = { ...tournaments[index], ...updatedTournament };
  fs.writeFileSync(filePath, JSON.stringify(tournaments, null, 2));
  
  return NextResponse.json(tournaments[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const tournaments = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedTournaments = tournaments.filter((t: any) => t.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updatedTournaments, null, 2));
  
  return new NextResponse(null, { status: 204 });
}