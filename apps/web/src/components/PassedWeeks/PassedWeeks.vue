<template>
<div class="container mx-auto mt-4">
    <div v-if="loading">Chargement...</div>
    <div v-else-if="store.passedWeeks">
        <WeekRow v-for="week in store.passedWeeks" :key="week.id" :week="week"/>
    </div>
</div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue';
import { useWeeksStore } from '../../stores/weeks';
import WeekRow from './WeekRow.vue';

const store = useWeeksStore()
const loading = ref(true)
onMounted(async () => {
    await store.fetchPassedWeeks()
    loading.value= false;
})
</script>