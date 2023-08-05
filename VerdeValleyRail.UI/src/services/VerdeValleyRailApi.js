import axios from 'axios';

const vvrApi = axios.create({
    baseURL: '/api'
});

var api = {

    getBooking: async (guid) => {
        return vvrApi.get(`/Bookings/${guid}`);
    },

    createBooking: async (bookingCreate) => {
        return vvrApi.post(`/Bookings`, bookingCreate);
    },

    createCustomer: async (customerCreate) => {
        return vvrApi.post(`/Customers`, customerCreate);
    },

    customerEmailExists: async(email) => {
        return vvrApi.get(`/Customers/EmailExists`, { params: { email: email } });
    },

    getTrip: async (id) => {
        return vvrApi.get(`/Trips/${id}`);
    },

    searchTrips: async (filter) => {
        return vvrApi.get(`/Trips/Search`, { params: filter });
    }

}

export default api;