<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import InputText from 'primevue/inputtext';
import CustomerCreate from '../components/CustomerCreate.vue';

var trips = ref([]);

var filter = ref({
    departure: new Date(),
    startStationId: null,
    endStationId: null
})


</script>

<template>
    <div>

        
        <CustomerCreate></CustomerCreate>

        
    </div>
</template>

