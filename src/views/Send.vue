<template>
    <b-container>
        <button class="btn btn-primary" v-if="!scan" @click="scan = true">Have QR Code?</button>
        <qrcode-stream v-if="scan" @decode="onDecode"></qrcode-stream>

        <b-form>
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

            <b-button type="submit" variant="primary" block>Send</b-button>
        </b-form>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AccountCreator from '@/components/account/AccountCreator.vue';
import AccountImporter from "@/components/account/AccountImporter.vue";
import AccountList from "@/components/account/AccountList.vue";
import {mapGetters, mapState} from "vuex";
import {Wallet} from "@/service/wallet"; // @ is an alias to /src

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

    onDecode (decodedString) {
        const split = decodedString.split('::');
        this.to = split[0];
        this.amount = split[1];
    }
}
</script>

<style lang="scss" scoped>
</style>