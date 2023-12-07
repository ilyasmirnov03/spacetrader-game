interface Route {
    symbol: string;
    type: string;
    systemSymbol: string;
    x: number;
    y: number;
}

interface NavRoute {
    departure: Route;
    origin: Route;
    destination: Route;
    arrival: string;
    departureTime: string;
}

interface Nav {
    systemSymbol: string;
    waypointSymbol: string;
    route: NavRoute;
    status: string;
    flightMode: string;
}

interface Crew {
    current: number;
    capacity: number;
    required: number;
    rotation: string;
    morale: number;
    wages: number;
}

interface FuelConsumed {
    amount: number;
    timestamp: string;
}

interface Fuel {
    current: number;
    capacity: number;
    consumed: FuelConsumed;
}

interface Cooldown {
    shipSymbol: string;
    totalSeconds: number;
    remainingSeconds: number;
}

interface Requirements {
    crew: number;
    power: number;
    slots?: number;
}

interface Module {
    symbol: string;
    name: string;
    description: string;
    capacity?: number;
    requirements: Requirements;
}

interface Mount {
    symbol: string;
    name: string;
    description: string;
    strength: number;
    deposits?: string[];
    requirements: Requirements;
}

interface Registration {
    name: string;
    factionSymbol: string;
    role: string;
}

interface Cargo {
    capacity: number;
    units: number;
    inventory: unknown[];
}

interface Frame {
    symbol: string;
    name: string;
    description: string;
    moduleSlots: number;
    mountingPoints: number;
    fuelCapacity: number;
    condition: number;
    requirements: Requirements;
}

interface Reactor {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    powerOutput: number;
    requirements: Requirements;
}

interface Engine {
    symbol: string;
    name: string;
    description: string;
    condition: number;
    speed: number;
    requirements: Requirements;
}

export interface ShipModel {
    symbol: string;
    nav: Nav;
    crew: Crew;
    fuel: Fuel;
    cooldown: Cooldown;
    frame: Frame;
    reactor: Reactor;
    engine: Engine;
    modules: Module[];
    mounts: Mount[];
    registration: Registration;
    cargo: Cargo;
}
