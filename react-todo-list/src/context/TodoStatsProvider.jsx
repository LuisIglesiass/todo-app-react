// src/context/TodoStatsProvider.jsx
import { useState, useEffect } from "react";
import { TodoStatsContext } from "./TodoStatsContext.jsx";

export const TodoStatsProvider = ({ children }) => {
  const [totalTodos, setTotalTodos] = useState((() => {
    const storedTotalTodos = localStorage.getItem("totalTodos");
    return storedTotalTodos ? JSON.parse(storedTotalTodos) : 0;
  }));

  const [completedTodos, setCompletedTodos] = useState((() => {
    const storedCompletedTodos = localStorage.getItem("completedTodos");
    return storedCompletedTodos ? JSON.parse(storedCompletedTodos) : 0;
  }));

  const incrementTotal = () => setTotalTodos(prev => prev + 1);
  const decrementTotal = () => setTotalTodos(prev => prev - 1);
  const incrementCompleted = () => setCompletedTodos(prev => prev + 1);
  const decrementCompleted = () => setCompletedTodos(prev => prev - 1);

  useEffect(() => {
    localStorage.setItem("totalTodos", JSON.stringify(totalTodos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [totalTodos, completedTodos]);

  return (
    <TodoStatsContext.Provider value={{
      totalTodos,
      completedTodos,
      incrementTotal,
      decrementTotal,
      incrementCompleted,
      decrementCompleted
    }}>
      {children}
    </TodoStatsContext.Provider>
  );
};
