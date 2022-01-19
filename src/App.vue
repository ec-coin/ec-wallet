<template>
    <div id="app">
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
                            <b-nav-item exact-active-class="active" to="/NetworkTX">Network Transactions</b-nav-item>
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
import {Component, Vue} from 'vue-property-decorator';

import SetupWallet from "@/components/init/SetupWallet.vue";
import {mapActions, mapState} from "vuex";
import UnlockWallet from "@/components/init/UnlockWallet.vue";
import AppStorage from "@randlabs/encrypted-local-storage";

@Component({
    components: {SetupWallet, UnlockWallet},
    computed: {
        ...mapState(['hasAWallet', 'isWalletUnlocked'])
    },
    methods: {
        ...mapActions(['initWallet'])
    }
})
export default class App extends Vue {
    public username = '';

    async created() {
      this.username = await AppStorage.getItem("username");
    }

    initWallet!: () => Promise<void>;

    async mounted(): Promise<void> {
        await this.initWallet();
    }
}
</script>

<style lang="scss">

</style>
