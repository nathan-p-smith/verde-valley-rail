import * as Mui from "@mui/material";
import React from "react";
import { TripSearchResult } from "../customTypes/TripSearchResult";
import TripDetailLink from "./TripDetailLink";
import { format } from "date-fns";
import formatDuration from "../helpers/FormatDuration";

type TripGridProps = {
  trips: TripSearchResult[];
};

export const TripGrid: React.FC<TripGridProps> = ({ trips }) => {
  return (
    <Mui.TableContainer component={Mui.Paper}>
      <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Mui.TableHead>
          <Mui.TableRow>
            <Mui.TableCell>From</Mui.TableCell>
            <Mui.TableCell>To</Mui.TableCell>
            <Mui.TableCell>Departure</Mui.TableCell>
            <Mui.TableCell>Travel Time</Mui.TableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {trips?.map((trip) => (
            <Mui.TableRow
              key={trip.tripId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <Mui.TableCell component="th" scope="row">
                <TripDetailLink tripId={trip.tripId}>
                  {trip.startingStationName}
                </TripDetailLink>
              </Mui.TableCell>
              <Mui.TableCell component="th" scope="row">
                <TripDetailLink tripId={trip.tripId}>
                  {trip.endingStationName}
                </TripDetailLink>
              </Mui.TableCell>
              <Mui.TableCell component="th" scope="row">
                {format(trip.departure, "h:mm aa")}
              </Mui.TableCell>
              <Mui.TableCell component="th" scope="row">
                {formatDuration(trip.minutes)}
              </Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>
  );
};
