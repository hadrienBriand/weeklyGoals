<template>
<p>{{ getDate }}</p>
</template>

<script setup lang='ts'>
import { computed } from 'vue';

const props =defineProps<{
    date:Date | string
}>()
const getDate=computed(() => {
     if (!props.date) return '';
  const date = new Date(props.date);
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return `Semaine du ${formatter.format(date)}`;
})
</script>