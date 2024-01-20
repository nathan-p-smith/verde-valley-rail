import { Dayjs } from "dayjs";

export type TripSearchFilter = {
  departure: Dayjs | null;
  startStationId: number | null;
  endStationId: number | null;
};
