<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, computed } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import CustomerName from '../components/CustomerName.vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import SeatPicker from '../components/SeatPicker.vue';


var route = useRoute();
var router = useRouter();

var loaded = ref(false);

var availableSeats = ref(0);

var trip = ref({});

var selectedSeats = ref([]);

var totalCost = computed(() => {

    if(!loaded.value)
        return 0;

    return selectedSeats.value.length * trip.value.pricePerSeat;
});



async function setData(){

    trip.value = (await api.getTrip(route.params.tripId)).data;
    
    availableSeats.value = (trip.value.seats.filter((s) => { return !s.booked })).length;

    loaded.value = true;
}

setData();


</script>

<template>
    <div v-if="loaded">

        

        Hello <CustomerName></CustomerName>

        <div>Departure: {{ formatDateTime(trip.departure) }}</div>
        <div>
            {{ trip.route.startStation.name }} to {{ trip.route.endStation.name }}
        </div>
        <div>
            {{ trip.route.minutes }} minutes
        </div>
        <div>
            {{ formatCurrency(trip.pricePerSeat) }} per seat
        </div>
        <div>
            {{ availableSeats }} available seats
        </div>
        <div>
            {{ selectedSeats.length }} Seats Selected
        </div>
        <div>
            Total: {{ formatCurrency(totalCost) }}
        </div>
        
        <SeatPicker :seats="trip.seats" v-model="selectedSeats"></SeatPicker>

    </div>
</template>

