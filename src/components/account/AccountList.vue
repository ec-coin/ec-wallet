<template>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1" v-for="wallet in wallets" :key="wallet.seedphrase">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion' + wallet.address" variant="primary">{{ wallet.name }} ({{ wallet.balance }} EC)</b-button>
            </b-card-header>
            <b-collapse :id="'accordion' + wallet.address" visible accordion="my-accordion" role="tabpanel">
              <TransactionsOverview title="Transactions" :wallet-address="wallet.address" :transactions="validatedTransactions(wallet.address)" :pending-or-not="'full'"/>
            </b-collapse>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapGetters} from "vuex";
import TransactionsOverview from "@/components/transactions/TransactionsOverview.vue";

@Component({
    components: {
      TransactionsOverview
    },
    computed: {
        ...mapGetters(['wallets', 'validatedTransactions'])
    }
})
export default class AccountList extends Vue {
    public currentPage = 1;
    public perPage = 10;

    getTransactions !: (payload: any) => Promise<void>;

    handleClick(event, pageNumber) {
      this.currentPage = pageNumber;
      console.log(event)
      this.getTransactions({currentPage: this.currentPage});
      console.log("22222222")
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
