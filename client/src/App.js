import { useState, useEffect } from 'react';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import Todos from './components/Todos';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  const [todos, setTodos] = useState([]);

  // ✅ Fetch la montarea aplicației
  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer);
    };
    getTodos();
  }, []);

  // ✅ Fetch toate task-urile
  const fetchTodos = async () => {
    const res = await fetch('http://localhost:8080/post/get');
    const data = await res.json();
    return data.todos;
  };

  // ✅ Fetch un singur task
  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:8080/post/get/${id}`);
    const data = await res.json();
    return data.todo;
  };

  // ✅ Adaugă un task
  const addTodo = async (todo) => {
    const res = await fetch('http://localhost:8080/post', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todo),
    });

    if (res.ok) {
      const data = await res.json();
      setTodos(prev => [...prev, data.todo]);
    }
  };

  // ✅ Șterge un task
  const removeTodo = async (id) => {
    const res = await fetch(`http://localhost:8080/post/delete/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTodos(prev => prev.filter((todo) => todo._id !== id));
    } else {
      alert('There was an error while deleting');
    }
  };

  // ✅ Marchează task-ul ca făcut / nefăcut
  const markTodo = async (id) => {
    const current = todos.find(todo => todo._id === id);
    if (!current) return;

    const updatedTodo = { status: !current.status };

    const res = await fetch(`http://localhost:8080/post/put/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });

    if (res.ok) {
      const data = await res.json();
      setTodos(prev =>
        prev.map((todo) =>
          todo._id === id ? { ...todo, status: data.todo.status } : todo
        )
      );
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <div className="app">
            <div className="container">
              <Header />
              <AddToDo addTodo={addTodo} />
              {todos.length > 0 ? (
                <Todos
                  todos={todos}
                  removeTodo={removeTodo}
                  markTodo={markTodo}
                />
              ) : (
                <p className="text-muted">No Todos To Show</p>
              )}
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
