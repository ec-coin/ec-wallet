<template>
  <b-container>
    <b-button variant="primary" @click="testTransactions">
      Test transactions
    </b-button>
  </b-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {mapGetters} from "vuex";
import axios from "axios";

@Component({
  computed: {
    ...mapGetters(['wallets'])
  }
})
export default class Testing extends Vue {
  public wallets;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  testTransactions() {
    let wallet = this.wallets[0];
    axios.post('http://localhost:3000/test',
        {
          "address": wallet.address,
          "public_key": wallet.publicKey,
          "seedphrase": wallet.seedphrase
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
    ).catch(error => {
      console.log(error.message);
    });
  }
}
</script>
