import { NextResponse } from 'next/server';
import { prisma } from '@/libs/db';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { completed } = body;

    if (typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Completed status must be True or False' }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed },
    });

    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update task' }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Task deleted successfully' }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete task' }
    );
  }
}