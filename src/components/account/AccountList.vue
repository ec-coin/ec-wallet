<template>
    <div class="container">
        <table>
            <tr>
                <th>Address</th>
                <th>Balance</th>
                <th>Actions</th>
            </tr>
            <tr>
                <td>n3WbASeUNKN7skRrrGPQFNTR7emR5qHYSX</td>
                <td>50 EC</td>
                <td><button>Delete</button></td>
            </tr>
            <tr>
                <td>KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qY</td>
                <td>100 EC</td>
                <td><button>Delete</button></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as bip39 from "bip39";

@Component
export default class AccountList extends Vue {
    public test = 'foo';

    mounted() {
        this.test = bip39.generateMnemonic();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
