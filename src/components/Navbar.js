import {NavLink, Link, useLocation} from 'react-router-dom';
export  default function Navbar(){
    const location = useLocation();
    console.log(location)
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/" end>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pomodoro">Pomodoro</NavLink>
                </li>
            </ul>
            
        </nav>
    )
}