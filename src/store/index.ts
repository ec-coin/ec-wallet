import Vue from 'vue'
import Vuex from 'vuex'
import {Storage} from "@/service/storage";
import axios from "axios";
import {BASE_URL} from "@/main";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        invalidToken: false,
        token: '',
        tokens: {}
    },
    mutations: {
        unlockAccount(state) {
            console.log("here")
            state.loggedIn = true;
        },

        invalidToken(state) {
            state.invalidToken = true;
        },

        addAccount(state, { name, token }) {
            const timestamp = new Date().getTime();

            Vue.set(state.tokens, token, {
                name,
                token,
                timestamp
            })
        },
    },
    actions: {
        async createSession({ commit, state }, { name, token }) {
            commit('addAccount', { name, token });
            Storage.saveEncrypted('api_token', token, token);

            if (!state.loggedIn) {
                commit('unlockAccount', token);
            }
        },

        async login({ commit, state }, {name, token}) {
            const storageToken = Storage.getEncrypted('api_token', token);
            console.log("loggedin: " + state.loggedIn)
            console.log("storageToken: " + storageToken)

            if (storageToken == null) {
                commit('addAccount', { name, token });
                Storage.saveEncrypted('api_token', token, token);
            }
            commit('unlockAccount', token);
        },

        async sync({ commit, state }, { currentPage, title, address }) {
            const balance = (await axios.get(`${BASE_URL}/balances?balance=${address}`)).data.data;
            const request = (await axios.get(`${BASE_URL}/transactions?from=${address}&tx=${(currentPage - 1) * 10}&window=10`)).data;
            commit('updateWallet', { address: address, balance: balance, transactions: request.data, title: title + address, metaData: request.meta_data });
        },

        async getMLRequests({ commit, state }, { currentPage, pending }) {
            // const request = (await axios.get(`${BASE_URL}/transactions?tx=${(currentPage - 1) * 10}&window=10&pending=${pending}`)).data

            axios.defaults.headers.common['Authorization'] = `api-token`

            axios.get(
                `${BASE_URL}/api/classifications`
            )
                .then((response) => {
                        const rresponse = response.data;
                        console.log("error")
                    },
                    (error) => {
                        console.log("ERRORRRRR")
                        console.log(error)
                        const status = error.response.status
                    }
                );

            const request = (await axios.get(`${BASE_URL}/api/classifications`, { headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json"
            } }));
            console.log("request: ", request)

            commit('updateTransactions', { transactions: request.data, metaData: request});
        },
    },

    getters: {
        tokens: (state) => state.tokens,
    },

    modules: {}
})
