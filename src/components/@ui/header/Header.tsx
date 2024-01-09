import { FC } from "react";
import { HeaderLink } from "../../../models/header-link";
import { Link } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../../hooks/auth/useAuth.tsx';
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

    const auth = useAuth();

    return (
        <header className="header">
            <nav>
                <ul>
                    {links.map((link, i) => (
                        <li key={link.text + i} className="headerList__item">
                            <button className="no-style-btn">
                                <Link to={link.url} className="headerLink">
                                    <FontAwesomeIcon icon={link.icon} />
                                </Link>
                            </button>
                        </li>
                    ))}
                    <li className="headerList__item">
                        <button onClick={auth.logout} className="no-style-btn">
                            <Link to="/login" className="headerLink">
                                <FontAwesomeIcon icon="arrow-right-from-bracket" />
                            </Link>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
