import { FC } from "react";
import { useShip } from "../../../../hooks/ship/useShip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './cooldown.css';
interface CooldownProps { };

export const Cooldown: FC<CooldownProps> = () => {

    const shipContext = useShip();

    return (
        <span>
            <FontAwesomeIcon icon="clock" className="yellow-color mr-3" />{shipContext.cooldown}s
        </span>
    );
}
