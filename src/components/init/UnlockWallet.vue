<template>
    <b-container>
        <h2>Unlock your wallet</h2>

        <b-alert variant="danger" v-if="incorrectPassword" show>This password is incorrect!</b-alert>

        <b-form @submit="submit">
            <b-form-group
                id="input-group-1"
                label="Password:"
                label-for="input-1"
                description="Enter password to access your EC wallet">
                <b-form-input
                    id="input-1"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block :disabled="password.length < 3">Unlock</b-button>
        </b-form>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapActions, mapState} from "vuex";

@Component({
    methods: {
        ...mapActions(['unlockWallet'])
    },
    computed: {
        ...mapState(['incorrectPassword'])
    }
})
export default class UnlockWallet extends Vue {
    public password = '';
    unlockWallet!: (payload: any) => Promise<void>;

    async submit(e: any): Promise<void> {
        e.preventDefault();
        await this.unlockWallet(this.password);
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
