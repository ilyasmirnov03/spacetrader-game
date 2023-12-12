import { Trait } from './trait.model.ts';
import { Cooldown } from './cooldown.model.ts';

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

interface Modifier {
    symbol: string;
    name: string;
    description: string;
}

// Used waypoint types
export type WaypointType = 'PLANET' | 'JUMP_GATE' | 'FUEL_STATION' | 'ASTEROID_FIELD' | 'ASTEROID' | 'ENGINEERED_ASTEROID'
    | 'ASTEROID_BASE';

export interface Waypoint {
    symbol: string;
    type: WaypointType;
    systemSymbol: string;
    x: number;
    y: number;
    orbitals: Orbital[];
    faction: Faction;
    traits: Trait[];
    chart?: Chart;
    orbits?: string;
    modifiers?: Modifier[];
    isUnderConstruction?: boolean;
}

export interface WaypointResponse {
    cooldown: Cooldown;
    waypoints: Waypoint[];
}