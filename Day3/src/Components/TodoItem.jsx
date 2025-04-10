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
    <li>
      <span>
        {todo.text}
      </span>

      <span>
        {todo.completed ? " Completed" : " Not Completed"}
      </span>

      <button onClick={handleToggle}>
        {todo.completed ? " Mark as Incomplete" : " Mark as Completed"}
      </button>

      <button onClick={handleRemove}>
         Remove
      </button>
    </li>
  );
}
