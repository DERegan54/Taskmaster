import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { createTaskSchema } from "@/app/validationSchemas";


export async function GET() {
    try {
      const tasks = await prisma.task.findMany();  
      return NextResponse.json({ tasks }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}


export async function POST (request: NextRequest) {
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success) 
        return NextResponse.json(validation.error.format(), { status: 400 });
    
    const newTask = await prisma.task.create({
        data: { taskName: body.taskName, dueOn: body.dueOn, completed: body.completed }
    });

    return NextResponse.json(newTask, { status: 201 });
}



