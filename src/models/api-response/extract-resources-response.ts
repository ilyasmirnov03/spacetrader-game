import { Cooldown } from "../cooldown.model";
import { Cargo } from "../ship.model";

interface Yield {
    symbol: string;
    units: number;
}

interface Extraction {
    shipSymbol: string;
    yield: Yield;
}

export interface ExtractResourcesResponse {
    cooldown: Cooldown;
    extraction: Extraction;
    cargo: Cargo;
}