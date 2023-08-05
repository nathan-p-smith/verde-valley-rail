<script>
import api from '@/services/VerdeValleyRailApi';

var trip = await api.getTrip(111);
alert("trips");

</script>

<template>
  
    <div>This is the trips vue</div>
  
</template>
