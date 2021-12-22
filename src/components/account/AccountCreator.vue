<template>
    <b-card header="Add new account">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
    </b-card>
<!--    <div class="container-creator">-->
<!--        <h4>Create new account</h4>-->
<!--        <textarea disabled="disabled" v-model="mnemonic" v-if="mnemonic !== ''"></textarea>-->
<!--        <button v-on:click="generate()">Generate</button>-->
<!--    </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as bip39 from "bip39";

@Component
export default class AccountCreator extends Vue {
    public mnemonic = '';

    generate() {
        this.mnemonic = bip39.generateMnemonic();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
