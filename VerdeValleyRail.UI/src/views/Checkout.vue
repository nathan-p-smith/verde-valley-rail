<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, computed } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import CustomerName from '../components/CustomerName.vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import shoppingCartService from '../services/ShoppingCartService';


var route = useRoute();
var router = useRouter();

var loaded = ref(false);

var selectedSeats = ref([]);

var invoice = ref({});

var cart = ref([]);



async function getInvoice(){

    var bookingCreates = shoppingCartService.getCart();

    invoice.value = await api.previewInvoice(bookingCreates);

}

getInvoice();


</script>

<template>
    <div>

        {{ invoice }}

        

    </div>
</template>

