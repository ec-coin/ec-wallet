<template>
    <div id="app">
        <!-- <input type="number" v-model="port"> -->
        <template v-if="loggedIn">
            <!-- <b-container> -->
                <b-navbar toggleable="lg" type="dark" variant="primary">
                    <b-navbar-brand href="#">CGI QML - {{ "J. Mellema" }}</b-navbar-brand>

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item exact-active-class="active" to="/">Dashboard</b-nav-item>
                            <b-nav-item exact-active-class="active" to="/send">Classify</b-nav-item>
                            <b-nav-item exact-active-class="active" to="/receive">Settings</b-nav-item>
                            <b-nav-item exact-active-class="active"  href="https://cgi-iot.visualstudio.com/quantumstage/_wiki/wikis/QuantumStage.wiki/234/Quantum-Computing">Wiki</b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
                <div class="my-4"></div>
                <router-view></router-view>
                <div class="my-4"></div>
            <!-- </b-container> -->
        </template>
        <template v-if="!loggedIn">
            <UnlockWallet></UnlockWallet>
        </template>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

import SetupWallet from "@/components/init/SetupWallet.vue";
import {mapActions, mapState} from "vuex";
import UnlockWallet from "@/components/init/Login.vue";
import AppStorage from "@randlabs/encrypted-local-storage";
import {changeBaseUrl} from "@/main";

@Component({
    components: {UnlockWallet},
    computed: {
        ...mapState(['loggedIn'])
    },
    methods: {
        ...mapActions(['sync', 'getTransactions'])
    }
})
export default class App extends Vue {
    public username = '';
    public port = 4567;

    sync !: (payload: any) => Promise<void>;

    async created() {
      this.username = await AppStorage.getItem("username");
    }

    async mounted(): Promise<void> {
      console.log()
    }

    @Watch('port')
    updatePort() {
        const url = `http://178.63.163.115:${this.port}`
        console.log(url);
        changeBaseUrl(url);
    }
}
</script>

<style lang="scss">

</style>
