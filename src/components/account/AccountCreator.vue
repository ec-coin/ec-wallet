<template>
    <b-card header="Add new account">
        <b-form @submit="generate">
            <b-form-group
                id="input-group-1"
                label="Name:"
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
                label="Password:"
                label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required
                ></b-form-input>
            </b-form-group>

            <b-alert variant="danger" v-if="!isPasswordCorrect && name.length >= 3 && password.length > 0" show>This password is incorrect!</b-alert>
            <b-button type="submit" variant="primary" block :disabled="!isPasswordCorrect || name.length < 3">Add new wallet</b-button>

            <b-form-group label="Your seed phrase" v-if="mnemonic.length !== 0">
                <b-form-textarea
                    id="textarea"
                    v-model="mnemonic"
                    rows="3"
                    max-rows="6"
                    disabled
                ></b-form-textarea>
            </b-form-group>

        </b-form>


    </b-card>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import * as bip39 from "bip39";
import {Storage} from "@/service/storage";
import {mapActions} from "vuex";

@Component({
    methods: {
        ...mapActions(['createWallet'])
    }
})
export default class AccountCreator extends Vue {
    public name = '';
    public password = '';
    public mnemonic = '';
    public stakeAccount = true;
    public isPasswordCorrect = false;

    createWallet!: (payload: any) => Promise<void>;

    generate(e: any) {
        e.preventDefault();
        this.mnemonic = bip39.generateMnemonic();
        this.createWallet({ name: this.name, seedphrase: this.mnemonic, password: this.password, stakeaccount: this.stakeAccount});
        this.name = '';
        this.isPasswordCorrect = false;
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
