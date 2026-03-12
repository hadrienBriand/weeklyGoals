<template>
    <header class="p-4 shadow-md flex items-center justify-between">
        <h1 class="text-4xl font-semibold text-primary">WeeklyGoals</h1>
            <nav class="flex gap-4 items-center">
            <RouterLink to="/" exactActiveClass="border-b border-primary">Semaine actuelle</RouterLink>
            <RouterLink to="/passed-weeks" exactActiveClass="border-b border-primary">Semaines passées</RouterLink>
        </nav>
    </header>
</template>

<script setup lang='ts'></script>