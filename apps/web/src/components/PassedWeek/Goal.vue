<template>
    <li class="py-2  not-last:border-b-2 border-primary flex items-center justify-between ">
        <div>
            <h3 class="font-semibold mb-2">{{ goal.title }}</h3>
            <p class="text-xs">{{ goal.description }}</p>
        </div>
          <span :class="statusColor" class="text-white p-2 rounded-sm text-xs">{{ statusText }}</span>
    </li>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import type { Goal } from '../../utils/types';

    const props = defineProps<{
        goal:Goal
    }>()

    const statusText = computed(() => {
        let value:string;
        if(props.goal.status === "A_FAIRE"){
            value = "À faire"
        }
        else if(props.goal.status === "EN_COURS"){
           value =  "En cours"
        }
        else{
            value="Terminé"
        }
        return value;
    })

    const statusColor = computed(() => {
        let color:string;
        if(props.goal.status === "A_FAIRE"){
            color = "bg-red-500"
        }
        else if(props.goal.status === "EN_COURS"){
           color =  "bg-blue-500"
        }
        else{
            color="bg-green-500"
        }
        return color;

    })

</script>