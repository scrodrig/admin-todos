import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

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

export async function POST(req: Request) {
  const body = await req.json();

  const todo = await prisma.todo.create({
    data: {
      ...body,
    },
  }); // Create a new todo

  return NextResponse.json(body);
}
