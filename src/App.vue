<template>
    <div id="app">
        <template v-if="hasAWallet && isWalletUnlocked">
            <b-container>
                <b-navbar toggleable="lg" type="dark" variant="primary">
                    <b-navbar-brand href="#">EC Wallet</b-navbar-brand>

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item to="/">Accounts</b-nav-item>
                            <b-nav-item to="/send">Send</b-nav-item>
                            <b-nav-item to="/receive">Receive</b-nav-item>
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

@Component({
    components: {SetupWallet, UnlockWallet},
    computed: {
        ...mapState(['hasAWallet', 'isWalletUnlocked'])
    },
    methods: {
        ...mapActions(['initWallet', 'sync'])
    }
})
export default class App extends Vue {

    initWallet!: () => Promise<void>;
    sync !: () => Promise<void>;

    async created() {
        await this.sync();
        setInterval(async () => this.sync(), 5000);
    }

    async mounted(): Promise<void> {
        await this.initWallet();
    }
}
</script>

<style lang="scss">

</style>
