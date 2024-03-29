import { expect, test } from 'vitest';
import { getReadableDate } from '../../src/utils/getReadableDate';
// import { getArrivalTime } from '../../src/utils/ship/getArrivalTime';
import { getDistanceToWaypoint } from '../../src/utils/ship/getDistanceToWaypoint'
import { Ship } from '../mock-data/ship';
import { WaypointObject } from '../mock-data/waypoint';

test('Get readable date from 2003-03-30 should equal 30/03 00:00:00', () => {
    expect(getReadableDate(new Date("2003-03-30"), true)).toBe('30/03 00:00:00');
});

// TODO: create proper test
// test('Get arrival time of mock ship in proper format', () => {
//     expect(getArrivalTime(Ship.nav, Ship.engine.speed, WaypointObject)).toBe('12/12 17:48:00');
// });

test('Get distance from ship to waypoint', () => {
    expect(Math.round(getDistanceToWaypoint(Ship.nav, WaypointObject))).toBe(7);
});