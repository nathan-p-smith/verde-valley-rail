import { BookingCreate } from "./BookingCreate";
import { Trip } from "./Trip";

export type InvoiceItem = {
    trip: Trip;
    booking: BookingCreate;
    price: number;
  }