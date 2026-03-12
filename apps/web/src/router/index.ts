import { createWebHistory , createRouter } from 'vue-router'

import CurrentWeekView from '../views/CurrentWeekView.vue'
import PassedWeeksView from '../views/PassedWeeksView.vue'
import PassedWeekView from '../views/PassedWeekView.vue'
const routes = [
  { path: '/', component: CurrentWeekView },
  { path: '/passed-weeks', component: PassedWeeksView },
  {path:'/passed-weeks/:id',component:PassedWeekView}
]

export const router = createRouter({
  history: createWebHistory (),
  routes,
})