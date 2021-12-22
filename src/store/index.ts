import Vue from 'vue'
import Vuex from 'vuex'
import {Storage} from "@/service/storage";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isWalletUnlocked: false,
        hasAWallet: false,
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

        addWallet(state, { name, seedphrase }) {
            (state as any).wallets.push({
                name,
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

        async createWallet({ commit, state }, { name, seedphrase, password }) {
            commit('addWallet', { name, seedphrase });
            const data = JSON.stringify(state.wallets);
            Storage.saveEncrypted('wallets', data, password);
            commit('hasAWallet');
            commit('unlockWallet', state.wallets);
        },

        async unlockWallet({ commit, state }, password) {
            const wallets = Storage.getEncrypted('wallets', password);

            if (wallets == null) {
                commit('incorrectPassword');
                return;
            }

            console.log(wallets);

            commit('unlockWallet', JSON.parse(wallets));

            console.log(state.wallets);
        }
    },
    modules: {}
})