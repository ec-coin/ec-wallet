<template>
    <b-card header="Import existing account">
        <b-form>
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

            <b-button type="submit" variant="primary" block>Import wallet</b-button>
        </b-form>
    </b-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as bip39 from "bip39";

@Component
export default class AccountImporter extends Vue {
    public name = '';
    public password = '';
    public seedphrase = '';

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
