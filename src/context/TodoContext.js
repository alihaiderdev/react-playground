import React, { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

export const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodoToLocalStorage = (todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodoToLocalStorage }}>
      {children}
    </TodoContext.Provider>
  );
};
