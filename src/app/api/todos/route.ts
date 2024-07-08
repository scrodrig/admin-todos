import prisma from "@/lib/prisma";
import { Segment } from "next/dist/server/app-render/types";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      { error: "Invalid take parameter is not a number" },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { error: "Invalid skip parameter is not a number" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  }); // Fetch all todos

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {
    const { description, completed } = await postSchema.validate(
      await req.json()
    );

    const todo = await prisma.todo.create({
      data: {
        ...{ description, completed },
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

