<template>
  <b-card-body>
    <h4>{{ title }}</h4>
    <b-table responsive striped hover
             :items="allTransactions()"
             :per-page="perPage"
             :current-page="currentPage"
    ></b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="allTransactions().length"
        :per-page="perPage"
        aria-controls="my-table"
        limit="7"
        align="fill"
        @page-click="allTransactions()"
        first-number
        last-number
    ></b-pagination>
  </b-card-body>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import axios from "axios";
import {BASE_URL} from "@/main";
import {mapGetters} from "vuex";
import Store from "@/store";

@Component({
  computed: {
    ...mapGetters(['validatedTransactions'])
  }
})
export default class TransactionsOverview extends Vue {
  public currentPage = 1;
  public rows = 0;
  public perPage = 10;
  @Prop()
  public title;
  @Prop()
  public path;
  @Prop()
  public filter;
}
</script>
