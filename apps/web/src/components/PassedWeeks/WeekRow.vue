<template>
    <li class="flex gap-4 mb-4 border-b-2 border-primary py-4">
        <RouterLink :to="`/passed-weeks/${week.id}`" class=" w-full flex gap-4 items-center justify-between">
            <CurrentDate :date="week.startDate"/>  
            <p>{{ week.description }}</p>
        <p>Total objectifs: {{ week.goals.length }}</p>
        <p class="p-2 rounded-sm text-white w-85 text-center" :class="weekSuccess ? 'bg-green-500' :'bg-red-500'">{{ displayState}}</p>
        </RouterLink>
        </li>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import type { Week } from '../../utils/types';
import CurrentDate from '../CurrentWeek/CurrentDate.vue';
    const props = defineProps<{
        week:Week
    }>()

    const weekSuccess = computed(() => {
        const goals = props.week.goals
        const endedGoals = goals.filter(g => g.status=== "TERMINE")
       return endedGoals.length === goals.length
    })
    const displayState = computed(() => {
        return weekSuccess.value
        ? 'Tous les objectifs ont été réalisés'
       : "Tous les objectifs n'ont pas été réalisés"
        
    })
</script>