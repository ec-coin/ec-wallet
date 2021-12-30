<template>
  <b-container>
    <b-form @submit="stakeAmount">
      <b-row>
        <span>Current stake: {{ currentStake }}</span>
      </b-row>

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
import {mapState} from "vuex";
import axios from "axios";

@Component({
    computed: {
      ...mapState(['wallets'])
    }
})
export default class Stake extends Vue {
  public amount = null;
  public currentStake = 100;

  created() {
    axios.get(`http://localhost:4567/stake`)
        .then(response => {
          if (response.data.status == "SUCCESS") {
            const data = response.data.data;
            this.currentStake = data;
          }
        })
        .catch(e => {
          console.log(e);
        });
  }

  async stakeAmount(e: any) {
    e.preventDefault();
    console.log("amount: " + this.amount);
  }

  async stake(amount: number) {
    console.log();
  }
}
</script>

<style scoped>

</style>
