<template>
  <b-card-body>
    <h4>{{ title }}</h4>
    <b-table responsive striped hover
             :items="networkTransactions.filter(filter)"
             :per-page="perPage"
             :current-page="currentPage"
    ></b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="networkTransactions.length"
        :per-page="perPage"
        aria-controls="my-table"
        limit="7"
        align="fill"
        first-number
        last-number
    ></b-pagination>
  </b-card-body>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {mapActions, mapGetters} from "vuex";

@Component({
  computed: {
    ...mapGetters(['networkTransactions'])
  }
})
export default class TransactionsOverview extends Vue {
  public currentPage = 1;
  public rows = 0;
  public perPage = 10;
  @Prop()
  public title;
  @Prop()
  public filter;
}
</script>
