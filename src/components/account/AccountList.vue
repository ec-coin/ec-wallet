<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1" v-for="wallet in wallets" :key="wallet.seedphrase">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle="'accordion' + wallet.address" variant="primary" v-on:click="getItems(wallet.address)">
          {{ wallet.name }} (100 EC)
        </b-button>
      </b-card-header>
      <b-collapse :id="'accordion' + wallet.address" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <h4>Transactions</h4>
          <b-table striped hover :items="items"></b-table>
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
  public items = [];

  public getItems(address : string) {
    axios.get(`http://localhost:4567/transactions?from=` + '**addressFrom**')
        .then(response => {
          if (response.data.status == "SUCCESS") {
            const data = response.data.data;
            this.items = [];

            data.forEach(obj => {
              this.items.push({from: obj.from, to: obj.to, amount: obj.amount, timestamp: obj.timestamp.iMillis});
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
