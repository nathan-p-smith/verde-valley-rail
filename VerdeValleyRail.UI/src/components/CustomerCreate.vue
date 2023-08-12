<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, reactive } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

//https://stackoverflow.com/questions/74648823/vue3-composition-api-vuevalidate

var customerCreate = reactive({
    firstName: null,
    lastName: null,
    email: '',
    phone: null,
    password: null,
    reenterPassword: null    
});



var rules = {              
        email: { required, email },
        password: { required, min: minLength(6) }              
    };

const v$ = useVuelidate(rules, customerCreate)

function onSubmit(){

}




</script>

<template>
    <div>

    <form @submit.prevent="onSubmit">
        <div>
            <label for="username">Your name</label> 
            <InputText type="text" v-model="customerCreate.firstName" placeholder="First" /> <InputText type="text" v-model="customerCreate.lastName" placeholder="Last" />
        </div>
        <div>
            <label for="username">Email</label> 
            <InputText type="text" v-model="customerCreate.email" />
            {{ v$.email.$errors }}
            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
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
        {{ v$.$invalid }}
        <Button :disabled="v$.$invalid" @click="onSubmit" label="Continue" />
    </form>
        

        
    </div>
</template>

