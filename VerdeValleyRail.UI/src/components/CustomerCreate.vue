<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, reactive, defineExpose, defineEmits } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import ErrorMessage from '../components/ErrorMessage.vue';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { helpers } from '@vuelidate/validators'

//https://stackoverflow.com/questions/74648823/vue3-composition-api-vuevalidate

var customerCreate = reactive({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    password: null,
    confirmPassword: null    
});

const { withAsync } = helpers;

const emit = defineEmits(['onCustomerCreated'])

var rules = {              
        firstName: { required },
        lastName: { required },
        email: { 
            required, 
            email,            
            isUnique: helpers.withMessage("This email is already in use.", 
                withAsync(async (value) => {

                    if(!value)
                        return true;

                    const resp = await api.customerEmailExists(value);
                    return !resp.data;                
                })),
        },
        password: { required, min: minLength(6) },
        confirmPassword: { required }
    };

const $v = useVuelidate(rules, customerCreate)

async function onSubmit(){

    const validationResult = await $v.value.$validate();
    
    if(!validationResult)
        return;
    
    var customerResult = await api.createCustomer(customerCreate);

    localStorage.setItem("vv-customer-jwt", customerResult.data.jwt);

    emit('onCustomerCreated', customerResult.data.jwt);
}

defineExpose({
  $v,
  customerCreate
})


</script>

<template>
    <div>

    <form @submit.prevent="onSubmit">
        <div>
            <label for="username">Your name</label> 
            <InputText type="text" v-model="customerCreate.firstName" placeholder="First" /> <InputText type="text" v-model="customerCreate.lastName" placeholder="Last" />
        </div>
        <div>
            <ErrorMessage :v="$v" fieldName="firstName" label="First name"></ErrorMessage>
            <ErrorMessage :v="$v" fieldName="lastName" label="Last name"></ErrorMessage>
        </div>
        <div>
            <label for="username">Email</label> 
            <InputText type="text" v-model="customerCreate.email" />                             
            <ErrorMessage :v="$v" fieldName="email" label="Email"></ErrorMessage>
        </div>
        <div>
            <label for="username">Phone (optional) {{ customerCreate.phone }}</label>             
            <InputMask v-model="customerCreate.phone" mask="(999) 999-9999" />
        </div>
        <div>
            <label for="username">Password</label> 
            <InputText type="password" v-model="customerCreate.password" placeholder="At least 6 characters" />
            <ErrorMessage :v="$v" fieldName="password"></ErrorMessage>
        </div>
        <div>
            <label for="username">Re-enter password</label> 
            <InputText type="password" v-model="customerCreate.confirmPassword" />
            <ErrorMessage :v="$v" fieldName="confirmPassword"></ErrorMessage>
        </div>        


        <Button @click="onSubmit" label="Continue" />
    </form>
        

        
    </div>
</template>

