import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";


export async function GET() {
  try{
    const task = await prisma.task.findMany({
      orderBy: {
        created_at: "desc",
      }
    })
    return NextResponse.json(task)
  } catch {
    return NextResponse.json({
      error: "failed to fetch task"
    });
  }
  
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {title} = body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json(
        { error: 'A valid task title is required' },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title: title.trim()
      }
    })
    return NextResponse.json({newTask})

  }

  catch {
    return  NextResponse.json({
      error: "Failed to add task"
    })
      
  }
}