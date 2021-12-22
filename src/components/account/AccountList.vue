<template>
    <div class="accordion" role="tablist">
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-1 variant="primary">Main Wallet (100 EC)</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <h4>Transactions</h4>
                    <b-table striped hover :items="items"></b-table>
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-2 variant="primary">Second Wallet (50 EC)</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <h4>Transactions</h4>
                    <b-table striped hover :items="items"></b-table>
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-3 variant="primary">Thrid Wallet (300 EC)</b-button>
            </b-card-header>
            <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <h4>Transactions</h4>
                    <b-table striped hover :items="items"></b-table>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as bip39 from "bip39";

@Component
export default class AccountList extends Vue {
    public items = [
        { from: '0xFF', to: '0xAA', amount: 40, timestamp: '15-10-2021 14:32:33' },
        { from: '0xFF', to: '0xAA', amount: 40, timestamp: '15-10-2021 14:32:33' },
        { from: '0xFF', to: '0xAA', amount: 40, timestamp: '15-10-2021 14:32:33' },
        { from: '0xFF', to: '0xAA', amount: 40, timestamp: '15-10-2021 14:32:33' },
        { from: '0xFF', to: '0xAA', amount: 40, timestamp: '15-10-2021 14:32:33' },
    ];

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
