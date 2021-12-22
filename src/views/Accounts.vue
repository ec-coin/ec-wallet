<template>
    <b-container>
        <b-row>
            <b-col>
                <AccountCreator></AccountCreator>
                <div class="my-4"></div>
                <AccountImporter></AccountImporter>
            </b-col>
            <b-col cols="8">
                <AccountList></AccountList>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AccountCreator from '@/components/account/AccountCreator.vue';
import AccountImporter from "@/components/account/AccountImporter.vue";
import AccountList from "@/components/account/AccountList.vue"; // @ is an alias to /src

@Component({
    components: {
        AccountList,
        AccountImporter,
        AccountCreator
    }
})
export default class Accounts extends Vue {}
</script>

<style lang="scss" scoped>

</style>