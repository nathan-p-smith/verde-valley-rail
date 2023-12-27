import { useEffect, useState } from "react";
import shoppingCartService from "../services/ShoppingCartService";
import { Booking } from "../types/Booking";
import CheckoutBooking from "../components/CheckoutBooking";
import { Grid, Paper, Typography } from '@mui/material';
import CheckoutForm, { CheckoutFormProps } from "../components/CheckoutForm";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const { customer } = useAuth();

    useEffect(() => {

        var cartBookings = shoppingCartService.getCart();
        setBookings(cartBookings);

        console.log(cartBookings);

    }, []);

    const handleDelete = (booking: Booking) => {
        var newBookings = shoppingCartService.removeFromCart(booking.tripId);
        setBookings(newBookings);
    };

    const handleSubmit = (formData:CheckoutFormProps) => {
      console.log("form data", formData);
    }

    return (

        <div>
            {bookings.length == 0 ? <div>There are no items in your cart!</div> : null }

            


    <Grid container spacing={3}>
      {/* First column */}
      <Grid item xs={6}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h5">Cart</Typography>
          {
                bookings.map(b => (<CheckoutBooking booking={b} onDelete={handleDelete}></CheckoutBooking>))
        } 
        </Paper>
      </Grid>

      {/* Second column */}
      <Grid item xs={6}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h5">My Info</Typography>
          

          {customer ? <CheckoutForm customer={customer} onSubmit={handleSubmit}></CheckoutForm> : null }

        </Paper>
      </Grid>
    </Grid>

        </div>
    )

}

export default Checkout;