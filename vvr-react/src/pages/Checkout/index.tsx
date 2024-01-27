import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm, {
  CheckoutFormSchema,
} from "../../components/CheckoutForm";
import InvoiceItemDisplay from "./InvoiceItemDisplay";
import { useAuth } from "../../context/AuthContext";
import { BookingCreate } from "../../customTypes/BookingCreate";
import { Invoice } from "../../customTypes/Invoice";
import api from "../../services/Api";
import shoppingCartService from "../../services/ShoppingCartService";
import { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [invoice, setInvoice] = useState<Invoice>();
  const { customer, setTotalCartItems } = useAuth();
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
    setTotalCartItems(shoppingCartService.getCart().length);
    loadInvoice();
  };

  const handleSubmit: SubmitHandler<CheckoutFormSchema> = async (formData) => {
    console.log("form data", formData);

    await api.payInvoice(invoice!);
    shoppingCartService.emptyCart();
    setTotalCartItems(0);

    navigateTo(`/bookings`);
  };

  return (
    <Box className="container">
      {invoice?.items?.length == 0 ? (
        <Box>
          <Typography mb={3}>There are no items in your cart!</Typography>
          <Button component={Link} variant="contained" to="/find-trip">
            Book A Trip
          </Button>
        </Box>
      ) : (
        <Grid className="container" container spacing={3}>
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

            <Button component={Link} variant="contained" to="/find-trip">
              Book Another Trip
            </Button>
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
      )}
    </Box>
  );
};

export default Checkout;
