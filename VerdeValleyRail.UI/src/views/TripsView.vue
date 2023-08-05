<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref } from 'vue';
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

var trips = ref([]);

var departure = ref(new Date())

var filter = ref({
    departure: new Date(),
    startingStationId: null,
    endingStationId: null
})

async function searchTrips() {
    trips.value = (await api.searchTrips(filter.value)).data;
}

searchTrips();

</script>

<template>
    <div>

        <Button label="Submit" />

        {{ filter.departure }}

        <Calendar v-model="filter.departure" @update:modelValue="searchTrips" />

        <DataTable :value="trips" tableStyle="min-width: 50rem">
            <Column field="departure" header="Date"></Column>
            <Column field="startingStationName" header="From"></Column>
            <Column field="endingStationName" header="To"></Column>
            <Column field="minutes" header="Duration"></Column>
            <Column field="pricePerSeat" header="Price"></Column>
            <Column field="availableSeats" header="Available Seats"></Column>
        </DataTable>
        
    </div>
</template>
