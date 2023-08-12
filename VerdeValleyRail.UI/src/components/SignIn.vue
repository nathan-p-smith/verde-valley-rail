<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, reactive, defineExpose, defineEmits, nextTick } from 'vue';
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

var authenticateRequest = reactive({
    email: null,
    password: null
});

var authenticationError = ref(null);

const { withAsync } = helpers;

const emit = defineEmits(['onAuthenticated'])

var rules = {                      
        email: { 
            required, 
            email,                        
        },
        password: { required }
    };

const $v = useVuelidate(rules, authenticateRequest)

async function onSubmit(){

    authenticationError.value = null;

    const validationResult = await $v.value.$validate(authenticateRequest);    
    
    if(!validationResult)
        return;
    
    try
    {
        var authenticateResult = await api.authenticate(authenticateRequest);
        emit('onAuthenticated', authenticateResult.data.jwt);

        return;
    }
    catch(ex)
    {
        console.log("authenticationError", authenticationError);

        if(ex.response.status == 401)
        {
            authenticationError.value = "The email or password you provided was incorrect.  Please try again.";
            return;
        }

        authenticationError.value = "An error has occurred.  Please try again later.";
    }
}

defineExpose({
  $v,
  authenticateRequest
})


</script>

<template>
    <div>

    <form @submit.prevent="onSubmit">        
        <div>
            <label for="username">Email</label> 
            <InputText type="text" v-model="authenticateRequest.email" />                             
            <ErrorMessage :v="$v" fieldName="email" label="Email"></ErrorMessage>
        </div>        
        <div>
            <label for="username">Password</label> 
            <InputText type="password" v-model="authenticateRequest.password" />
            <ErrorMessage :v="$v" fieldName="password"></ErrorMessage>
        </div>        
        <div v-if="authenticationError">
            {{ authenticationError }}
        </div>
        <Button @click="onSubmit" label="Sign In" />
    </form>
        

        
    </div>
</template>

