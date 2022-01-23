<template>
    <b-container>
        <button class="btn btn-primary" v-if="!scan" @click="scan = true">Have QR Code?</button>
        <qrcode-stream v-if="scan" @decode="onDecode"></qrcode-stream>

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
                    placeholder="ffffffffffffffffffffffffffffffffffffffffffff"
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
import {mapGetters, mapState} from "vuex";
import axios from "axios";
import {Wallet} from "@/service/wallet";
import {BASE_URL} from "@/main";
@Component({
    computed: {
        ...mapGetters(['wallets'])
    }
})
export default class Send extends Vue {
    public selected = '';
    public options: any[] = [];
    public password = '';
    public to = '';
    public amount = 0;
    public scan = false;

    mounted() {
        (this as any).wallets.forEach(wallet => {
            if (this.selected.length == 0) {
                this.selected = wallet.address;
            }

            this.options.push({
                value: wallet.address,
                text: `${wallet.name} (${wallet.address})`
            } as any);
        })
    }

    async sendTransaction(e) {
        e.preventDefault();
        const wallet = (this as any).wallets.find(w => w.address == this.selected[0]);

        const timestamp = new Date().getTime();
        await axios.post(`${BASE_URL}/transactions`,
            {
                "from": wallet.address,
                "to": this.to,
                "amount": parseFloat(this.amount as any),
                "public_key": wallet.publicKey,
                "address_type": Wallet.determineAddressType(wallet),
                "signature": Wallet.sign(wallet.seedphrase,  wallet.address + this.to + timestamp + Number(this.amount).toFixed(1)),
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

        console.log("TX has been sent");
    }

    onDecode (decodedString) {
      const split = decodedString.split('::');
      this.to = split[0];
      this.amount = split[1];
    }
}
</script>

<style lang="scss" scoped>
</style>
