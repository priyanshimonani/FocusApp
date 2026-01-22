import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing/Landing';
import Pomodoro from './pages/Pomodoro/Pomodoro';

import Notes from './pages/Notes/Notes';


import TodoList from './pages/TodoList/TodoList';
import Quotes from './pages/Quotes/Quotes';

function App() {
  // put this here cause in todo.js it wasnt working
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

      <Navbar /> {/* The Navbar will be rendered on all pages */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/quotes" element={<Quotes/>}/>
            <Route path="/todo" element={<TodoList todos={todos} setTodos={setTodos} />} />
          </Routes>

    </BrowserRouter>
  );
}

export default App;
