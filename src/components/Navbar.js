import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 20px',
    borderRadius: '50px',
    margin: '20px auto',
    maxWidth: '600px',
    backdropFilter: 'blur(8px)',
    background: 'linear-gradient(135deg, rgba(255,251,251,0.63), rgba(255,255,255,0.3))',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Raleway, sans-serif',
    gap: '15px',
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '30px',
    transition: 'all 0.2s ease',
    color: '#1E1E1E',
    fontWeight: 500,
  };

  const activeStyle = {
    backgroundColor: 'rgba(30,30,30,0.1)',
  };

  return (
    <nav style={navStyle}>
      <NavLink to="/" end style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        Home
      </NavLink>
      <NavLink to="/todo" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        To-Do List
      </NavLink>
      <NavLink to="/notes" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        Notes
      </NavLink>
      <NavLink to="/pomodoro" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        Pomodoro
      </NavLink>
      <NavLink to="/quotes" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
        Quotes
      </NavLink>
      
    </nav>
  );
}
