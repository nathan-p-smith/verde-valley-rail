<script setup>
import api from '@/services/VerdeValleyRailApi';

var trip = await api.getTrip(111);

console.log(trip);

import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
