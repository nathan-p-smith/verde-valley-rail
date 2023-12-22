// FindTrip.js
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../services/Api';
import { TripGrid } from '../components/TripGird';
import { TripSearchResult } from '../types/TripSearchResult';
import { TripSearchFilter } from '../types/TripSearchFilter';
import StationSelect from '../components/StationSelect';
import { Trip } from '../types/Trip';
import SeatPicker from '../components/SeatPicker';
import { Seat } from '../types/Seat';
import { useAuth } from '../context/AuthContext';

const TripDetail = () => {

    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | null>();
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const { login } = useAuth();


    function handleLogin(){
        login();
    }

    if(!tripId)
        throw ("");
    

    useEffect(() => {

        const load = async () => {

            const tripResponse = await api.getTrip(parseInt(tripId, 10));

            setTrip(tripResponse.data);


        }

        load();

    }, []);  

    const onSelection = (seats: Seat[]) => {        
        setSelectedSeats(seats);
    };
    

  return (
    <div>
      
    TRIP { trip?.tripId }

    <div onClick={handleLogin}>Login</div>

    <div>
        { trip?.route.startStation.name } to { trip?.route.endStation.name }
    </div>

    <div>Total Selected Seats: {selectedSeats.length}</div>

    <div>
        {trip?.seats ? <SeatPicker key="seat_picker" seats={trip!.seats} selectedSeats={selectedSeats} onSelection={onSelection}></SeatPicker> : null}
    </div>

    </div>
  );
};

export default TripDetail;
