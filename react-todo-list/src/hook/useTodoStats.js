import { useContext } from 'react';
import { TodoStatsContext } from '../context/TodoStatsContext.jsx';

export const useTodoStats = () => {
  const context = useContext(TodoStatsContext);
  if (!context) throw new Error("useTodoStats must be used within a TodoStatsProvider");
  return context;
};