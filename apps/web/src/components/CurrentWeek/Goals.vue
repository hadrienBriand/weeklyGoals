<template>
    <div class="w-4/5 mx-auto  border-4 p-4  border-primary rounded-md flex flex-col justify-between ">
        <h2 class="text-3xl text-primary">Liste des objectifs</h2>
        <select v-if="goals.length > 0" v-model="filterStatus"  class="my-4 border w-fit py-2 px-4 border-primary rounded-sm">
                 <option 
                    v-for="status in goalStatus" 
                    :key="status.key" 
                    :value="status.key"
                    >
                    {{ status.label }}
                </option>
            </select>
        <ul class=" space-y-4">
            <GoalItem v-for="goal in localGoals" :key="goal.id" :goal="goal" :weekId="weekId" />
        </ul>
       <CustomButton
       class="mt-6"
       @click="toggleAdd = !toggleAdd"
        v-if="!toggleAdd"
       label="Ajouter un nouvel obectif"/>
        <div v-else class="flex gap-2 flex-wrap mt-6">
            <input type="text" class="w-fit p-2 border border-primary" v-model="newGoal.title" id="goal-name" placeholder="Nom de l'objectif">
            <input type="text" class="w-fit p-2 border border-primary" v-model="newGoal.description" id="goal-description" placeholder="Description">
            <CustomButton v-if="canAdd" :disabled="disabledAdd" @click="addGoal" label="Ajouter"/>
             <button @click="ResetAdd" class="text-sm text-gray-500 hover:text-red-500 underline">
                Annuler
            </button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useWeeksStore } from '../../stores/weeks';
import type { Goal,NewGoal } from '../../utils/types';
import CustomButton from '../elements/CustomButton.vue';
import GoalItem from './GoalItem.vue';
import {ref,computed} from "vue"

const store = useWeeksStore()
const props = defineProps<{
    goals: Goal[];
    weekId: number;
}>();

const goalStatus = [
    {key:'ALL',label:'Tous les objectifs'},
    { key: 'A_FAIRE', label: 'A faire' },
    { key: 'EN_COURS', label: 'En cours' },
    { key: 'TERMINE', label: 'Terminé' }
];
const filterStatus = ref('ALL');
const localGoals = computed(() => {
    // 1. On récupère la liste de base (filtrée ou non)
    let result = filterStatus.value === 'ALL' 
        ? [...props.goals] // On fait une copie pour ne pas muter la props directement
        : props.goals.filter(g => g.status === filterStatus.value);

    // 2. On définit l'ordre désiré des statuts
    const statusOrder: Record<string, number> = {
        'A_FAIRE': 1,
        'EN_COURS': 2,
        'TERMINE': 3
    };

    // 3. On trie le tableau
    return result.sort((a, b) => {
        // Priorité 1 : Le statut (selon notre ordre personnalisé)
        const orderA = statusOrder[a.status] || 99;
        const orderB = statusOrder[b.status] || 99;
        
        if (orderA !== orderB) {
            return orderA - orderB;
        }

        // Priorité 2 : L'ID (pour garder l'ordre de création au sein d'un même statut)
        return a.id - b.id;
    });
});


const toggleAdd = ref(false)
const disabledAdd =ref(false)
const newGoal = ref<NewGoal>({
  title: '',
  description: '',
  status: "A_FAIRE",
  weekId: 0
})

const canAdd = computed(() => {
    return newGoal.value.title.trim() !=="" && newGoal.value.description.trim()
})

function ResetAdd(){
    toggleAdd.value = false
    newGoal.value = {
            title: '',
            description: '',
            status: "A_FAIRE",
            weekId: props.weekId
        };
        toggleAdd.value = false;
        disabledAdd.value = false;
}


async function addGoal(){
      if (!canAdd.value || !props.weekId) return;

       const goalToSubmit: NewGoal = {
        ...newGoal.value,
        weekId: props.weekId 
    };
    disabledAdd.value = true
     const success = await store.addGoal(goalToSubmit);
     if (success) {
        ResetAdd()
    } else {
        console.error("Erreur lors de l'ajout de l'objectif");
    }
}

</script>