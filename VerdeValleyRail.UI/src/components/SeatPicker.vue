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

var emit = defineEmits(['update:modelValue', 'close'])

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

function onSeatSelected(seat){

    var seat = seats.find((s) => { return whereSeatsMatch(s, seat) });
    
    if(seat.booked)
        return;

    var indexOfSeat = selectedSeats.value.findIndex((s) => { return whereSeatsMatch(s, seat); });

    if(indexOfSeat >= 0)
        selectedSeats.value.splice(indexOfSeat, 1);
    else
        selectedSeats.value.push({ 
            seatId: seat.seatId, 
            carId: seat.carId 
        });

    emit('update:modelValue', selectedSeats.value);
}

function whereSeatsMatch(a, b){
    return a.carId == b.carId && a.seatId == b.seatId;
}

function seatIsSelected(seat){
    return selectedSeats.value.findIndex((s) => { return whereSeatsMatch(s, seat); }) >= 0;
}

function onDialogHidden(){
    emit('close');
}

</script>

<template>
<div>

<Dialog v-model:visible="dialogVisible" modal header="Choose Seats" @hide="onDialogHidden" :style="{ width: '50vw' }">
    <div>        
        <div v-for="carId in carIds">
            <h3>{{ carId }}</h3>
            <div class="car" :set="carSeats = getCarSeats(carId)">
                <div class="row" v-for="row in getRows(carSeats)">
                    <div class="seat" :class="{ selected: seatIsSelected(s), booked: s.booked }" v-for="s in getRowSeats(row, carSeats)" @click="onSeatSelected(s)">
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



<div class="pseudo-link" @click="dialogVisible = true">Choose Seats...</div>

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