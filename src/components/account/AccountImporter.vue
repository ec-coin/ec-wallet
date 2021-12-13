<template>
    <div class="container-importer">
        <h4>Import account</h4>
        <textarea></textarea><br>
        <button>Import</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as bip39 from "bip39";

@Component
export default class AccountImporter extends Vue {

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container-importer {
    padding: 10px;
    border: 1px solid #eaeaea;
    margin-bottom: 10px;

    button {
        font-size: 24px;
    }

    textarea {
        width: 100%;
        height: 120px;
        margin-bottom: 10px;
    }
}
</style>
