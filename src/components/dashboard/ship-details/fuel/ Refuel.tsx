import { FC } from "react";
import { callApi } from "../../../../utils/api/api-caller";
import { RefuelResponse } from "../../../../models/api-response/refuel-response";
import { useShip } from "../../../../hooks/ship/useShip";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { toast } from "react-toastify";

export const Refuel: FC = () => {

    const shipContext = useShip();
    const auth = useAuth();

    function refuel() {
        callApi<RefuelResponse>(`/my/ships/${shipContext.ship?.symbol}/refuel`, auth.token, 'post')
            .then((res) => {
                auth.setAgentState(res.data.agent);
                shipContext.setFuel(res.data.fuel);
                toast.success(`Successfully refueled ${res.data.transaction.shipSymbol} for ${res.data.transaction.totalPrice}`);
            });
    }

    return (
        <button className="button" onClick={refuel}>Refuel</button>
    );
}
