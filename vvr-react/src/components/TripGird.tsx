import * as Mui from '@mui/material';
import React from 'react';
import { TripSearchResult } from '../types/TripSearchResult';
import TripDetailLink from './TripDetailLink';



 type TripGridProps = {
    trips: TripSearchResult[];
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
                <TripDetailLink tripId={trip.tripId}>{trip.startingStationName}</TripDetailLink>
              </Mui.TableCell>
              <Mui.TableCell component="th" scope="row">
                <TripDetailLink tripId={trip.tripId}>{trip.endingStationName}</TripDetailLink>
              </Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>);

}