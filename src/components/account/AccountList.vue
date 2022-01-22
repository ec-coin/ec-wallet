<template>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1" v-for="wallet in wallets" :key="wallet.seedphrase">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle="'accordion' + wallet.address" variant="primary">{{ wallet.name }} ({{ wallet.balance }} EC)</b-button>
            </b-card-header>
            <b-collapse :id="'accordion' + wallet.address" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <h4>Transactions</h4>
                    <b-table responsive striped hover
                             :items="validatedTransactions(wallet.address)"
                             :per-page="perPage"
                             :current-page="currentPage"
                    ></b-table>


                    <b-pagination
                        v-model="currentPage"
                        :total-rows="validatedTransactions(wallet.address).length"
                        :per-page="perPage"
                        aria-controls="my-table"
                        limit="7"
                        align="fill"
                        first-number
                        last-number
                    ></b-pagination>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapGetters} from "vuex";

@Component({
    computed: {
        ...mapGetters(['wallets', 'validatedTransactions'])
    }
})
export default class AccountList extends Vue {
    public currentPage = 1;
    public perPage = 10;
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
