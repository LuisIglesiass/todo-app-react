import { useState } from "react";
import TodoOptions from "./TodoOptions/TodoOptions";

export default function TodoItem({ id, text, completed, toggleTodoCompletion, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEditConfirm = () => {
    if (editText.trim()) {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodoCompletion(id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleEditConfirm}
          onKeyDown={e => {
            if (e.key === "Enter") handleEditConfirm();
            if (e.key === "Escape") handleEditCancel();
          }}
          autoFocus
        />
      ) : (
        <span>{text}</span>
      )}

      {!isEditing && (
        <TodoOptions
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(id)}
        />
      )}
    </div>
  );
}