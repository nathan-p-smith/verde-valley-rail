import axios from "axios";
import { StationOption } from "../types/StationOption";
import { TripSearchFilter } from "../types/TripSearchFilter";
import { TripSearchResult } from "../types/TripSearchResult";
import { Trip } from "../types/Trip";
import { AuthenticateRequest } from "../types/AuthenticateRequest";
import { Customer } from "../types/Customer";
import { CustomerCreate } from "../types/CustomerCreate";
import { parseISO } from "date-fns";
import { BookingCreate } from "../types/BookingCreate";
import { Invoice } from "../types/Invoice";
import { Booking } from "../types/Booking";

const vvrApi = axios.create({
  baseURL: "/api",
});

vvrApi.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("vv-customer-jwt");

  if (jwt) config.headers.Authorization = jwt;

  return config;
});

var api = {
  authenticate: async (login: AuthenticateRequest) => {
    return vvrApi.post<string>(`/Authentication`, login);
  },

  // getBooking: async (guid) => {
  //     return vvrApi.get(`/Bookings/${guid}`);
  // },

  getCustomerBookings: async () => {
    return vvrApi.get<Booking[]>(`/Bookings/CustomerBookings`);
  },

  // createBooking: async (bookingCreate) => {
  //     return vvrApi.post(`/Bookings`, bookingCreate);
  // },

  getCustomer: async () => {
    return vvrApi.get<Customer>(`/Customers`);
  },

  createCustomer: async (customerCreate: CustomerCreate) => {
    return vvrApi.post<string>(`/Customers`, customerCreate);
  },

  customerEmailExists: async (email: string) => {
    return vvrApi.get<boolean>(`/Customers/EmailExists`, {
      params: { email: email },
    });
  },

  previewInvoice: async (bookingCreates: BookingCreate[]) => {
    return vvrApi.post<Invoice>(`Invoice/Preview`, bookingCreates);
  },

  payInvoice: async (invoice: Invoice) => {
    return vvrApi.post<Invoice>(`Invoice/Pay`, invoice);
  },

  listStationOptions: async () => {
    return vvrApi.get<StationOption[]>(`/Stations/Options`);
  },

  getTrip: async (id: number, includeSeates?: boolean) => {
    return vvrApi.get<Trip>(`/Trips/${id}`, { params: { includeSeates } });
  },

  searchTrips: async (
    filter: TripSearchFilter
  ): Promise<TripSearchResult[]> => {
    var results = (await vvrApi.get(`/Trips/Search`, { params: filter })).data;
    return results.map((r: any): TripSearchResult[] => ({
      ...r,
      departure: parseISO(r.departure),
    }));
  },
};

export default api;
