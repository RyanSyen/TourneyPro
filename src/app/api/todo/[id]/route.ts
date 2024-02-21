// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// interface TodoParam {
//   id: string;
// }

// export async function GET(
//   request: NextRequest,
//   context: { params: TodoParam }
// ) {
//   const todo = await prisma.todo.findFirst({
//     where: {
//       id: context.params.id,
//     },
//   });
//   return NextResponse.json({ todo });
// }

// export async function PUT(request: Request, context: { params: TodoParam }) {
//   return NextResponse.json({ message: "Test" }, { status: 200 });
// }

// export async function DELETE(request: Request, context: { params: TodoParam }) {
//   const todo = await prisma.todo.delete({
//     where: {
//       id: context.params.id,
//     },
//   });

//   console.log("Delete result: ", todo);

//   return NextResponse.json({ message: "success" }, { status: 200 });
// }
