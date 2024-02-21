// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//   const lists = await prisma.todo.findMany({
//     orderBy: {
//       id: "asc",
//     },
//   });

//   return NextResponse.json({ lists });
// }

// export async function POST(request: Request) {
//   const { text } = await request.json();

//   await prisma.todo.create({
//     data: {
//       text: text,
//     },
//   });

//   return NextResponse.json({ message: "success" });
// }
