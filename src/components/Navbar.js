import {NavLink} from 'react-router-dom';
export  default function Navbar(){
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