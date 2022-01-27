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
        currentTransactionPage: 0
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

        updateWallet(state, { address, balance, transactions }) {
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
        },

        updateNetworkTransactions(state, { networkTransactions, currentTransactionPage }) {
            console.log(networkTransactions);

            state.networkTransactions = networkTransactions.map(transaction => ({
                from: transaction.from,
                to: transaction.to,
                amount: transaction.amount,
                status: transaction.status,
                timestamp: transaction.timestamp.iMillis === undefined ? transaction.timestamp : transaction.timestamp.iMillis
            }));
            state.currentTransactionPage += currentTransactionPage;
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

        async sync({ commit, state }) {
            for (const address in state.wallets) {
                const balance = (await axios.get(`${BASE_URL}/balances?balance=` + address)).data.data;
                const transactions = (await axios.get(`${BASE_URL}/transactions?from=` + address)).data.data;
                commit('updateWallet', { address, balance, transactions });
            }

            const transactions = (await axios.get(`${BASE_URL}/transactions?tx=${state.currentTransactionPage}&window=${100}`)).data.data;
            const currentTransactionPage = transactions.length;
            const networkTransactions = state.networkTransactions;

            if (currentTransactionPage != 0) {
                for (const transaction in transactions) {
                    if (networkTransactions.indexOf(transactions[transaction]) === -1) {
                        networkTransactions.push(transactions[transaction])
                    }
                }
                commit('updateNetworkTransactions', { networkTransactions, currentTransactionPage });
            }
        }
    },

    getters: {
        wallets: (state) => Object.values(state.wallets),
        validatedTransactions: (state) => (address) => {
            if (address in state.wallets) {
                return state.wallets[address].transactions.filter(transaction => transaction.status === 'validated');
            }

            return [];
        },
        networkTransactions: (state) => state.networkTransactions
    },

    modules: {}
})
