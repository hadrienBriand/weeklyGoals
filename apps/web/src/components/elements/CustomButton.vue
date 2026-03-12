<template>
    <button 
    class="bg-primary text-white  mx-auto block py-2 px-4 border border-primary rounded-md transition hover:bg-white hover:text-primary cursor-pointer">
    {{ label }}
    </button>
</template>

<script setup lang='ts'>
defineProps<{
    label:string
}>()
</script>