<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref } from 'vue';

var customer = ref({});

async function setCustomer(){

    try
    {
        var customerResponse = await api.getCustomer();
        Object.assign(customer.value, customerResponse.data);
    }
    catch
    {
        //Nothing to do.
    }    
}

setCustomer();


</script>

<template>
    <span>        
        {{ customer.firstName }} {{ customer.lastName }}        
    </span>
</template>

