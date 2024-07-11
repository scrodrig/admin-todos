import React from "react";
import { Todo } from "@prisma/client";

import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className={todo.completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          className={`flex p-2 rounded-me cursor-pointer hover:bg-opacity-60 ${
            todo.completed ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          {todo.completed ? (
            <IoCheckboxOutline className="text-2xl text-green-500" />
          ) : (
            <IoSquareOutline className="text-2xl text-gray-500" />
          )}
        </div>
        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
