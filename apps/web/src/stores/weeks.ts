import { defineStore } from "pinia";
import type { Week,Goal, NewGoal, GoalStatus } from "../utils/types";
import {ref,computed} from "vue"
import { useFetch } from "../composables/useApi";


export const useWeeksStore = defineStore('weeks',() => {

    const currentWeek = ref<Week |null>(null)
    const passedWeeks = ref<Week[] |null>(null)
    const selectedWeek = ref<Week | null>(null);
    const activeWeek = computed(() => currentWeek.value || selectedWeek.value);

    const toDoGoals = computed(() => {
       const week = activeWeek.value;
        if (!week) return []; 
        return week.goals.filter(g => g.status === "A_FAIRE");
    })
    const remainingGoals = computed(() => {
       const week = activeWeek.value;
        if (!week) return [];
        return week.goals.filter(g => g.status === "A_FAIRE" || g.status === "EN_COURS");
    })
    const endedGoals = computed(() => {
       const week = activeWeek.value;
        if (!week) return [];
        return week.goals.filter(g => g.status === "TERMINE");
    })
    const totalGoals = computed(() => {
        const week = activeWeek.value;
        if (!week) return 0; 
        return week.goals.length;
    })

    async function createWeek(newWeek:Partial<Week>){
        const {execute} = useFetch<Week>('/week',{method:"POST"},{immediate:false})
        const result = await execute(newWeek);
        if(result){
             currentWeek.value = {
            ...result,
            goals: result.goals || [] 
        };
        }
    }
    async function fetchCurrentWeek(){
        const {execute} = useFetch<Week>('/week/current',{},{immediate:false})
        const result = await execute()
        if(result){
            currentWeek.value = result
            selectedWeek.value = null   
        }    
    }

    async function fetchWeekById(id:number){
        const {execute} = useFetch<Week>(`/week/${id}`,{},{immediate:false})
        const result = await execute()
        if(result){
            selectedWeek.value = result
            currentWeek.value= null
        }
    }

    async function editWeek(editedWeek:Partial<Week>){
    if(!currentWeek.value) return null
    const weekId = currentWeek.value.id
    const {execute} = useFetch<Week>(`/week/${weekId}`,{method:'PATCH'},{immediate:false, onSuccess: (data) => {
        currentWeek.value = data; 
    }})
     const result = await execute(editedWeek);
    if (result !== null) {
        return true;
    }
    return false;
    }
    
    async function fetchPassedWeeks(){
        const {execute} = useFetch<Week[]>('/week/passed',{},{immediate:false})
        const result = await execute()
        if(result){
            passedWeeks.value = result
        }    
    }

    async function addGoal(newGoal:NewGoal){
        if(!currentWeek.value) return null
        const url = `/week/${currentWeek.value.id}/goals`;
        const {execute} = useFetch<Goal>(url,{method:"POST"},{immediate:false})
        const result = await execute(newGoal)

        if (result && currentWeek.value) {
            currentWeek.value.goals.push(result);
            return result;
        }
        return null;
    }

    async function toggleGoalStatus(goalId: number,goalStatus:GoalStatus) {
        if (!currentWeek.value) return null;

        const goal = currentWeek.value.goals.find(g => g.id === goalId);
        if (!goal) return;

        const previousStatus = goal.status;
        goal.status = goalStatus;

        const url = `/week/${currentWeek.value.id}/goals/${goalId}`;
        const { execute, error } = useFetch<Goal>(url, { method: 'PATCH' }, { immediate: false });
        const result = await execute({ status: goal.status });

        if (error.value || !result) {
        goal.status = previousStatus;
        console.error("Échec de la mise à jour du statut", error.value);
        }
    }

    async function updateGoal(goalId:number,updates:Partial<Goal>){
        // Si pas de semaine courante on return
        if(!currentWeek.value) return null 

        //On récupère l'index du goal et on return false s'il y en a pas
        const goalIndex = currentWeek.value.goals.findIndex(g => g.id === goalId)
        if(goalIndex === -1) return false;
        
        //On sauvegarde l'état initial du goal pour le rollback
        const originalGoal = currentWeek.value.goals[goalIndex] as Goal;

        // On met à jour l'interface
        currentWeek.value.goals[goalIndex] = { ...originalGoal, ...updates } as Goal;

        // On fetch les données
        const url = `/week/${currentWeek.value.id}/goals/${goalId}`;
        const { execute, error } = useFetch<Goal>(url, { method: 'PATCH' }, { immediate: false }); 

        const result = await execute(updates);

        //On rollback si error ou pas de resultat
        if (error.value || !result) {
             currentWeek.value.goals[goalIndex] = originalGoal;
            console.error("Échec de la modification de l'objectif", error.value);
            return false;
        }
        //On met à jour avec la réponse serveur
        currentWeek.value.goals[goalIndex] = result;
        return true;
    }

    async function deleteGoal(goalId:number){
          // Si pas de semaine courante on return
        if(!currentWeek.value) return null 

        //On récupère l'index du goal et on return false s'il y en a pas
         
         const goalIndex = currentWeek.value.goals.findIndex(g => g.id === goalId)
        if(goalIndex === -1) return false;

        //On sauvegarde l'état initial du goal pour le rollback
        const deletedGoal = currentWeek.value.goals[goalIndex] as Goal;

          // On met à jour l'interface
        currentWeek.value.goals.splice(goalIndex, 1);


        // On fetch les données
         const url = `/week/${currentWeek.value.id}/goals/${goalId}`;
        const { execute, error } = useFetch<void>(url, { method: 'DELETE' }, { immediate: false });

        await execute();

        //Rollback
        if (error.value) {
            currentWeek.value.goals.splice(goalIndex, 0, deletedGoal);
            console.error("Échec de la suppression de l'objectif", error.value);
            return false;
        }
        // Mise à jour avec réponse serveur
        return true;
    }

    return {
        activeWeek,
      currentWeek,
      selectedWeek,
      passedWeeks,
      toDoGoals,
      remainingGoals,
      endedGoals,
      totalGoals,
      createWeek,
      fetchCurrentWeek,
      fetchWeekById,
      fetchPassedWeeks,
      editWeek,
      addGoal,
      toggleGoalStatus,
      updateGoal,
      deleteGoal
    }
})