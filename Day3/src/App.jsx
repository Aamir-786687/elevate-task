import React from "react";
import { TodoProvider } from "./context/TodoContext";
import AddTodo from "./Components/AddTodo";
import Parent from "./Components/Parent";

export default function App() {
  return (
    <TodoProvider>
      <div style={{ padding: "20px" }}>
        <h2>Todo App with useReducer + Context</h2>
        <AddTodo />
        <Parent />
      </div>
    </TodoProvider>
  );
}
