<script setup>
import { defineProps } from 'vue';

var props = defineProps({
    v: Object,
    fieldName: String
});

</script>

<template>

    

<div class="input-errors" v-for="error of props.v[props.fieldName].$errors" :key="error.$uid">
    <div class="error-msg">{{ error.$message }}</div>
</div>


</template>