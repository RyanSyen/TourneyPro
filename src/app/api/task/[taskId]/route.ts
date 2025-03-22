import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import { IInitialTask } from "@/types/initialTask";
import { ResponseData } from "@/types/common";

const filePath = path.join(process.cwd(), "public/data", "tasks.json");
let responseData: ResponseData;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await params;
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const index = data.findIndex((t: IInitialTask) => t.id === taskId);

    if (index === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(data[index]);
  } catch (error) {
    console.error("[GET_API_TASK] Error fetching task: ", error);

    responseData = { success: false, message: "Internal server error" };

    return NextResponse.json(responseData, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const { id, updatedTask } = await request.json();
  const data: IInitialTask = {
    ...updatedTask,
    updatedAt: dayjs().toDate(),
  };
  const index = tasks.findIndex((t: IInitialTask) => t.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  tasks[index] = { ...tasks[index], ...data };
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

  return NextResponse.json(tasks[index]);
}

export async function DELETE(request: NextRequest) {
  const taskId = await request.json();
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updatedTasks = tasks.filter(
    (t: IInitialTask) => t.id !== taskId
  );
  fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2));

  return new NextResponse(null, { status: 204 });
}
