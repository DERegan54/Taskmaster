import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { updateTaskSchema } from "@/app/validationSchemas";

interface Props {
    params: {
        id: number
        taskName: string
        dueOn: string
        completed: boolean
    }
}

export async function GET(request:NextRequest,{ params }: { params: {id: string}}) {
    //Fetch from DB
    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id)  }
    })

    //If not found return 404, else return actual data
    if (!task)
        return NextResponse.json({error: 'Task not found'},{status: 404})

    return NextResponse.json(task)
}

export async function PUT (request:NextRequest, { params }:{params: {id: string}}) {
    // Validate data
    const body = await request.json();
    const validation = updateTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {
            status: 400, 
    })

    const { taskName, dueOn, completed } = body;

    // Fetch from DB

    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id) }, 
    });

    //If not found return 404, else return actual data
    if (!task)
        return NextResponse.json({error: 'Task not found'},{status: 404});

    // Get task from json
    const updatedTask = await prisma.task.update({
        where: {id: task.id },
        data: { taskName, dueOn, completed }
    });

    return NextResponse.json(updatedTask, { status: 200 });
}

export async function DELETE (request: NextRequest,{ params }: { params: {id: string}}) {
    //Fetch from DB
    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id)  }
    })
    //If not found return 404, else return actual data
    if (!task) {
        return NextResponse.json({error: 'Task not found'},{status: 404})
    }

    await prisma.task.delete({ where: {id: task.id }, });

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
}

