import { BookingSeat } from "./BookingSeat";

export type BookingCreate = {
    tripId: number;    
    bookingSeats?: BookingSeat[];
  }