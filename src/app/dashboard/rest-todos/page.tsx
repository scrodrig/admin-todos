import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

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

  //?INFO: useState and useEffect force client side rendering

  return (
    <div>
      <h1>Hello Rest todos</h1>
      <TodosGrid todos={todos} />
    </div>
  );
}
