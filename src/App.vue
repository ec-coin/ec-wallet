<template>
    <div id="app">
        <input type="number" v-model="port">
        <template v-if="hasAWallet && isWalletUnlocked">
            <b-container>
                <b-navbar toggleable="lg" type="dark" variant="primary">
                    <b-navbar-brand href="#">EC Wallet - {{ username }}</b-navbar-brand>

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item exact-active-class="active" to="/">Accounts</b-nav-item>
                            <b-nav-item exact-active-class="active" to="/send">Send</b-nav-item>
                            <b-nav-item exact-active-class="active" to="/receive">Receive</b-nav-item>
                            <b-nav-item exact-active-class="active" to="/Stake">Stake</b-nav-item>
                            <b-nav-item exact-active-class="active" to="/NetworkTX">(Network) Transactions</b-nav-item>
                            <b-nav-item exact-active-class="active" to="/testing">Testing</b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
                <div class="my-4"></div>
                <router-view></router-view>
                <div class="my-4"></div>
            </b-container>
        </template>
        <template v-if="hasAWallet && !isWalletUnlocked">
            <UnlockWallet></UnlockWallet>
        </template>
        <template v-if="!hasAWallet && !isWalletUnlocked">
            <SetupWallet></SetupWallet>
        </template>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

import SetupWallet from "@/components/init/SetupWallet.vue";
import {mapActions, mapState} from "vuex";
import UnlockWallet from "@/components/init/UnlockWallet.vue";
import AppStorage from "@randlabs/encrypted-local-storage";
import {Wallet} from "@/service/wallet";
import {changeBaseUrl} from "@/main";

@Component({
    components: {SetupWallet, UnlockWallet},
    computed: {
        ...mapState(['hasAWallet', 'isWalletUnlocked'])
    },
    methods: {
        ...mapActions(['initWallet', 'sync', 'getTransactions'])
    }
})
export default class App extends Vue {
    public username = '';
    public port = 4567;

    initWallet!: () => Promise<void>;
    sync !: () => Promise<void>;

    async created() {
      this.username = await AppStorage.getItem("username");
      await this.sync();
      setInterval(async () => this.sync(), 5000);
    }

    async mounted(): Promise<void> {
        await this.initWallet();
        console.log(Wallet.mnemonicToPrivateKey('bind grunt joke slab debris mean build cry image solid eternal sign'))
    }

    @Watch('port')
    updatePort() {
        const url = `http://178.63.163.115:${this.port}`
        console.log(url);
        changeBaseUrl(url);
    }
}
</script>

<style lang="scss">

</style>
