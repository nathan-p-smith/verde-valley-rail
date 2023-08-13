<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, defineProps, defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

var props = defineProps({
    seats: Object, 
    modelValue: {
        type: Array,
        default: []
    }
})

var emit = defineEmits(['update:modelValue'])

var seats = props.seats;

var selectedSeats = ref([...(props.modelValue)]);

var dialogVisible = ref(false);

var cars = {};

var carIds = [...new Set(seats.map(s => s.carId))];    

function getCarSeats(carId)
{
    return seats.filter((s) => { return s.carId == carId; });
}

function getRows(seats){
    return [...new Set(seats.map(s => s.row))]
        .sort((a, b) => { return a.row < b.row; });    
}

function getRowSeats(row, seats){
    return seats.filter((s) => { return s.row == row; })
        .sort((a, b) => { return a.position.localeCompare(b.position); });
}

function onSeatSelected(seatId){

    var indexOfSeat = selectedSeats.value.indexOf(seatId);

    var seat = seats.find((s) => s.seatId == seatId);

    if(seat.booked)
        return;

    if(indexOfSeat >= 0)
        selectedSeats.value.splice(indexOfSeat, 1);
    else
        selectedSeats.value.push(seatId);

    emit('update:modelValue', selectedSeats.value);
}

</script>

<template>
<div>

<Dialog v-model:visible="dialogVisible" modal header="Choose Seats" :style="{ width: '50vw' }">
    <div>        
        <div v-for="carId in carIds">
            <h3>{{ carId }}</h3>
            <div class="car" :set="carSeats = getCarSeats(carId)">
                <div class="row" v-for="row in getRows(carSeats)">
                    <div class="seat" :class="{ selected: selectedSeats.indexOf(s.seatId) >= 0, booked: s.booked }" v-for="s in getRowSeats(row, carSeats)" @click="onSeatSelected(s.seatId)">
                        {{ s.row }}-{{ s.position }}
                    </div>
                </div>                
            </div>
        </div>
    </div>
    <template #footer>
        <Button label="Done" icon="pi pi-times" @click="dialogVisible = false" text />            
    </template>  
</Dialog>

<Button label="Pick Seats" icon="pi pi-external-link" @click="dialogVisible = true" />

</div>

</template>

<style lang="scss">

    .car{

        $seat-width: 50px;
        $seat-padding: 2px;
        $seat-border-width: 1px;
        $aisle-width: 55px;
        
        $row-width: 3px;

        border: solid 3px black;
        border-radius: 10px;
        width: (($seat-width + ( $seat-padding * 2) + ( $seat-border-width * 2 )) * 4) + $aisle-width + 20;

        padding: 15px 0;

        user-select: none;
        margin: 0 auto;


        .row{

            text-align: center;

            .seat{                
                display: inline-block;
                width: $seat-width;
                height: $seat-width;
                margin: $seat-padding;
                line-height: $seat-width;
                font-size: 15px;
                border: solid black 1px;
                text-align: center;
                cursor: pointer;

                &.booked{
                    background-color: blue;
                    cursor: default;
                }

                &.selected{
                    background-color: greenyellow;
                }
            }

            .seat:nth-child(2){                
                margin-right: $aisle-width;
            }
        }

        
    }

</style>