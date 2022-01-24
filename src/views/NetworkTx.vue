<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <TransactionsOverview title="Network transactions" path="transactions" :filter="(obj => obj)"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <TransactionsOverview title="Pending transactions" path="transactions" :filter="(obj => obj.status === 'pending')"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AccountList from "@/components/account/AccountList.vue";
import TransactionsOverview from "@/components/transactions/TransactionsOverview.vue"; // @ is an alias to /src

@Component({
  components: {
    TransactionsOverview,
    AccountList,
  }
})
export default class Accounts extends Vue {}
</script>
