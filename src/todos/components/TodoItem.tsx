import React from "react";
import { Todo } from "@prisma/client";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  return <div>{todo.description}</div>;
};
