<template>
  <b-card-body>
    <h4>{{ title }} - {{ 100 }}</h4>
    <b-table responsive striped hover
             :items="transactions"
    ></b-table>

    <b-pagination
        v-model="currentPage"
        :total-rows="100"
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
    ...mapGetters(['networkTransactions'])
  },
  methods: {
    ...mapActions(['getMLRequests', 'sync'])
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
    @Prop()
    public walletAddress;

    mounted() {
      this.getAllTransactions();
    }

    getMLRequests !: (payload: any) => Promise<void>;
    sync !: (payload: any) => Promise<void>;

    handleClick(event, pageNumber) {
      this.currentPage = pageNumber;
      this.getAllTransactions();
    }

    getAllTransactions() {
      /* if (this.pendingOrNot === 'full') {
        this.sync({ currentPage: this.currentPage, title: this.title, address: this.walletAddress })
      }
      else {
        this.getMLRequests({currentPage: this.currentPage, pending: this.pendingOrNot});
      } */
      this.getMLRequests({currentPage: this.currentPage, pending: this.pendingOrNot});
    }
}
</script>
