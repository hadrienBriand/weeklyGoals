<template>
    <div class="w-full mb-20 border-4 border-primary rounded-md p-4 relative">
        <h2 class="text-3xl text-primary">{{ title }}</h2>
        <button @click="isEditing = !isEditing" class="bg-primary rounded-md absolute top-2 right-2 p-2 w-10 h-10 flex items-center transition hover:bg-primary/50 cursor-pointer">
            <Pen />
        </button>
        
        <div class="mt-8">
            <!-- Affichage -->
            <div v-if="!isEditing">
                {{ content }}
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
                    <CustomButton @click="editSection" label="Mettre à jour"/>
                    <button @click="cancelEdit" class="text-sm text-gray-500 hover:text-red-500 underline cursor-pointer">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref,watch } from 'vue';
import Pen from '../icons/Pen.vue';
import CustomButton from '../elements/CustomButton.vue';
const props = defineProps<{
    title:string
    content:string
}>()

const emit = defineEmits<{
    (e:"update-section",value:string):void
}>()

const isEditing = ref(false)
const editContent = ref("")

watch(isEditing, (newVal) => {
    if (newVal) {
        editContent.value = props.content;
    } else {
        editContent.value = "";
    }
});
function cancelEdit(){
    isEditing.value=false;
}

function editSection(){
    if(editContent.value === props.content){
       cancelEdit()
    }
   emit('update-section',editContent.value)
   cancelEdit()
}


</script>