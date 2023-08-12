<script setup>
import { defineProps } from 'vue';

var props = defineProps({
    v: Object,
    fieldName: String,
    label: String
});

function applyLabel(message){

    if(!message || !props.label)
        return message;

    message = message.replaceAll("value", props.label);
    message = message.replaceAll("Value", props.label);

    return message;
}

</script>

<template>

    

<div class="input-errors" v-for="error of props.v[props.fieldName].$errors" :key="error.$uid">
    <div class="error-msg">{{ applyLabel(error.$message) }}</div>
</div>


</template>