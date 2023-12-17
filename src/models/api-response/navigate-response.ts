import {FuelModel, Nav} from '../ship.model.ts';

export interface NavigateResponse {
    fuel: FuelModel;
    nav: Nav;
}