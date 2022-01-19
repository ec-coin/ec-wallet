<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1" v-for="wallet in wallets" :key="wallet.seedphrase">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle="'accordion' + wallet.address" variant="primary" v-on:click="getItems(wallet.address, wallet.name)">
          {{ wallet.name + ": " + (balances[wallet.name] / 100 - 1.23) + " EC"}}
        </b-button>
      </b-card-header>
      <b-collapse :id="'accordion' + wallet.address" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <h4>Transactions</h4>
          <b-table responsive striped hover
                   :items="items"
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
              @page-click="getItems(wallet.address)"
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
import {mapState} from "vuex";
import axios from "axios";
@Component({
  computed: {
    ...mapState(['wallets'])
  }
})
export default class AccountList extends Vue {
  public balances = [];
  public wallets !: [];
  public items = [];
  public currentPage = 1;
  public rows = 0;
  public perPage = 10;

  created() {
    this.extractWalletNames();
    this.getTransactions("");
  }

  public getItems(address: string, walletName: string) {
    this.getBalance(walletName);
  }

  public getTransactions(address : string) {
    axios.get(`http://localhost:4567/transactions?from=` + 'HDmaqtRRTeyEVLhEdKNurmPTB2Rb67YwPVUVMVXa2y88')
        .then(response => {
          if (response.data.status == "SUCCESS") {
            const data = response.data.data;
            this.items = [];
            data.forEach(obj => {
              this.items.push({from: obj.from, to: obj.to, amount: obj.amount, timestamp: obj.timestamp.iMillis});
            });
            this.rows = this.items.length;
          }
        })
        .catch(e => {
          //console.log(e);
        });
  }

  public getBalance(walletName: string) {
    axios.get(`http://localhost:4567/balances?balance=` + '**addressTo**')
        .then(response => {
          if (response.data.status == "SUCCESS") {
            this.balances[walletName] = response.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
  }

  public extractWalletNames() {
    const length = this.wallets.length;
    for (let i = 0; i < length; i++) {
      this.balances[this.wallets[i]['name']] = 0.0;
      this.getBalance(this.wallets[i]['name']);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
