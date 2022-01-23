<template>
  <b-container>
    <span>Current stake: {{ currentStake }}</span>
    <b-form @submit="stakeAmount">
      <b-form-group
          id="input-group-1"
          label="From"
          label-for="input-1"
          description="">
        <b-form-select v-model="selectedFrom" :options="walletaccounts"></b-form-select>
      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="To"
          label-for="input-1"
          description="">
        <b-form-select v-model="selectedTo" :options="stakeaccounts"></b-form-select>
      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="Stake Amount"
          label-for="input-1">

        <b-form-input
            id="input-1"
            v-model="amount"
            type="number"
            placeholder="amount"
            required
        ></b-form-input>

      </b-form-group>
      <b-button type="submit" variant="primary" block>Stake</b-button>
    </b-form>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";
import {mapState} from "vuex";
import {Wallet} from "@/service/wallet";
import {BASE_URL} from "@/main";

@Component({
    computed: {
      ...mapState(['wallets'])
    }
})
export default class Stake extends Vue {
  public selectedFrom = [];
  public selectedTo = [];
  public amount = null;
  public currentStake = 100;
  public walletaccounts: any[] = [];
  public stakeaccounts: any[] = [];

  mounted() {
    (this as any).wallets.forEach(wallet => {
      if (wallet.stakeaccount === 'true') {
        this.stakeaccounts.push({
          value: [wallet.address, wallet.publicKey],
          text: `100 EC - ${wallet.name} (${wallet.address})`
        })
      }
      else {
        this.walletaccounts.push({
          value: [wallet.address, wallet.publicKey],
          text: `100 EC - ${wallet.name} (${wallet.address})`
        } as any);
      }
    })
  }

  created() {
    axios.get(`${BASE_URL}/balances?stake=` + '**addressTo**', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(response => {
          if (response.data.status == "SUCCESS") {
            //this.currentStake = response.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
  }

  async stakeAmount(e: any) {
    e.preventDefault();
  }

  async stake(amount: number) {
    const timestamp = new Date().getTime();
    const wallet = this.walletaccounts.find(w => w.address == this.selectedFrom[0]);

    const res = await axios.post(`${BASE_URL}/stake`,
        {
          "from": wallet.address,
          "to": this.selectedTo[0],
          "amount": this.amount,
          "public_key": wallet.publicKey,
          "address_type": Wallet.determineAddressType(wallet),
          "signature": Wallet.sign(wallet.seedphrase,  wallet.address + this.selectedTo[0] + timestamp + Number(this.amount).toFixed(1)),
          "timestamp": timestamp
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
    );
    let data = res.data;
    console.log(data);
  }
}
</script>

<style scoped>

</style>
