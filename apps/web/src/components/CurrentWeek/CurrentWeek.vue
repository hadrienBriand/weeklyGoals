<template>
    <div class="container mx-auto mt-4">
        <div v-if="loading">
            Chargement...
        </div>
        <div v-else-if="store.currentWeek" >
             <CurrentDate class="text-4xl w-fit mx-auto  py-8 border-b-4 border-primary mb-8" :date="store.currentWeek.startDate"/>
           <div class="flex gap-4">
            <div class="w-1/2">
            <Goals :goals="store.currentWeek.goals" :weekId="store.currentWeek.id"  />
        </div>
        <div class="w-1/2">
            <StatusGoals v-if="store.totalGoals && store.totalGoals > 0" />
            <EditableSection title="Récapitulatif" :content="store.currentWeek.summary" @update-section="editSection('summary',$event)"/>
            <EditableSection title="Observations" :content="store.currentWeek.comments" @update-section="editSection('comments',$event)"/>
        </div>
            </div>
        </div>
         <div v-else class="text-center p-4 text-gray-500">
            Aucune semaine en cours trouvée.
            <CreateWeek/>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Goals from './Goals.vue';
import { ref,onMounted } from 'vue';
import { useWeeksStore } from '../../stores/weeks';
import StatusGoals from './StatusGoals.vue';
import EditableSection from './EditableSection.vue';
import type { WeekField } from '../../utils/types';
import CurrentDate from './CurrentDate.vue';
import CreateWeek from './CreateWeek.vue';

const store = useWeeksStore()
const loading = ref(true)
onMounted(async () => {
   await  store.fetchCurrentWeek()
    loading.value = false
})





async function editSection(field: WeekField,value:string){
  await store.editWeek({ [field]: value });
}



</script>