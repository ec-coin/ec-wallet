<template>
  <b-container>
    <b-form>
      <b-form-group
          id="input-group-1"
          label="To"
          label-for="input-1"
          description="">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="Amount"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="amount"
            type="number"
            placeholder="10"
            required
        ></b-form-input>
      </b-form-group>

      <div style="width:150px; margin: 0 auto;" v-if="amount != null">
        <Vue-qr-code :value="selected + '::' + amount" />
      </div>
    </b-form>
  </b-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {mapGetters, mapState} from "vuex";
import {Wallet} from "@/service/wallet"; // @ is an alias to /src
import VueQrCode from 'vue-weblineindia-qrcode'
@Component({
  components: {
    VueQrCode
  },
  computed: {
    ...mapGetters(['wallets'])
  }
})
export default class Receive extends Vue {
    public selected = '';
    public options: any[] = [];
    public amount = null;

    mounted() {
      (this as any).wallets.forEach(wallet => {
        if (this.selected.length == 0) {
          this.selected = wallet.address;
        }
        this.options.push({
          value: wallet.address,
          text: `${wallet.name} (${wallet.address})`
        } as any);
      })
    }
}
</script>

<style lang="scss" scoped>
</style>
