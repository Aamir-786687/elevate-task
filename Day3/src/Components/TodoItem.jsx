import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const { dispatch } = useContext(TodoContext);

  const handleToggle = () => {
    dispatch({ type: "TOGGLE", payload: todo.id });
  };

  const handleRemove = () => {
    dispatch({ type: "REMOVE", payload: todo.id });
  };

  return (
    <li style={{ marginBottom: "10px" }}>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginRight: "10px",
        }}
      >
        {todo.text}
      </span>

      <span style={{ fontWeight: "bold", color: todo.completed ? "green" : "red" }}>
        {todo.completed ? " Completed" : " Not Completed"}
      </span>

      <button onClick={handleToggle} style={{ marginLeft: "10px" }}>
        {todo.completed ? " Mark as Incomplete" : " Mark as Completed"}
      </button>

      <button onClick={handleRemove} style={{ marginLeft: "10px" }}>
         Remove
      </button>
    </li>
  );
}
