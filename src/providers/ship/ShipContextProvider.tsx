import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth.tsx';
import { useLocation, useParams } from 'react-router-dom';
import { ShipContext } from '../../hooks/ship/ShipContext.ts';
import {Cargo, Fuel, Nav, ShipModel} from '../../models/ship.model.ts';
import { Waypoint, WaypointResponse } from '../../models/waypoint.model.ts';
import { callApi } from '../../utils/api/api-caller.ts';
import { NavigateResponse } from '../../models/api-response/navigate-response.ts';
import { ExtractResourcesResponse } from '../../models/api-response/extract-resources-response.ts';
import {StatusChangeResponse} from '../../models/api-response/status-change-response.ts';
import {SellCargoResponse} from '../../models/api-response/sell-cargo-response.ts';
import {Market} from '../../models/market.model.ts';
import {ShipyardResponse} from '../../models/api-response/shipyard-response.ts';

interface ShipContextProviderProps {
    children: ReactElement;
}

export function ShipContextProvider({ children }: ShipContextProviderProps) {
    const auth = useAuth();

    // State passed from clicked button, can be undefined if request didn't come from button click
    const { state } = useLocation();

    // Id from url params
    const { shipId } = useParams();

    // State
    const [ship, setShip] = useState<ShipModel>();
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
    const [cooldown, setCooldown] = useState<number>(0);
    const [fuel, setFuel] = useState<Fuel>();
    const [nav, setNav] = useState<Nav>();
    const [cargo, setCargo] = useState<Cargo>()
    const [marketplace, setMarketplace] = useState<Market>();
    const [shipyard, setShipyard] = useState<ShipyardResponse>();

    function updateShip(ship: ShipModel | undefined) {
        setShip(ship);
        setFuel(ship?.fuel);
        setNav(ship?.nav);
        setCooldown(ship?.cooldown?.remainingSeconds ?? 0);
        setCargo(ship?.cargo);
    }

    const getShip = useCallback(() => {
        callApi<ShipModel>(`/my/ships/${shipId}`, auth.token)
            .then((res) => {
                updateShip(res.data);
            });
    }, [shipId, auth.token]);

    // Initialize ship-details state from url state or from API
    useEffect(() => {
        if (state?.ship) {
            updateShip(state.ship);
        } else {
            getShip();
        }
    }, [state?.ship, getShip]);

    // Handle cooldown interval logic
    useEffect(() => {
        let intervalId: number;

        const handleInterval = () => {
            setCooldown((cooldown) => {
                if (cooldown && cooldown > 0) {
                    return cooldown - 1;
                }
                clearInterval(intervalId);
                return 0;
            });
        };

        // Set the interval only if cooldown is greater than 0
        if (cooldown && cooldown > 0) {
            intervalId = setInterval(handleInterval, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [cooldown]);

    // Scan waypoints around this ship-details
    function scanWaypoints(): void {
        callApi<WaypointResponse>(`/my/ships/${ship?.symbol}/scan/waypoints`, auth.token, 'post')
            .then((res) => {
                setWaypoints(res.data.waypoints);
                setCooldown(res.data.cooldown.remainingSeconds);
            });
    }

    function navigateToWaypoint(waypoint: Waypoint): void {
        callApi<NavigateResponse>(`/my/ships/${ship?.symbol}/navigate`, auth.token, 'post', {
            waypointSymbol: waypoint.symbol
        })
            .then((res) => {
                setFuel(res.data.fuel);
                setNav(res.data.nav);
            });
    }

    function extractResources(): void {
        callApi<ExtractResourcesResponse>(`/my/ships/${ship?.symbol}/extract`, auth.token, 'post')
            .then((res) => {
                setCooldown(res.data.cooldown.remainingSeconds);
                setCargo(res.data.cargo);
            });
    }

    function toggleShipNavStatus(status: string): void {
        callApi<StatusChangeResponse>(`/my/ships/${ship?.symbol}/${status}`, auth.token, 'post')
            .then((res) => {
                setNav(res.data.nav);
            });
    }

    function sellCargo(symbol: string): void {
        const cargoToSell = cargo?.inventory.find(inventory => inventory.symbol === symbol);
        if (!cargoToSell) {
            return;
        }
        callApi<SellCargoResponse>(`/my/ships/${ship?.symbol}/sell`, auth.token, 'post', {
            symbol: symbol,
            units: cargoToSell.units
        })
            .then((res) => {
                setCargo(res.data.cargo);
                auth.setAgentState(res.data.agent);
            });
    }

    function getMarketplaceInfo(): void {
        callApi<Market>(`/systems/${nav?.systemSymbol}/waypoints/${nav?.waypointSymbol}/market`, auth.token)
            .then((res) => {
                setMarketplace(res.data);
            });
    }

    function getShipyard(): void {
        callApi<ShipyardResponse>(`/systems/${nav?.systemSymbol}/waypoints/${nav?.waypointSymbol}/shipyard`, auth.token)
            .then(res => {
                setShipyard(res.data);
            });
    }

    return <ShipContext.Provider value={{
        ship,
        waypoints,
        cooldown,
        fuel,
        nav,
        cargo,
        marketplace,
        shipyard,
        scanWaypoints,
        navigateToWaypoint,
        extractResources,
        toggleShipNavStatus,
        sellCargo,
        getMarketplaceInfo,
        getShipyard,
    }}>
        {children}
    </ShipContext.Provider>;
}