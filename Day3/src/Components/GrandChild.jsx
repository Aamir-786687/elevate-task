import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoList from "./TodoList";

export default function GrandChild() {
  const { state } = useContext(TodoContext);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Todo List (Accessed in Deep Component)</h3>
      <TodoList todos={state} />
    </div>
  );
}
