import { useEffect, useState } from "react";
import api from "../services/Api";
import { Booking } from "../types/Booking";
import BookingDisplay from '../components/BookingDisplay';

const Bookings = () => {

    const [bookings, setBookings] = useState<Booking[]>([]);

    const loadBookings = async () => {

        var bookingsResponse = await api.getCustomerBookings();
        setBookings(bookingsResponse.data);
        
    };

    useEffect(() => {

        loadBookings();

    }, []);

    return (
        <div>

            <h1>My Bookings</h1>

            <p>Thanks for booking your travels with Verde Valley Rail.  Here are your upcoming trips!</p>
            
            {bookings.length > 0 ? bookings?.map(b => <BookingDisplay booking={b}></BookingDisplay>) : null}
        </div>
    )
}

export default Bookings;