import { useState, useEffect } from 'react'
import './App.css'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { useTodoStats } from './hook/useTodoStats';
import StatsBar from './components/StatsBar';

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const { incrementTotal, decrementTotal, decrementCompleted, incrementCompleted } = useTodoStats();
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const toggleTodoCompletion = (id) => {
    let changedToCompleted = null;
  
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const updatedCompleted = !todo.completed;
        changedToCompleted = updatedCompleted;
        return { ...todo, completed: updatedCompleted };
      }
      return todo;
    });
  
    setTodos(updatedTodos);
  
    if (changedToCompleted === true) {
      incrementCompleted();
    } else if (changedToCompleted === false) {
      decrementCompleted();
    }
  };
 
  function handleSubmit(e) {
    e.preventDefault();
  
    if (todo.trim() === "") return;
  
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false
    };

    incrementTotal();
    
    setTodos([...todos, newTodo]);
    setTodo("");
  }

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (todoToDelete && todoToDelete.completed) {
      decrementCompleted();
    }
    decrementTotal();
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#4F46E5" viewBox="0 0 24 24">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6l2-2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM7 9h10v2H7V9Zm0 4h6v2H7v-2Z"/>
        </svg>
        <h1>FocusList</h1>
        <TodoForm 
          todo={todo}
          setTodo={setTodo}
          todos={todos}
          setTodos={setTodos}
          handleSubmit={handleSubmit}
        />
        <StatsBar />
      </header>

      <main className="todo-list-wrapper">
        <div className='todo-scroll'>
          <TodoList 
            todos={todos} 
            toggleTodoCompletion={toggleTodoCompletion}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        </div>
      </main>
    </div>
  );
}

export default App;