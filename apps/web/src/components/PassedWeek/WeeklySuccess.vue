<template>
    <div class="w-full mb-8 p-4 rounded-md border-4 border-primary">
        <h2 class="text-3xl text-primary mb-4">Compte-rendu</h2>
        <p v-if="remaining === 0">
           <span class="text-green-500">{{successText}}</span>, Bravo Champion !
        </p>
        <p v-else>
           <span class="text-red-500"> {{ goalsEnded }} sur {{ total }} objectifs ont été réalisés</span>, Te bile pas mon lion tié un monstre quand même!
        </p>
    </div>
</template>

<script setup lang='ts'>
import {computed} from "vue"

const props = defineProps<{
    total:number;
    remaining:number
}>()

const successText = computed(() => {
   return  props.total > 1 
    ? `Les ${props.total} de la semaine ont été réalisés`
    :`L'objectif de la semaine a été réalisé`
})

const goalsEnded = computed(() => {
    return props.total - props.remaining
})
</script>