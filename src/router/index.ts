import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Accounts from '../views/Accounts.vue'
import Send from "@/views/Send.vue";
import Receive from "@/views/Receive.vue";
import Stake from "@/views/Stake.vue";
import NetworkTX from "@/views/NetworkTx.vue";
import Testing from "@/views/Testing.vue";

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
  },

  {
    path: '/receive',
    name: 'Receive',
    component: Receive
  },

  {
    path: '/stake',
    name: 'Stake',
    component: Stake
  },
  {
    path: '/networktx',
    name: 'NetworkTransactions',
    component: NetworkTX
  },
  {
    path: '/testing',
    name: 'Testing',
    component: Testing
  }
]

const router = new VueRouter({
  routes
})

export default router
