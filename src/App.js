
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing/Landing';
import Pomodoro from './pages/Pomodoro/Pomodoro';
function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* The Navbar will be rendered on all pages */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
