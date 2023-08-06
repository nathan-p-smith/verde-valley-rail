<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref } from 'vue';
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown';
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';

var trips = ref([]);

var departure = ref(new Date())

var filter = ref({
    departure: new Date(),
    startStationId: null,
    endStationId: null
})

var stationOptions = ref([]);

function onTripSelected(trip){
    console.log(trip.data);
}

async function searchTrips() {
    trips.value = (await api.searchTrips(filter.value)).data;    
}

async function setStationOptions(){
    stationOptions.value = (await api.listStationOptions()).data;
}



setStationOptions();

searchTrips();

var testDate = new Date();

</script>

<template>
    <div>

        

        <Calendar v-model="filter.departure" @update:modelValue="searchTrips" />


        <Dropdown v-model="filter.startStationId" 
            :options="stationOptions" 
            @change="searchTrips"
            optionLabel="name" 
            option-value="stationId" 
            placeholder="Select Starting City"             
            class="w-full md:w-14rem" />

        <Dropdown v-model="filter.endStationId" 
            :options="stationOptions" 
            @change="searchTrips"
            optionLabel="name" 
            option-value="stationId" 
            placeholder="Select Destination" 
            class="w-full md:w-14rem" />

        <DataTable v-if="trips.length > 0" :value="trips" tableStyle="min-width: 50rem" data-key="tripId" @row-click="onTripSelected">            
            <Column field="departure" header="Departs">
                <template #body="slotProps">{{formatDateTime(slotProps.data.departure) }}</template>
            </Column>
            <Column field="startingStationName" header="From"></Column>
            <Column field="endingStationName" header="To"></Column>
            <Column field="minutes" header="Duration" header-class="header-center" class="text-center"></Column>            
            <Column field="pricePerSeat" header="Price" header-class="header-center" class="text-center">
                <template #body="slotProps">{{formatCurrency(slotProps.data.pricePerSeat) }}</template>
            </Column>
            <Column field="availableSeats" header="Available Seats"  header-class="header-center" class="text-center"></Column>
        </DataTable>
        <div v-else>
            There are no available trains for the selected day or route.
        </div>
        
    </div>
</template>

