<template>
    <b-container>
        <h2>Setup your wallet</h2>
        <b-form @submit="submit">
          <b-form-group
              id="input-group-1"
              label="Username:"
              label-for="input-1"
              description="Choose a personal username for your account.">
            <b-form-input
                id="input-1"
                v-model="username"
                type="text"
                placeholder="Username"
                required
            ></b-form-input>
          </b-form-group>

            <b-form-group
                id="input-group-1"
                label="Password:"
                label-for="input-1"
                description="You will need this password to unlock your wallet next time.">
                <b-form-input
                    id="input-1"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required
                ></b-form-input>
            </b-form-group>


            <b-form-group
                id="input-group-2"
                label="Confirm password:"
                label-for="input-2"
                description="Make sure you make no typos.">
                <b-form-input
                    id="input-2"
                    v-model="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Your seed phrase" description="Make sure to write it down without any mistakes!">
                <b-form-textarea
                    id="textarea"
                    v-model="seedphrase"
                    rows="3"
                    max-rows="6"
                    disabled
                ></b-form-textarea>
            </b-form-group>

           <b-button type="submit" variant="primary" block :disabled="password !== confirmPassword || password.length < 3">Create wallet</b-button>
        </b-form>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapActions} from "vuex";
import {Wallet} from "@/service/wallet";
import AppStorage from "@randlabs/encrypted-local-storage";

@Component({
    methods: {
        ...mapActions(['createWallet'])
    }
})
export default class SetupWallet extends Vue {
    public username = '';
    public password = '';
    public confirmPassword = '';
    public seedphrase = Wallet.generateMnemonic();

    createWallet!: (payload: any) => Promise<void>;

    async submit(e: any): Promise<void> {
        e.preventDefault();

        await AppStorage.createPassword('wallets', this.password);

        await this.createWallet({
            name: 'Main Wallet',
            seedphrase: this.seedphrase,
            password: this.password,
            stakeaccount: 'false'
        });

        await AppStorage.setItem("username", this.username);
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
