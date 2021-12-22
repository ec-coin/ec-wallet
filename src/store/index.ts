import Vue from 'vue'
import Vuex from 'vuex'
import {Storage} from "@/service/storage";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isWalletUnlocked: true,
        hasAWallet: true,
        incorrectPassword: false,
        wallets: []
    },
    mutations: {
        unlockWallet(state, wallets) {
            state.isWalletUnlocked = true;
            state.incorrectPassword = false;
            state.wallets = wallets;
        },

        incorrectPassword(state) {
            state.incorrectPassword = true;
        },

        hasAWallet(state) {
            state.hasAWallet = true;
        },

        addWallet(state, seedphrase) {
            (state as any).wallets.push({
                seedphrase
            })
        }
    },
    actions: {
        async initWallet({ commit }) {
            const isInitialized = localStorage.getItem('wallets')
            if (isInitialized == null) {
                return;
            }

            commit('hasAWallet');
        },

        async createWallet({ commit, state }, { seedphrase, password }) {
            commit('addWallet', seedphrase);
            const data = JSON.stringify(state.wallets);
            Storage.saveEncrypted('wallets', data, password);
            commit('hasAWallet');
        },

        async unlockWallet({ commit }, password) {
            const wallets = Storage.getEncrypted('wallets', password);

            if (wallets == null) {
                commit('incorrectPassword');
                return;
            }

            commit('unlockWallet', JSON.parse(wallets));
        }
    },
    modules: {}
})
