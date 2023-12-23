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
import * as Mui from "@mui/material";
import { useNavigate } from 'react-router-dom';
import cartService from '../services/ShoppingCartService';
import { Booking } from '../types/Booking';
import { BookingSeat } from '../types/BookingSeat';

const TripDetail = () => {

    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | null>();
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const { login, isLoggedIn } = useAuth();
    const navigateTo = useNavigate();
    

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

    useEffect(() => {        
        var booking = cartService.getCart().find(b => b.tripId == parseInt(tripId, 10));

        if(booking){                                
            setSelectedSeats(trip?.seats.filter(s => booking?.bookingSeats.some(b => b.carId == s.carId && b.seatId == s.seatId)) ?? [])
        }
    }, [trip]);

    const onSelection = (seats: Seat[]) => {        
        setSelectedSeats(seats);
    };

    function handleBookTrip(){

        var booking = {
            tripId: parseInt(tripId!),
            bookingSeats: selectedSeats.map((s) => { return { carId: s.carId, seatId: s.seatId } })
        };        

        cartService.upsertToCart(booking);

        if(isLoggedIn){
            navigateTo("/checkout");
            return;
        }
            
        navigateTo(`/login?then=${encodeURIComponent("/checkout")}`);
    }
    

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

        {selectedSeats.length > 0 ? <Mui.Button onClick={handleBookTrip}>Book Trip</Mui.Button> : null }

    </div>
  );
};

export default TripDetail;
