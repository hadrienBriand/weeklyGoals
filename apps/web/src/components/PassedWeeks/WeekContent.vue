<template>
   <div class="w-full  border-4 border-primary rounded-md p-4 relative">
        <h2 class="text-3xl text-primary">{{ title }}</h2>
        
        <div class="mt-8">
                {{ content }}
        </div>
    </div>
</template>

<script setup lang='ts'>

defineProps<{
    title:string
    content:string
}>()

</script>