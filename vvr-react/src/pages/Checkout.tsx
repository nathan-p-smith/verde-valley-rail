import { useEffect, useState } from "react";
import shoppingCartService from "../services/ShoppingCartService";
import { Booking } from "../types/Booking";
import CheckoutBooking from "../components/CheckoutBooking";
import { Grid, Paper, Typography } from "@mui/material";
import CheckoutForm, { CheckoutFormProps } from "../components/CheckoutForm";
import { useAuth } from "../context/AuthContext";
import { Invoice } from "../types/Invoice";
import api from "../services/Api";
import { InvoiceItem } from "../types/InvoiceItem";
import InvoiceItemDisplay from "../components/InvoiceItemDisplay";
import { BookingCreate } from "../types/BookingCreate";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [invoice, setInvoice] = useState<Invoice>();
  const { customer } = useAuth();
  const navigateTo = useNavigate();

  const loadInvoice = async () => {
    var cartBookings = shoppingCartService.getCart();
    var invoiceResponse = await api.previewInvoice(cartBookings);

    setInvoice(invoiceResponse.data);
  };

  useEffect(() => {
    loadInvoice();
  }, []);

  const handleDelete = (booking: BookingCreate) => {
    shoppingCartService.removeFromCart(booking.tripId);
    loadInvoice();
  };

  const handleSubmit = async (formData: CheckoutFormProps) => {
    console.log("form data", formData);

    await api.payInvoice(invoice!);
    shoppingCartService.emptyCart();

    navigateTo(`/bookings`);
  };

  return (
    <div>
      {invoice?.items?.length == 0 ? (
        <div>There are no items in your cart!</div>
      ) : null}

      <Grid container spacing={3}>
        {/* First column */}
        <Grid item xs={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h5">Cart</Typography>
            {invoice?.items?.map((i) => (
              <InvoiceItemDisplay
                item={i}
                onDelete={handleDelete}
              ></InvoiceItemDisplay>
            ))}
          </Paper>
        </Grid>

        {/* Second column */}
        <Grid item xs={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h5">My Info</Typography>

            {customer ? (
              <CheckoutForm
                customer={customer}
                onSubmit={handleSubmit}
              ></CheckoutForm>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
