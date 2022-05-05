<template>
    <b-container>
        <h2>Login</h2>

        <b-alert variant="danger" v-if="incorrectPassword" show>This password is incorrect!</b-alert>

        <b-form @submit="submit">
            <b-form-group
                id="input-group-1"
                label="API token:"
                label-for="input-1"
                description="Enter your API token to access CGI QML">
                <b-form-input
                    id="input-1"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" block :disabled="password.length < 3">Login</b-button>
        </b-form>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapActions, mapState} from "vuex";

@Component({
    methods: {
        ...mapActions(['login'])
    },
    computed: {
        ...mapState(['incorrectPassword'])
    }
})
export default class UnlockWallet extends Vue {
    public password = '';
    login!: (payload: any) => Promise<void>;

    async submit(e: any): Promise<void> {
        e.preventDefault();
        await this.login({name: "bob", token: this.password});
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
