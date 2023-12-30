import { useEffect, useState } from "react"
import { Booking } from "../types/Booking"
import { Trip } from "../types/Trip";
import api from "../services/Api";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from './ConfirmationDialog';
import { InvoiceItem } from "../types/InvoiceItem";
import { BookingCreate } from "../types/BookingCreate";

type InvoiceItemDisplayProps = {
    item: InvoiceItem,
    onDelete: (booking: BookingCreate) => void
}

export default function InvoiceItemDisplay({ item, onDelete }:InvoiceItemDisplayProps) {

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);

    const showConfirmationDialog = () => {
        setConfirmDeleteVisible(true);        
    }

    const handleDelete = () => {
        onDelete(item.booking);
    }

    const handleCancelDelete = () => {
        setConfirmDeleteVisible(false);
    }

    const getTripDescription = () => {
        return `${item.trip?.route.startStation.name} to ${item.trip?.route.endStation.name}`;
    }

    useEffect(() => {


        

    }, []);

    return (
        <div>
            <div>
                {getTripDescription()}
            </div>
            <div>
                Total Seats: {item.booking.bookingSeats?.length}
            </div>
            <div>
                <Link to={`/trip-detail/${item.trip.tripId}`}>Edit</Link>
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