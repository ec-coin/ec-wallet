<template>
    <b-card header="Import existing account">
        <b-form @submit="submit">
            <b-form-group
                id="input-group-1"
                label="Name"
                label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="name"
                    type="text"
                    placeholder="My new wallet"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-1"
                label="Password"
                label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Seed phrase">
                <b-form-textarea
                    id="textarea"
                    v-model="seedphrase"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </b-form-group>

            <b-form-checkbox
                id="checkbox-1"
                v-model="stakeAccount"
                name="checkbox-1"
                value="true"
                unchecked-value="false">
              Is Stake Account
            </b-form-checkbox>

            <b-alert style="margin-top: 10px;" variant="danger" v-if="!isPasswordCorrect && name.length >= 3 && password.length > 0" show>This password is incorrect!</b-alert>
            <b-button style="margin-top: 10px;" type="submit" variant="primary" block :disabled="!isPasswordCorrect || name.length < 3 || seedphrase.split(' ').length < 12">Import wallet</b-button>

        </b-form>
    </b-card>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {Storage} from "@/service/storage";
import {Wallet} from "@/service/wallet";
import {mapActions} from "vuex";

@Component({
    methods: {
        ...mapActions(['createWallet'])
    }
})
export default class AccountImporter extends Vue {
    public name = '';
    public password = '';
    public seedphrase = '';
    public stakeAccount = 'false';

    createWallet!: (payload: any) => Promise<void>;

    public isPasswordCorrect = false;

    async submit(e: any) {
        e.preventDefault();
        await this.createWallet({ name: this.name, seedphrase: this.seedphrase, password: this.password, stakeaccount: this.stakeAccount });
        this.name = '';
        this.seedphrase = '';
        this.password = '';
    }

    @Watch('password')
    checkPassword() {
        this.isPasswordCorrect = Storage.isPasswordCorrect('wallets', this.password);
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
