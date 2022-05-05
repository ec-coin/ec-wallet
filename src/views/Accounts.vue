<template>
    <b-container>
        <b-row>
          <b-col cols="12">
            <TransactionsOverview title="Pending transactions" :transactions="pendingTransactions" :wallet-address="''" :pending-or-not="true"/>
          </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TransactionsOverview from "@/components/transactions/TransactionsOverview.vue";
import {mapGetters} from "vuex"; // @ is an alias to /src

@Component({
    components: {
      TransactionsOverview
    }
})
export default class Accounts extends Vue {
  public pendingTransactions = [{"address": "hello"}]
}
</script>

<style lang="scss" scoped>

</style>
