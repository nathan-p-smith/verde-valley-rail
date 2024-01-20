import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm, { CheckoutFormSchema } from "../components/CheckoutForm";
import InvoiceItemDisplay from "../components/InvoiceItemDisplay/InvoiceItemDisplay";
import { useAuth } from "../context/AuthContext";
import { BookingCreate } from "../customTypes/BookingCreate";
import { Invoice } from "../customTypes/Invoice";
import api from "../services/Api";
import shoppingCartService from "../services/ShoppingCartService";
import { SubmitHandler } from "react-hook-form";

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

  const handleSubmit: SubmitHandler<CheckoutFormSchema> = async (formData) => {
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
