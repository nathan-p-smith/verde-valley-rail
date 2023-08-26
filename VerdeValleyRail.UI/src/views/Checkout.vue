<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, computed } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import CustomerName from '../components/CustomerName.vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import shoppingCartService from '../services/ShoppingCartService';
import InvoiceItem from '../components/InvoiceItem.vue';

var route = useRoute();
var router = useRouter();

var loaded = ref(false);

var selectedSeats = ref([]);

var invoice = ref({});

var cart = ref([]);



async function getInvoice(){

    var bookingCreates = shoppingCartService.getCart();

    invoice.value = (await api.previewInvoice(bookingCreates)).data;

}

async function pay(){
    var result = (await api.payInvoice(invoice.value)).data;

    if(result){
        alert("success");

        shoppingCartService.emptyCart();
    }
}

getInvoice();


</script>

<template>
    <div>

        <div v-for="i in invoice.items">
            <InvoiceItem :item="i"></InvoiceItem>
        </div>

        <div>
            Tax: {{ formatCurrency(invoice.tax) }}            
        </div>
        <div>
            Total: {{ formatCurrency(invoice.grandTotal) }}
        </div>

        <Button @click="pay" >Book Trips</Button>

    </div>
</template>

