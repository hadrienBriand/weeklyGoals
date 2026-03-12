<template>
<div v-if="goals.length > 0"
            class="w-full p-4 rounded-md border-4 border-primary relative max-h-140  
                [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-primary/5
            [&::-webkit-scrollbar-thumb]:bg-primary/40" 
            :class="listToggle ? 'overflow-y-scroll' : 'overflow-hidden'" >
                <div class="flex items-center justify-between ">
                    <button @click="listToggle = ! listToggle"  class="flex items-center justify-between w-full mb-4">
                        <h2 class="text-3xl text-primary ">Liste des objectifs</h2>
                        <Chevron :class="listToggle ? 'rotate-0':'rotate-180'"/>
                    </button>
                </div>
                <ul :class="listToggle ? 'h-fit opacity-100 relative' : ' h-0 opacity-0 -translate-x-11/12'" class="transition">
                     <Goal v-for="goal in goals" :key="goal.id" :goal="goal"/>
                </ul>
            </div>
</template>

<script setup lang='ts'>
import {ref} from "vue"
import type { Goal as GoalType} from '../../utils/types';
import Goal from './Goal.vue';
import Chevron from "../icons/Chevron.vue";

const props = defineProps<{
    goals:GoalType[]
}>()

const listToggle = ref(false)

</script>