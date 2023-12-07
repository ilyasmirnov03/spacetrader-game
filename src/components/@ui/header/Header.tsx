import { FC } from "react";
import { HeaderLink } from "../../../models/header-link";
import { Link } from "react-router-dom";
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
        <header>
            <nav>
                <ul>
                    {links.map((link, i) => (
                        <li key={i}><Link to={link.url}>{link.text}</Link></li>
                    ))}
                    <li onClick={logOut}><Link to="/login">Log Out</Link></li>
                </ul>
            </nav>
        </header>
    );
}
