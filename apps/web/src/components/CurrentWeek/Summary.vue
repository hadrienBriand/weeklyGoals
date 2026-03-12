<template>
    <div class="w-full mb-20 border-4 border-primary rounded-md p-4 relative">
        <h2 class="text-3xl text-primary">{{ label }}</h2>
        <button @click="isEditing = !isEditing" class="bg-primary rounded-md absolute top-2 right-2 p-2 w-10 h-10 flex items-center transition hover:bg-primary/50 cursor-pointer">
            <Pen />
        </button>
        
        <div class="mt-8">
            <!-- Affichage -->
            <div v-if="!isEditing">
                {{ summary }}
            </div>
            
            <!-- Édition -->
            <div v-else>
                <textarea 
                    id="edit-summary" 
                    class="p-2 border border-primary w-full" 
                    v-model="editContent"
                    rows="4"
                ></textarea>
                
                <div class="mt-2 flex gap-2">
                    <CustomButton @click="editSummary" label="Mettre à jour"/>
                    <button @click="cancelEdit" class="text-sm text-gray-500 hover:text-red-500 underline cursor-pointer">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import CustomButton from '../elements/CustomButton.vue';
import Pen from '../icons/Pen.vue';
import { ref, watch } from "vue"; 
import { useWeeksStore } from '../../stores/weeks';

const store = useWeeksStore();

const props = defineProps<{
    summary: string;
    label:string
}>();

const emit = defineEmits<{
    (e: 'update:summary', value: string): void;
}>();

const isEditing = ref(false);
const editContent = ref("");

watch(isEditing, (newVal) => {
    if (newVal) {
        editContent.value = props.summary;
    } else {
        editContent.value = "";
    }
});


async function editSummary() {
    if (editContent.value === props.summary) {
        isEditing.value = false;
        return;
    }

    const success = await store.editWeek({ summary: editContent.value });
    
    if (success) {
        isEditing.value = false;
    } else {
        console.error("Erreur lors de la mise à jour");
    }
}

function cancelEdit() {
    isEditing.value = false;
}
</script>