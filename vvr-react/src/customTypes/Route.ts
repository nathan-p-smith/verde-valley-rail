import { Station } from './Station.ts';


export type Route = {
    routeId: number;
    minutes: number;
    endStation: Station;
    startStation: Station;
};
