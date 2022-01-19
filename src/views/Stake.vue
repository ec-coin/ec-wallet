<template>
  <b-container>
    <b-form @submit="stakeAmount">
      <b-row>
        <span>Current stake: {{ currentStake }}</span>
      </b-row>

      <b-form-group
          id="input-group-1"
          label="From"
          label-for="input-1"
          description="">
        <b-form-select v-model="selected" :options="options"></b-form-select>
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

@Component({
    computed: {
      ...mapState(['wallets'])
    }
})
export default class Stake extends Vue {
  public selected = [];
  public amount = null;
  public currentStake = 100;
  public options: any[] = [];

  mounted() {
    (this as any).wallets.forEach(wallet => {
      if (this.selected.length == 0) {
        this.selected = wallet.address;
      }

      this.options.push({
        value: [wallet.address, wallet.publicKey],
        text: `100 EC - ${wallet.name} (${wallet.address})`
      } as any);
    })
  }

  created() {
    axios.get(`http://seed001.ec.dylaan.nl:4567/balances?stake=` + '**addressTo**', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(response => {
          if (response.data.status == "SUCCESS") {
            this.currentStake = response.data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
  }

  async stakeAmount(e: any) {
    e.preventDefault();
    console.log("amount: " + this.amount);
    console.log("selected: " + this.selected);
  }

  async stake(amount: number) {
    const timestamp = new Date().getTime();
    const res = await axios.post('http://seed001.ec.dylaan.nl:4567/stake',
        {
          "from": this.selected[0],
          "amount": this.amount,
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
