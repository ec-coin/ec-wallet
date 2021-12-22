import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Accounts from '../views/Accounts.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Accounts',
    component: Accounts
  },
]

const router = new VueRouter({
  routes
})

export default router