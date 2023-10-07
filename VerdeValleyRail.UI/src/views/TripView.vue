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

        

        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md">
                        <div class="mb-2">
                            <label class="fw-bolder">Departure:</label>  {{ formatDateTime(trip.departure) }}
                        </div>
                        <div class="mb-2">
                            <label class="fw-bolder">Route:</label>  {{ trip.route.startStation.name }} <i class="bi bi-arrow-right"></i> {{ trip.route.endStation.name }}
                        </div>
                        <div class="mb-2">
                            <span class="fw-bolder">{{ selectedSeats.length }}</span> Seats Selected
                        </div>                        
                        <SeatPicker :seats="trip.seats" v-model="selectedSeats" @close="onPickerClose"></SeatPicker>
                        <div v-show="totalCost > 0">
                            <div class="fs-3 mb-2">
                                Total: {{ formatCurrency(totalCost) }}
                            </div>
                            <button type="button" class="btn btn-primary btn-sm" v-show="selectedSeats.length > 0 && !tripInCart" icon="pi pi-external-link" @click="upsertToCart"><i class="bi bi-cart-plus"></i>  Add to Cart</button>
                            <button type="button" class="btn btn-primary btn-sm" v-show="tripInCart" icon="pi pi-external-link" @click="removeFromCart"><i class="bi bi-cart-dash"></i>  Remove from Cart</button>
                        </div>
                    </div>
                    <div class="col-md text-center">
                        <div class="stat-block align-middle fs-1">
                            <i class="bi bi-stopwatch"></i> {{ trip.route.minutes }} <sup>min</sup>
                        </div>
                    </div>
                    <div class="col-md text-center">
                        <div class="stat-block">
                            <div class="fs-1">
                                {{ formatCurrency(trip.pricePerSeat) }} <sup>per seat</sup>
                            </div>                        
                            <div>{{ availableSeats }} left</div>
                        </div>
                    </div>
                </div>


                
            </div>
        </div>

        
        
        

        

    </div>
</template>

<style scoped lang="scss">

    .stat-block{

        $height: 200px;

        border-radius: var(--bs-border-radius);
        background-color: rgb(233, 233, 233);
        color: #5f5f5f;        
        height: $height;
        padding-top: $height / 2 - 40px;

        sup{
            font-size: .5em;
            font-style: italic;
        }
        
    }


</style>

