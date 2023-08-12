<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';

var customerCreate = ref({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    password: null,
    reenterPassword: null    
});

var filter = ref({
    departure: new Date(),
    startStationId: null,
    endStationId: null
})


</script>

<template>
    <div>

        <div>
            <label for="username">Your name</label> 
            <InputText type="text" v-model="customerCreate.firstName" placeholder="First" /> <InputText type="text" v-model="customerCreate.lastName" placeholder="Last" />
        </div>
        <div>
            <label for="username">Email</label> 
            <InputText type="text" v-model="customerCreate.email" />
        </div>
        <div>
            <label for="username">Phone (optional) {{ customerCreate.phone }}</label>             
            <InputMask v-model="customerCreate.phone" mask="(999) 999-9999" />
        </div>
        <div>
            <label for="username">Password</label> 
            <InputText type="password" v-model="customerCreate.password" placeholder="At least 6 characters" />
        </div>
        <div>
            <label for="username">Re-enter password</label> 
            <InputText type="password" v-model="customerCreate.reenterPassword" />
        </div>
        
        <Button label="Continue" />
        

        
    </div>
</template>

