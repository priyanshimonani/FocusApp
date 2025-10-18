
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing/Landing';
import Pomodoro from './pages/Pomodoro/Pomodoro';
import Quotes from './pages/Quotes/Quotes';
function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* The Navbar will be rendered on all pages */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/quotes" element={<Quotes/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
