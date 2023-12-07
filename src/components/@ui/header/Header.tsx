import { FC } from "react";
import { HeaderLink } from "../../../models/header-link";
import { Link } from "react-router-dom";
import "./header.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
interface HeaderProps { }

export const Header: FC<HeaderProps> = () => {

    const links: HeaderLink[] = [
        {
            url: '/dashboard',
            text: 'Dashboard',
            icon: 'chart-simple'
        },
        {
            url: '/ships',
            text: 'Ships',
            icon: 'rocket'
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
                        <li key={i}>
                            <Link className="headerLink" to={link.url}><FontAwesomeIcon icon={link.icon} /></Link>
                        </li>
                    ))}
                    <li onClick={logOut}>
                        <Link className="headerLink" to="/login"><FontAwesomeIcon icon="arrow-right-from-bracket" /></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
