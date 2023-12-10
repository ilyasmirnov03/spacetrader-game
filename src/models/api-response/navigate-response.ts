import {Fuel, Nav} from '../ship.model.ts';

export interface NavigateResponse {
    fuel: Fuel;
    nav: Nav;
}