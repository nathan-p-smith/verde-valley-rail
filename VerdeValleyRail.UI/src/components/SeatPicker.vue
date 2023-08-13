<script setup>

import api from '../services/VerdeValleyRailApi';
import { ref, defineProps, defineEmits } from 'vue';

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

function addSeat(seatId){
    selectedSeats.value.push(seatId);
    emit('update:modelValue', selectedSeats.value);
}

</script>

<template>

    <div>        
        <h1>pick your seats {{ selectedSeats }}</h1>
        {{ carIds }}
        <div v-for="carId in carIds">
            <h3>{{ carId }}</h3>
            <div class="car" :set="carSeats = getCarSeats(carId)">
                <div class="row" v-for="row in getRows(carSeats)">
                    <div class="seat" v-for="s in getRowSeats(row, carSeats)" @click="addSeat(s.seatId)">
                        {{ s.row }}-{{ s.position }}
                    </div>
                </div>                
            </div>
        </div>
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

                &.booked{
                    background-color: blue;
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