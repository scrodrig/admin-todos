import prisma from "@/lib/prisma";

export const metadata = {
  title: "Rest todos",
  description: "Rest todos page",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      description: "asc",
    },
  });

  return (
    <div>
      <h1>Hello Rest todos</h1>
      <p>{JSON.stringify(todos)}</p>
    </div>
  );
}
