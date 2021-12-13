<template>
    <div class="container">
        <div class="left">
            <AccountCreator></AccountCreator>
            <AccountImporter></AccountImporter>
        </div>
        <div class="right">
            <AccountList></AccountList>
        </div>
    </div>
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
.container {
    display: flex;
    padding: 0 200px;

    .left {
        width: 30%;
    }

    .right {
        width: 70%;
    }
}
</style>