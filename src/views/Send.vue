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
import {Component, Vue} from 'vue-property-decorator';
import {mapState} from "vuex";
import axios from "axios";
import {Wallet} from "@/service/wallet";

@Component({
    computed: {
        ...mapState(['wallets'])
    }
})
export default class Send extends Vue {
    public selected: string[] = [];
    public options: any[] = [];
    public password = '';
    public amount = 0;
    public to = '';
    public wallets;

    mounted() {
        (this as any).wallets.forEach(wallet => {
            if (this.selected.length == 0) {
                this.selected = wallet.address;
            }

            this.options.push({
                value: [wallet.address, wallet.publicKey],
                text: `${wallet.name} (${wallet.address})`
            } as any);
        })
    }

    async sendTransaction(e) {
        e.preventDefault();
        const wallet = this.wallets.find(w => w.address == this.selected[0]);

        const timestamp = new Date().getTime();
        await axios.post('http://localhost:4567/transactions',
            {
                "from": wallet.address,
                "to": this.to,
                "amount": this.amount,
                "public_key": wallet.publicKey,
                "signature": Wallet.sign(wallet.seedphrase,  wallet.address + this.to + timestamp + this.amount),
                "timestamp": timestamp
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        ).catch(error => {
            console.log(error.message);
        });
    }
}
</script>

<style lang="scss" scoped>
</style>
