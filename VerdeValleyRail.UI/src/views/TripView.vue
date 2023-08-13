<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, computed } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import CustomerName from '../components/CustomerName.vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import SeatPicker from '../components/SeatPicker.vue';
import shoppingCartService from '../services/ShoppingCartService';


var route = useRoute();
var router = useRouter();

var loaded = ref(false);

var availableSeats = ref(0);

var trip = ref({});

var selectedSeats = ref([]);

var cart = ref([]);

var tripInCart = ref(false);

var totalCost = computed(() => {

    if(!loaded.value)
        return 0;

    return selectedSeats.value.length * trip.value.pricePerSeat;
});


function upsertToCart(){
    
    var bookingCreate = {
        tripId: trip.value.tripId,
        bookingSeats: selectedSeats.value
    }    

    shoppingCartService.upsertToCart(bookingCreate);

    tripInCart.value = true;
}

function removeFromCart(){

    shoppingCartService.removeFromCart(trip.value.tripId);

    selectedSeats.value = [];
    tripInCart.value = false;


}

function onPickerClose(){
    
    if(tripInCart.value)
        upsertToCart();
}

async function setData(){

    trip.value = (await api.getTrip(route.params.tripId)).data;
    
    availableSeats.value = (trip.value.seats.filter((s) => { return !s.booked })).length;

    cart.value = shoppingCartService.getCart();

    console.log(cart.value);

    var previouslySavedTrip = cart.value.find((t) => { return t.tripId == trip.value.tripId });

    if(previouslySavedTrip){
        tripInCart.value = true;
        selectedSeats.value = previouslySavedTrip.bookingSeats;
    }

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
        
        <SeatPicker :seats="trip.seats" v-model="selectedSeats" @close="onPickerClose"></SeatPicker>

        <pre>



        </pre>

        <Button label="Add to Cart" v-show="selectedSeats.length > 0 && !tripInCart" icon="pi pi-external-link" @click="upsertToCart" />

        <Button label="Remove from Cart" v-show="tripInCart" icon="pi pi-external-link" @click="removeFromCart" />

    </div>
</template>

