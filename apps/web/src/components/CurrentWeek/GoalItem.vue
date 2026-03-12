<template>
    <li class="p-2 border-b-2 border-primary/25 flex items-center justify-between" >
        <div>
            <h2 class="text-xl" :class="goalDone">{{ goal.title }}</h2>
            <p class="text-sm" :class="goalDone">{{ goal.description }}</p>
            <select v-model="selectStatus" @change="UpdateStatus" class="my-4 border border-gray-700 rounded-sm" :class="goalDone">
                 <option 
                    v-for="status in goalStatus" 
                    :key="status.key" 
                    :value="status.key"
                    class="text-gray-700"
                    >
                    {{ status.label }}
                </option>
            </select>
        </div>
        <div class="flex items-center gap-6">
            
            <CustomButton @click="RemoveGoal" label="X"/>
        </div>
    </li>
</template>

<script setup lang='ts'>

import {  type Goal, type GoalStatus } from '../../utils/types';
import CustomButton from '../elements/CustomButton.vue';
import { useWeeksStore } from '../../stores/weeks';
import { ref,computed } from 'vue';


const goalStatus = [
    { key: 'A_FAIRE', label: 'A faire' },
    { key: 'EN_COURS', label: 'En cours' },
    { key: 'TERMINE', label: 'Terminé' }
];

const store = useWeeksStore()
const props = defineProps<{
    goal:Goal,
    weekId:number
}>()
const selectStatus = ref<GoalStatus>(props.goal.status)


const goalDone = computed(() => {
    if(props.goal.status === "TERMINE"){
        return 'line-through text-green-500'
    }else if (props.goal.status === "EN_COURS"){
        return 'text-blue-500'
    }
    else if(props.goal.status === "A_FAIRE"){
        return ' text-red-500'
    }
})


function UpdateStatus() {
  store.toggleGoalStatus(props.goal.id,selectStatus.value)
}

async function RemoveGoal() {
  store.deleteGoal(props.goal.id)
}
</script>