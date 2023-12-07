import { FC } from "react";
import { HeaderLink } from "../../../models/header-link";
import { Link } from "react-router-dom";
import "./header.css";
interface HeaderProps { }

export const Header: FC<HeaderProps> = () => {

    const links: HeaderLink[] = [
        {
            url: '/dashboard',
            text: 'Dashboard',
            icon: ''
        },
        {
            url: '/ships',
            text: 'Ships',
            icon: ''
        },
    ];

    function logOut(): void {
        localStorage.clear();
    }

    return (
        <header className="header">
            <nav>
                <ul>
                    {links.map((link, i) => (
                        <li key={i}><Link className="headerLink" to={link.url}>{link.text}</Link></li>
                    ))}
                    <li onClick={logOut}><Link className="headerLink" to="/login">Log Out</Link></li>
                </ul>
            </nav>
        </header>
    );
}
