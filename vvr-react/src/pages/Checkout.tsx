import { useEffect, useState } from "react";
import shoppingCartService from "../services/ShoppingCartService";
import { Booking } from "../customTypes/Booking";
import CheckoutBooking from "../components/CheckoutBooking";
import { Grid, Paper, Typography } from "@mui/material";
import CheckoutForm, { CheckoutFormProps } from "../components/CheckoutForm";
import { useAuth } from "../context/AuthContext";
import { Invoice } from "../customTypes/Invoice";
import api from "../services/Api";
import { InvoiceItem } from "../customTypes/InvoiceItem";
import InvoiceItemDisplay from "../components/InvoiceItemDisplay/InvoiceItemDisplay";
import { BookingCreate } from "../customTypes/BookingCreate";
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
        <Grid item xs={12} md={6}>
          <Typography variant="h1" className="page-header">
            My Cart
          </Typography>
          {invoice?.items?.map((i) => (
            <InvoiceItemDisplay
              item={i}
              onDelete={handleDelete}
            ></InvoiceItemDisplay>
          ))}
        </Grid>

        {/* Second column */}
        <Grid item xs={12} md={6}>
          <Typography variant="h1" className="page-header">
            Payment Info
          </Typography>

          {customer ? (
            <CheckoutForm
              customer={customer}
              onSubmit={handleSubmit}
            ></CheckoutForm>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
