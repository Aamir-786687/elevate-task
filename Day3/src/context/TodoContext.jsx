import { createContext, useReducer } from "react";

export const TodoContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload);
    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
