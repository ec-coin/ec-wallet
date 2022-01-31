<template>
  <b-card-body>
    <h4>{{ title }} - {{ totalRows[title] }}</h4>
    <b-table responsive striped hover
             :items="transactions"
    ></b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="totalRows[title]"
        :per-page="perPage"
        aria-controls="my-table"
        align="fill"
        first-number
        last-number
        @page-click="handleClick"
    ></b-pagination>
  </b-card-body>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {mapActions, mapGetters} from "vuex";

@Component({
  computed: {
    ...mapGetters(['networkTransactions', 'totalRows'])
  },
  methods: {
    ...mapActions(['getTransactions'])
  }
})
export default class TransactionsOverview extends Vue {
  public currentPage = 1;
  public perPage = 10;
  @Prop()
  public title;
  @Prop()
  public filter;
  @Prop()
  public transactions;
  @Prop()
  public pendingOrNot;

  mounted() {
    this.getTransactions({currentPage: 1, pending: this.pendingOrNot});
  }

  getTransactions !: (payload: any) => Promise<void>;

  handleClick(event, pageNumber) {
    this.currentPage = pageNumber;
    this.getTransactions({currentPage: this.currentPage, pending: this.pendingOrNot});
  }
}
</script>
