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
import axios from "axios";

@Component({

})
export default class Stake extends Vue {
  public amount = null;
  public currentStake = 100;

  created() {
    axios.get(`http://localhost:4567/stake`, {
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
  }

  async stake(amount: number) {
    console.log();
  }
}
</script>

<style scoped>

</style>
