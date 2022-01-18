<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <TransactionsOverview url="`http://localhost:4567/transactions`"/>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <b-card-body>
          <h4>Pending Transactions</h4>
          <b-table responsive striped hover
                   :items="pendingTransactions"
                   :per-page="perPage"
                   :current-page="1"
          ></b-table>

          <b-pagination
              v-model="currentPage"
              :total-rows="0"
              :per-page="perPage"
              aria-controls="my-table1"
              limit="7"
              align="fill"
              @page-click="getTransactions()"
              first-number
              last-number
          ></b-pagination>
        </b-card-body>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AccountList from "@/components/account/AccountList.vue";
import axios from "axios";
import TransactionsOverview from "@/components/transactions/TransactionsOverview.vue"; // @ is an alias to /src

@Component({
  components: {
    TransactionsOverview,
    AccountList,
  }
})
export default class Accounts extends Vue {
  public currentPage = 1;
  public rows = 0;
  public perPage = 10;
  public transactions = [];
  public pendingTransactions = [];

  created() {
    this.getTransactions();
  }

  public getTransactions() {
    axios.get(`http://localhost:4567/transactions`)
        .then(response => {
          console.log(response.data.status)
          if (response.data.status == "SUCCESS") {
            const data = response.data.data;
            this.transactions = [];
            this.pendingTransactions = [];

            data.forEach(obj => {
              this.transactions.push({from: obj.from, to: obj.to, amount: obj.amount, timestamp: obj.timestamp.iMillis, status: obj.status});
              if (obj.status == "pending") {
                this.pendingTransactions.push({from: obj.from, to: obj.to, amount: obj.amount, timestamp: obj.timestamp.iMillis})
              }
            });
            this.rows = this.transactions.length;
          }
        })
        .catch(e => {
          console.log(e);
        });
  }
}
</script>
