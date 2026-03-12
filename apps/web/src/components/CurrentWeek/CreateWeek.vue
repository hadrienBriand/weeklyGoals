<template>
    <CustomButton @click="toggleCreateWeek = !toggleCreateWeek" class="my-4" label="Démarrer une nouvelle semaine"/>
    <div class="w-96 mx-auto" v-if="toggleCreateWeek">
        <VueDatePicker class="my-4"  v-model="date"></VueDatePicker>
            <input type="text" class="w-fit p-2 border border-primary" v-model="description" id="goal-name" placeholder="Nom de l'objectif">
        <CustomButton @click="createWeek" label="valider"/>
    </div>
</template>

<script setup lang='ts'>
    import CustomButton from '../elements/CustomButton.vue';
    import {ref} from "vue"
    import { VueDatePicker } from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { useWeeksStore } from '../../stores/weeks';

    const store =useWeeksStore()
    const date = ref<Date>();
    const description=ref('')
    const toggleCreateWeek= ref(false)
    async function createWeek(){
        if(!date.value) return 
    await store.createWeek({
        startDate:date.value, 
        description:description.value,
        comments:'',
        summary:'',
    })
  }
</script>