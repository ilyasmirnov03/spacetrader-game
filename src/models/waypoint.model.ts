import {Trait} from './trait.model.ts';
import {Cooldown} from './cooldown.model.ts';

interface Orbital {
    symbol: string;
}

interface Faction {
    symbol: string;
}

interface Chart {
    waypointSymbol: string;
    submittedBy: string;
    submittedOn: string;
}

export interface Waypoint {
    symbol: string;
    type: string;
    systemSymbol: string;
    x: number;
    y: number;
    orbitals: Orbital[];
    faction: Faction;
    traits: Trait[];
    chart: Chart;
    isUnderConstruction?: boolean;
}

export interface WaypointResponse {
    cooldown: Cooldown;
    waypoints: Waypoint[];
}