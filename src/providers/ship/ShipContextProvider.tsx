import {ReactElement, useCallback, useEffect, useState} from 'react';
import {useAuth} from '../../hooks/auth/useAuth.tsx';
import {useLocation, useParams} from 'react-router-dom';
import {ShipContext} from '../../hooks/ship/ShipContext.ts';
import {Cargo, FuelModel, Nav, ShipModel} from '../../models/ship.model.ts';
import {Waypoint, WaypointResponse} from '../../models/waypoint.model.ts';
import {callApi} from '../../utils/api/api-caller.ts';
import {NavigateResponse} from '../../models/api-response/navigate-response.ts';
import {ExtractResourcesResponse} from '../../models/api-response/extract-resources-response.ts';
import {StatusChangeResponse} from '../../models/api-response/status-change-response.ts';
import {SellCargoResponse} from '../../models/api-response/sell-cargo-response.ts';
import {Market} from '../../models/market.model.ts';
import {ShipyardResponse} from '../../models/api-response/shipyard-response.ts';
import {getSecondsToArrival} from '../../utils/ship/getSecondsToArrival.ts';
import useInterval from '../../hooks/interval/useInterval.ts';
import {toast} from 'react-toastify';

interface ShipContextProviderProps {
    children: ReactElement;
}

export function ShipContextProvider({children}: ShipContextProviderProps) {
    const auth = useAuth();

    // State passed from clicked button, can be undefined if request didn't come from button click
    const {state} = useLocation();

    // Id from url params
    const {shipId} = useParams();

    // State
    const [ship, setShip] = useState<ShipModel>();
    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
    const [cooldown, setCooldown] = useState<number>(0);
    const [fuel, setFuel] = useState<FuelModel>();
    const [nav, setNav] = useState<Nav>();
    const [cargo, setCargo] = useState<Cargo>();
    const [marketplace, setMarketplace] = useState<Market>();
    const [shipyard, setShipyard] = useState<ShipyardResponse>();
    const [arrivalTime, setArrivalTime] = useState<number>(0);

    function updateShip(ship: ShipModel | undefined) {
        setShip(ship);
        setFuel(ship?.fuel);
        setNav(ship?.nav);
        setCooldown(ship?.cooldown?.remainingSeconds ?? 0);
        setCargo(ship?.cargo);
        setArrivalTime(getSecondsToArrival(ship?.nav));
    }

    const getShip = useCallback(() => {
        callApi<ShipModel>(`/my/ships/${shipId}`, auth.token)
            .then((res) => {
                updateShip(res.data);
            });
    }, [shipId, auth.token]);

    const getNav = useCallback(() => {
        callApi<Nav>(`/my/ships/${ship?.symbol}/nav`, auth.token).then(res => {
            setNav(res.data);
        });
    }, [auth.token, ship?.symbol]);

    // Init cooldown interval
    useInterval(() => {
        setCooldown((c) => c > 0 ? c - 1 : 0);
    }, cooldown === 0 ? null : 1000);

    // Init arrival time interval
    useInterval(() => {
        setArrivalTime((a) => {
            if (a - 1 === 0) {
                getNav();
            }
            return a > 0 ? a - 1 : 0;
        });
    }, arrivalTime === 0 ? null : 1000);

    // Initialize ship-details state from url state or from API
    useEffect(() => {
        if (state?.ship) {
            updateShip(state.ship);
        } else {
            getShip();
        }
    }, [state?.ship, getShip]);

    // Scan waypoints around this ship-details
    function scanWaypoints(): void {
        callApi<WaypointResponse>(`/my/ships/${ship?.symbol}/scan/waypoints`, auth.token, 'post')
            .then((res) => {
                setWaypoints(res.data.waypoints);
                setCooldown(res.data.cooldown.remainingSeconds);
            });
    }

    function navigateToWaypoint(symbol: string | undefined): void {
        callApi<NavigateResponse>(`/my/ships/${ship?.symbol}/navigate`, auth.token, 'post', {
            waypointSymbol: symbol
        })
            .then((res) => {
                setFuel(res.data.fuel);
                setNav(res.data.nav);
                setArrivalTime(getSecondsToArrival(res.data.nav));
                setMarketplace(undefined);
            });
    }

    function extractResources(): void {
        callApi<ExtractResourcesResponse>(`/my/ships/${ship?.symbol}/extract`, auth.token, 'post')
            .then((res) => {
                setCooldown(res.data.cooldown.remainingSeconds);
                setCargo(res.data.cargo);
                toast.success(
                    `Successfully extracted ${res.data.extraction.yield.units} ${res.data.extraction.yield.symbol}`
                );
            });
    }

    function toggleShipNavStatus(status: 'dock' | 'orbit'): void {
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
                toast.success(
                    `+${res.data.transaction.totalPrice} from ${res.data.transaction.units} ${res.data.transaction.tradeSymbol}`
                );
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
        arrivalTime,
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