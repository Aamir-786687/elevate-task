import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function AddTodo() {
  const [text, setText] = useState("");
  const { dispatch } = useContext(TodoContext);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch({ type: "ADD", payload: text });
      setText("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
