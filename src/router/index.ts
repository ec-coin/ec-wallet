import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Accounts from '../views/Accounts.vue'
import Send from "@/views/Send.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Accounts',
    component: Accounts
  },

  {
    path: '/send',
    name: 'Send',
    component: Send
  }
]

const router = new VueRouter({
  routes
})

export default router
