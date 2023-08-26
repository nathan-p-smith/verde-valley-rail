import axios from 'axios';

const vvrApi = axios.create({
    baseURL: '/api'
});

vvrApi.interceptors.request.use((config) => {
    
    const jwt = localStorage.getItem("vv-customer-jwt");

    if (jwt)
        config.headers.Authorization = jwt;

    return config;
});


var api = {

    authenticate: async (authenticateRequest) => {
        return vvrApi.post(`/Authentication`, authenticateRequest);
    },

    getBooking: async (guid) => {
        return vvrApi.get(`/Bookings/${guid}`);
    },

    createBooking: async (bookingCreate) => {
        return vvrApi.post(`/Bookings`, bookingCreate);
    },

    getCustomer: async () => {
        return vvrApi.get(`/Customers`);
    },

    createCustomer: async (customerCreate) => {
        return vvrApi.post(`/Customers`, customerCreate);
    },

    customerEmailExists: async(email) => {
        return vvrApi.get(`/Customers/EmailExists`, { params: { email: email } });
    },

    previewInvoice: async(bookingCreates) => {
        return vvrApi.post(`Invoice/Preview`, bookingCreates);
    },

    payInvoice: async(invoice) => {
        return vvrApi.post(`Invoice/Pay`, invoice);
    },

    listStationOptions: async() => {
        return vvrApi.get(`/Stations/Options`);
    },

    getTrip: async (id) => {
        return vvrApi.get(`/Trips/${id}`);
    },

    searchTrips: async (filter) => {
        return vvrApi.get(`/Trips/Search`, { params: filter });
    }

}

export default api;