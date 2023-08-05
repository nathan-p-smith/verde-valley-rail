<script setup>
import api from '@/services/VerdeValleyRailApi';
import { ref } from 'vue';




var trips = ref([]);

async function searchTrips() {
    trips.value = (await api.searchTrips(null)).data;
}

searchTrips();

</script>

<template>
    <div>
        
            
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Departure
                        </th>
                        <th class="text-left">
                            From
                        </th>
                        <th class="text-left">
                            To
                        </th>
                        <th class="text-center">
                            Minutes
                        </th>
                        <th class="text-center">
                            Price
                        </th>
                        <th class="text-center">
                            Available Seats
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="trip in trips" :key="trip.tripId">
                        <td class="text-left">{{ trip.departure }}</td>
                        <td class="text-left">{{ trip.startingStationName }}</td>
                        <td class="text-left">{{ trip.endingStationName }}</td>
                        <td class="text-center">{{ trip.minutes }}</td>
                        <td class="text-center">{{ trip.pricePerSeat }}</td>
                        <td class="text-center">{{ trip.availableSeats }}</td>
                    </tr>
                </tbody>
            </v-table>
        
    </div>
</template>
