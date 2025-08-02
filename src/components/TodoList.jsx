import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodoCompletion, onEdit, onDelete }) {
	return (
		<ul>
			{todos.map((todo, i) => (
			<li key={i}>
				<TodoItem 
					id={todo.id}
					text={todo.text}
					completed={todo.completed}
					toggleTodoCompletion={toggleTodoCompletion}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			</li>
			))}
		</ul>		
	);
}