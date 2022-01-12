<template>
    <b-container>
        <b-form @submit="sendTransaction">
            <b-form-group
                id="input-group-1"
                label="From"
                label-for="input-1"
                description="">
                <b-form-select v-model="selected" :options="options"></b-form-select>
            </b-form-group>

            <b-form-group
                id="input-group-1"
                label="To"
                label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="to"
                    type="text"
                    placeholder="0xFFFFFFFF"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-1"
                label="Amount"
                label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="amount"
                    type="number"
                    placeholder="10"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-1"
                label="Password:"
                label-for="input-1"
                description="">
                <b-form-input
                    id="input-1"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" v-if="amount > 0" block>Send</b-button>
        </b-form>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapState} from "vuex";
import axios from "axios";
import {Wallet} from "@/service/wallet"; // @ is an alias to /src

@Component({
    computed: {
        ...mapState(['wallets'])
    }
})
export default class Send extends Vue {
    private seedPhrases = new Map<string, string>();
    public selected: string[] = [];
    public options: any[] = [];
    public publicKey = '';
    public password = '';
    public amount = 0;
    public to = '';

    mounted() {
        (this as any).wallets.forEach(wallet => {
            if (this.selected.length == 0) {
                this.selected = wallet.address;
                this.publicKey = wallet.publicKey;
                this.seedPhrases.set(wallet.address, wallet.seedphrase)
            }

            this.options.push({
                value: [wallet.address, wallet.publicKey],
                text: `${wallet.name} (${wallet.address})`
            } as any);
        })
    }

  async sendTransaction() {
      const timestamp = new Date().getTime();

      const encoder = new TextEncoder();
      const msgBuffer = encoder.encode(this.selected[0] + this.to + timestamp + this.amount);
      const res = await axios.post('http://localhost:4567/transactions',
          {
            "from": this.selected[0],
            "to": this.to,
            "amount": this.amount,
            "public_key": this.selected[1],
            "signature": Wallet.sign(this.selected[1], this.seedPhrases.get(this.selected[0]), this.selected[0] + this.to + timestamp + this.amount),
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

<style lang="scss" scoped>
</style>
