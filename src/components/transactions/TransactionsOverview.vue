<template>
  <b-card-body>
    <h4>Network Transactions</h4>
    <b-table responsive striped hover
             :items="transactions"
             :per-page="perPage"
             :current-page="currentPage"
    ></b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        limit="7"
        align="fill"
        @page-click="getTransactions()"
        first-number
        last-number
    ></b-pagination>
  </b-card-body>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";

@Component({

})
export default class TransactionsOverview extends Vue {
  public currentPage = 1;
  public rows = 0;
  public perPage = 10;
  public transactions = [];
  public props: ['url']

  created() {
    this.getTransactions(`http://localhost:4567/transactions`);
  }

  public getTransactions(url: string) {
    axios.get(url)
        .then(response => {
          console.log(response.data.status)
          if (response.data.status == "SUCCESS") {
            const data = response.data.data;
            this.transactions = [];
            //this.pendingTransactions = [];

            data.forEach(obj => {
              this.transactions.push({from: obj.from, to: obj.to, amount: obj.amount, timestamp: obj.timestamp.iMillis, status: obj.status});
              if (obj.status == "pending") {
                //this.pendingTransactions.push({from: obj.from, to: obj.to, amount: obj.amount, timestamp: obj.timestamp.iMillis})
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
