import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing/Landing';
import Pomodoro from './pages/Pomodoro/Pomodoro';
import TodoList from './pages/TodoList/TodoList';

function App() {
  // ✅ Load todos directly from localStorage at initialization
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to read todos from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos to localStorage', e);
    }
  }, [todos]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/todo" element={<TodoList todos={todos} setTodos={setTodos} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
