import { useEffect, useState } from "react"
import { Booking } from "../types/Booking"
import { Trip } from "../types/Trip";
import api from "../services/Api";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from './ConfirmationDialog';
import { format } from 'date-fns';

type BookingDisplayProps = {
    booking: Booking
}

export default function CheckoutBooking({ booking }:BookingDisplayProps) {

    const getTripDescription = () => {
        return `${booking.trip.route.startStation.name} to ${booking.trip.route.endStation.name}`;
    }

    return (
        <div>
            <div>
                {getTripDescription()}
            </div>
            <div>
                Departure: {format(new Date(booking.trip.departure), "MM/dd/yyyy h:mm aa")}
            </div>
            <div>
                Total Seats: {booking.bookingSeats.length}
            </div>      
            <hr></hr>      
        </div>
    )
}