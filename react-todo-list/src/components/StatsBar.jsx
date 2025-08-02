import { useTodoStats } from '../hook/useTodoStats';

export default function StatsBar() {
  const { totalTodos, completedTodos } = useTodoStats();

  return (
    <div className="stats-bar">
      <span>Total: {totalTodos}</span>
      <span>Completed: {completedTodos}</span>
    </div>
  );
}