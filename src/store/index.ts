import Vue from 'vue'
import Vuex from 'vuex'
import {Storage} from "@/service/storage";
import {Wallet} from "@/service/wallet";
import axios from "axios";
import {BASE_URL} from "@/main";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isWalletUnlocked: false,
        hasAWallet: false,
        incorrectPassword: false,
        wallets: {},
        publicKey: '',
        networkTransactions: [],
        pendingTransactions: [],
        totalRows: {}
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

        addWallet(state, { name, seedphrase, stakeaccount }) {
            const address = Wallet.getAddress(seedphrase);
            const publicKey = Wallet.mnemonicToPublicKey(seedphrase);
            const timestamp = new Date().getTime();

            if (stakeaccount === 'true') {
                axios.post(`${BASE_URL}/register_node`, {
                    "address": address,
                    "public_key": publicKey,
                    "signature": Wallet.sign(seedphrase,  address + "stake_register" + timestamp + Number(0).toFixed(1)),
                    "timestamp": timestamp
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            Vue.set(state.wallets, address, {
                name,
                seedphrase,
                stakeaccount,
                balance: 0,
                transactions: [],
                address: address,
                publicKey: publicKey
            })
        },

        updateWallet(state, { address, balance, transactions, title, metaData }) {
            if (address in state.wallets) {
                state.wallets[address].balance = balance;
                state.wallets[address].transactions = transactions.map(transaction => ({
                    from: transaction.from,
                    to: transaction.to,
                    amount: transaction.amount,
                    status: transaction.status,
                    timestamp: transaction.timestamp.iMillis
                }));
            }
            console.log("transactionssssssssssssssssssssssssssssssssssssssssss: ");
            console.log(transactions)
            state.totalRows[title] = metaData.total_size;
        },

        updateTransactions(state, { transactions, metaData, title }) {
            const mappedTransactions = transactions.map(transaction => ({
                from: transaction.from,
                to: transaction.to,
                amount: transaction.amount,
                status: transaction.status,
                timestamp: transaction.timestamp.iMillis === undefined ? transaction.timestamp : transaction.timestamp.iMillis
            }));

            if (title === "Network transactions") {
                state.networkTransactions = mappedTransactions;
            }
            else {
                state.pendingTransactions = mappedTransactions;
            }

            state.totalRows[title] = metaData.total_size;
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

        async createWallet({ commit, state }, { name, seedphrase, password, stakeaccount }) {
            commit('addWallet', { name, seedphrase, stakeaccount });
            const data = JSON.stringify(state.wallets);
            Storage.saveEncrypted('wallets', data, password);

            if (!state.isWalletUnlocked) {
                commit('hasAWallet');
                commit('unlockWallet', state.wallets);
            }
        },

        async unlockWallet({ commit, state }, password) {
            const wallets = Storage.getEncrypted('wallets', password);

            if (wallets == null) {
                commit('incorrectPassword');
                return;
            }
            commit('unlockWallet', JSON.parse(wallets));
        },

        async sync({ commit, state }, { currentPage, title, address }) {
            const balance = (await axios.get(`${BASE_URL}/balances?balance=${address}`)).data.data;
            const request = (await axios.get(`${BASE_URL}/transactions?from=${address}&tx=${(currentPage - 1) * 10}&window=10`)).data;
            commit('updateWallet', { address: address, balance: balance, transactions: request.data, title: title + address, metaData: request.meta_data });
        },

        async getTransactions({ commit, state }, { currentPage, pending }) {
            const request = (await axios.get(`${BASE_URL}/transactions?tx=${(currentPage - 1) * 10}&window=10&pending=${pending}`)).data;
            const title = pending ? "Pending transactions" : "Network transactions";
            commit('updateTransactions', { transactions: request.data, metaData: request.meta_data, title: title});
        },
    },

    getters: {
        wallets: (state) => Object.values(state.wallets),
        validatedTransactions: (state) => (address) => {
            if (address in state.wallets) {
                return state.wallets[address].transactions;
            }

            return [];
        },
        networkTransactions: (state) => state.networkTransactions,
        pendingTransactions: (state) => state.pendingTransactions,
        totalRows: (state) => state.totalRows
    },

    modules: {}
})
