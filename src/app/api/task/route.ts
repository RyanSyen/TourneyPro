import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { ResponseData } from "@/types/common";
import dayjs from "dayjs";
import { IInitialTask } from "@/types/initialTask";

const filePath = path.join(process.cwd(), "public/data", "tasks.json");
let responseData: ResponseData;

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET_API_TASKS] Error fetching tasks: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newTask: IInitialTask = {
      ...data,
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate(),
    };
    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    return NextResponse.json(newTask, { status: 200 });
  } catch (error) {
    console.error("[POST_API_TASKS] Error creating task: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}
