<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref } from 'vue';
import Button from 'primevue/button'
import { formatDateTime } from '../helpers/FormatDateTime';
import { formatCurrency } from '../helpers/FormatCurrency';
import InputText from 'primevue/inputtext';
import SignIn from '../components/SignIn.vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';


var trips = ref([]);

var route = useRoute();
var router = useRouter();

const continueRoute = route.query.continue;

const signUpRoute = `/Register?continue=${continueRoute}`;

function onAuthenticated(jwt){

    localStorage.setItem("vv-customer-jwt", jwt);

    if(continueRoute)
        router.push(continueRoute);   

}


</script>

<template>
    <div>
        <div>SIGN IN</div>
        {{ $route.query.continue }}
        <SignIn @onAuthenticated="onAuthenticated"></SignIn>

        <div>OR</div>

        <RouterLink :to="signUpRoute" :queryParams="{ continue: continueRoute }">Create Account</RouterLink>
        
    </div>
</template>

