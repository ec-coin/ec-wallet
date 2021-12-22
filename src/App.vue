<template>
    <div id="app">
        <template v-if="hasAWallet && isWalletUnlocked">
            <div id="nav">
                <router-link to="/">Accounts</router-link>
                |
                <router-link to="/transactions">Transactions</router-link>
            </div>
            <router-view/>
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
