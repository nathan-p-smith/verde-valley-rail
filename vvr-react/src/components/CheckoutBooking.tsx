import { useEffect, useState } from "react"
import { Booking } from "../types/Booking"
import { Trip } from "../types/Trip";
import api from "../services/Api";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from './ConfirmationDialog';

type CheckoutBookingProps = {
    booking: Booking,
    onDelete: (booking: Booking) => void
}

export default function CheckoutBooking({ booking, onDelete }:CheckoutBookingProps) {

    const [trip, setTrip] = useState<Trip>();
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);

    const loadData = async () => {

        var resp = await api.getTrip(booking.tripId, false);
        setTrip(resp.data);

    }

    const showConfirmationDialog = () => {
        setConfirmDeleteVisible(true);        
    }

    const handleDelete = () => {
        onDelete(booking);
    }

    const handleCancelDelete = () => {
        setConfirmDeleteVisible(false);
    }

    const getTripDescription = () => {
        return `${trip?.route.startStation.name} to ${trip?.route.endStation.name}`;
    }

    useEffect(() => {

        loadData();        
        

    }, []);

    return (
        <div>
            <div>
                {getTripDescription()}
            </div>
            <div>
                Total Seats: {booking.bookingSeats.length}
            </div>
            <div>
                <Link to={`/trip-detail/${booking.tripId}`}>Edit</Link>
            </div>
            <div>
                <DeleteIcon  onClick={showConfirmationDialog}></DeleteIcon>
            </div>
            <ConfirmationDialog open={confirmDeleteVisible} 
                onConfirm={handleDelete} 
                onClose={handleCancelDelete}
                title="Delete Trip?"
                text={`Are you sure you want to delete your trip from ${getTripDescription()}?`}
                confirmText="Delete"
                cancelText="Cancel"></ConfirmationDialog>
        </div>
    )
}