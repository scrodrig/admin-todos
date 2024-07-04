import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany({}); // Delete all todos

  await prisma.todo.createMany({
    data: [
      { description: "Space stone", completed: true },
      { description: "Mind stone" },
      { description: "Reality stone" },
      { description: "Power stone" },
      { description: "Time stone" },
      { description: "Soul stone" },
    ],
  }); // Seed todos

  return NextResponse.json({ message: "Seed executed!" });
}
