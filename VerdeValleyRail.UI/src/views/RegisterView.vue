<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';

var trips = ref([]);

var filter = ref({
    departure: new Date(),
    startStationId: null,
    endStationId: null
})


</script>

<template>
    <div>

        
        You need to register!.

        
    </div>
</template>

