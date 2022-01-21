<template>
  <b-card-body>
    <h4>{{ title }}</h4>
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import axios from "axios";
import {BASE_URL} from "@/main";

@Component({

})
export default class TransactionsOverview extends Vue {
  public currentPage = 1;
  public rows = 0;
  public perPage = 10;
  public transactions = [];
  @Prop()
  public title;
  @Prop()
  public path;
  @Prop()
  public filter;

  created() {
    this.getTransactions();
  }

  public getTransactions() {
    axios.get(`${BASE_URL}${this.path}`)
        .then(response => {
          if (response.data.status == "SUCCESS") {
            const data = response.data.data;
            this.transactions = [];
            data.filter(this.filter).forEach(obj => {
              this.transactions.push({from: obj.from, to: obj.to, amount: obj.amount, timestamp: obj.timestamp.iMillis, status: obj.status});
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
