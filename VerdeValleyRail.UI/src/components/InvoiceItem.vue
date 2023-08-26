<script setup>
import api from '../services/VerdeValleyRailApi';
import { ref, computed } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import { defineProps } from 'vue';


var props = defineProps({
    item: {
        type: Object,
        default: {}
    }
});

var trip = props.item.trip;
var route = props.item.trip.route;
var booking = props.item.booking;

</script>

<template>

<div class="mb-4">    
    <div>Departure: {{ formatDateTime(trip.departure) }}</div>
    <div>
        {{ route.startStation.name }} to {{ route.endStation.name }}
    </div>
    <div>
        {{ route.minutes }} minutes
    </div>
    <div>
        {{ booking.bookingSeats.length }} Seats at {{ formatCurrency(trip.pricePerSeat) }} per seat
    </div>    
    
    <div>
        Price: {{ formatCurrency(item.price) }}
    </div>    
</div>


</template>