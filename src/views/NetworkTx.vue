<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <TransactionsOverview title="Network transactions" :transactions="networkTransactions" :wallet-name="''" :pending-or-not="false"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <TransactionsOverview title="Pending transactions" :transactions="pendingTransactions" :wallet-name="''" :pending-or-not="true"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AccountList from "@/components/account/AccountList.vue";
import TransactionsOverview from "@/components/transactions/TransactionsOverview.vue";
import {mapGetters} from "vuex"; // @ is an alias to /src

@Component({
  components: {
    TransactionsOverview,
    AccountList,
  },
  computed: {
    ...mapGetters(['networkTransactions', 'pendingTransactions'])
  }
})
export default class Accounts extends Vue {}
</script>
