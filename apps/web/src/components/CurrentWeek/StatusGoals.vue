<template>
    <div class="w-full mx-auto  mb-20 border-4 border-primary rounded-md p-4 ">
        <h2 class="text-3xl text-primary">Suivi des objectifs</h2>
        <div class="flex justify-around items-center py-10">
            
        <StatCalcul v-if="toDo && totalGoals" :nb="toDo" :max="totalGoals" label="À faire" type="A_FAIRE"/>
        <StatCalcul v-if="remaining && totalGoals" :nb="remaining" :max="totalGoals" label="En cours" type="EN_COURS"/>
        <StatCalcul v-if="ended && totalGoals" :nb="ended" :max="totalGoals" label="Terminé(s)" type="TERMINE"/>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useWeeksStore } from '../../stores/weeks';
import StatCalcul from './StatCalcul.vue';
const store = useWeeksStore()

const remaining = computed(() => store.remainingGoals?.length)
const toDo = computed(() => store.toDoGoals?.length)
const ended = computed(() => store.endedGoals?.length)
const totalGoals = computed(() => store.currentWeek?.goals.length)


</script>

