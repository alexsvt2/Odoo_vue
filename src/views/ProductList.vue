<template>
  <div style="margin-left: 10px">
    <h1 v-if="!loading">{{ products["0"].inventory_id[1] }}</h1>

    <v-alert v-if="errors && errors.length" type="error">
      <p v-for="error of errors" :key="error">{{ errors }}</p>
    </v-alert>

    <v-list-item
      v-ripple
      v-for="(product, index) in products"
      :key="index"
      v-on:click="toggleDialogProductbyId($event, product)"
    >
      <v-list-item-avatar>
        <v-img
          :src="'data:image/jpeg;base64,' + product.products[0].image"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ product.product_id[1] }}</v-list-item-title>
        <v-list-item-subtitle
          >Precio Lista: {{ currencyFormat(product) }}</v-list-item-subtitle
        >
        <v-list-item-subtitle
          >Stock: {{ product.product_qty }}</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-row justify="center"> </v-row>
    </v-list-item>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ itemForDialog.product_id }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Stock: {{ itemForDialog.product_qty}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Cantidad Teorica: {{ itemForDialog.theoretical_qty }}</v-list-item-title>
              <!-- <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import axios from "axios";
import DialogProduct from "./../components/DialogProduct";
import FullscreenDialogProduct from "./../components/FullscreenDialogProduct";

var _ = require("lodash");
export default {
  components: {
    DialogProduct
  },
  data() {
    return {
      search: "",
      products: [],
      errors: [],
      stockInventoryId: 0,
      dialog: false,
      inset: false,
      loading: false,
      itemForDialog: {
        product_id: '',
        product_qty: '',
        list_price: '',
        theoretical_qty: '',
        __last_update: '',
        state: ''
      }
    };
  },
  created() {
    this.stockInventoryId = this.$route.params.id;
    this.productList(this.stockInventoryId);
    this.debouncedGetAnswer = this.lodash.debounce(this.getResults, 500);
  },
  methods: {
    toggleDialogProductbyId(event, item) {
      console.log(item);
      this.itemForDialog.product_id = item.product_id[1];
      this.itemForDialog.product_qty = item.product_qty;
      this.itemForDialog.list_price = item.products[0].list_price;
      this.itemForDialog.theoretical_qty = item.theoretical_qty;
      this.itemForDialog.__last_update = item.__last_update;
      this.itemForDialog.state = item.state;
      console.log(this.itemForDialog);
      this.dialog = !this.dialog;
    },
    goToProductDetail(id) {
      this.$router.push({ path: `/product_detail/${id}` });
    },
    getResults: function(term) {
      axios
        .get(
          `http://192.168.100.59:3000/stock-inventory/stock-details/get-product-by-filters?value=${term}`
        )
        .then(response => {
          this.products = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    productList(stockInventoryId) {
      this.loading = true;
      axios
        .get(
          `http://192.168.100.59:3000/stock-inventory/stock-details?inventory_id=${stockInventoryId}`
        )
        .then(response => {
          this.products = response.data;
          this.loading = false;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    currencyFormat: function(product) {
      return (
        "$" +
        product.products[0].list_price
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      );
    }
  }
};
</script>
