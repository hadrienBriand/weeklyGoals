<template>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="store.activeWeek" class="container mx-auto p-4" >
        <h1 class="text-4xl font-semibold text-primary text-center">{{ store.activeWeek.description }}</h1>
    <div class="flex mt-8 items-start">
        <!-- Colonne Gauche -->
        <div class="w-1/2 pr-4 flex flex-col gap-6">
            <WeeklySuccess v-if="store.totalGoals && store.remainingGoals.length" 
                        :total="store.totalGoals" 
                        :remaining="store.remainingGoals.length"/>
            
            <GoalsList v-if="store.activeWeek" :goals="store.activeWeek.goals"/>
        </div>

        <!-- Colonne Droite -->
        <div class="w-1/2 pl-4 flex flex-col gap-6">
            <WeekContent title="Récapitulatif" :content="store.activeWeek.summary"/>
            <WeekContent title="Observations" :content="store.activeWeek.comments"/>
        </div>
    </div>
    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { useWeeksStore } from '../../stores/weeks';
import { onMounted, ref } from 'vue';
import GoalsList from './GoalsList.vue';
import WeeklySuccess from './WeeklySuccess.vue';
import WeekContent from '../PassedWeeks/WeekContent.vue';

const store =useWeeksStore()
const route = useRoute()
const id = parseInt(route.params.id as string)
const loading =ref(true)
const listToggle= ref(false)
onMounted(async () => {
    loading.value  = false
     await store.fetchWeekById(id)
})

</script>