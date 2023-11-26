import * as Mui from '@mui/material';
import React from 'react';

export class TripSearchResult {
    tripId: number | null = null;
    trainId: number | null = null;
    departure: Date | null = null;
    startingStationName: string | null = null;
    endingStationName: string | null = null;
    pricePerSeat: number | null = null;
    minutes: number | null = null;
    availableSeats: number | null = null;    
}

export class TripSearchFilter {
    departure?: Date | null;
    startStationId?: number | null;
    endStationId?: number | null;
}

export class TripGridProps {
    trips: TripSearchResult[] | null = null;
  }

export const TripGrid: React.FC<TripGridProps> = ({ trips }) => {

    return (
    <Mui.TableContainer component={Mui.Paper}>
      <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Mui.TableHead>
          <Mui.TableRow>
            <Mui.TableCell>Leave</Mui.TableCell>
            <Mui.TableCell>Arrive</Mui.TableCell>
            <Mui.TableCell>Arrive</Mui.TableCell>
            <Mui.TableCell>Arrive</Mui.TableCell>
            <Mui.TableCell>Arrive</Mui.TableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {trips?.map((trip) => (
            <Mui.TableRow
              key={trip.tripId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <Mui.TableCell component="th" scope="row">
                {trip.startingStationName}
              </Mui.TableCell>
              <Mui.TableCell component="th" scope="row">
                {trip.endingStationName}
              </Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>);

}