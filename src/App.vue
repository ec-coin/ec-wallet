<template>
    <div id="app">
        <template v-if="hasAWallet && isWalletUnlocked">
            <!--            <div id="nav">-->
            <!--                <router-link to="/">Accounts</router-link>-->
            <!--                |-->
            <!--                <router-link to="/transactions">Transactions</router-link>-->
            <!--            </div>-->
            <!--            <router-view/>-->

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
            </b-container>
        </template>
        <!--        <template v-if="hasAWallet && !isWalletUnlocked">-->
        <!--            <UnlockWallet></UnlockWallet>-->
        <!--        </template>-->
        <!--        <template v-if="!hasAWallet && !isWalletUnlocked">-->
        <!--            <SetupWallet></SetupWallet>-->
        <!--        </template>-->
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
        ...mapActions(['initWallet'])
    }
})
export default class App extends Vue {

    initWallet!: () => Promise<void>;

    async mounted(): Promise<void> {
        await this.initWallet();
    }
}
</script>

<style lang="scss">

</style>
