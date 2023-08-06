<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref } from 'vue';
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';

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

var testDate = new Date();

</script>

<template>
    <div>

        <Button label="Submit" />

        {{ filter.departure }}

        TEST: {{ formatDateTime(testDate) }}

        <Calendar v-model="filter.departure" @update:modelValue="searchTrips" />

        <DataTable :value="trips" tableStyle="min-width: 50rem">            
            <Column field="departure" header="Departs">
                <template #body="slotProps">{{formatDateTime(slotProps.data.departure) }}</template>
            </Column>
            <Column field="startingStationName" header="From"></Column>
            <Column field="endingStationName" header="To"></Column>
            <Column field="minutes" header="Duration" style="text-align: center;"></Column>            
            <Column field="pricePerSeat" header="Price" style="text-align: center;">
                <template #body="slotProps">{{formatCurrency(slotProps.data.pricePerSeat) }}</template>
            </Column>
            <Column field="availableSeats" header="Available Seats" style="text-align: center;"></Column>
        </DataTable>
        
    </div>
</template>
