<template>
    <div class="flex flex-col items-center gap-2">
        <p class="text-lg font-semibold">{{ label }} </p>
        <div class=" border-4 rounded-full w-20 h-20 flex items-center justify-center" :class="color">
            {{ percentage }}%
        </div>
    </div>
</template>

<script setup lang='ts'>
import {computed} from "vue"
import type { GoalStatus } from "../../utils/types";
const props = defineProps<{
    nb:number,
    max:number,
    label:string,
    type:GoalStatus
}>()

const percentage = computed(() => {
    return Math.round((props.nb*100) / props.max);
})
const color = computed(() => {
    if(props.type === "A_FAIRE"){
        return 'border-red-500 text-red-500'
    }
    else if (props.type === "EN_COURS"){
        return 'border-blue-500 text-blue-500'
    }
    else if(props.type === "TERMINE"){
        return 'border-green-500 text-green-500'
    }
})

</script>