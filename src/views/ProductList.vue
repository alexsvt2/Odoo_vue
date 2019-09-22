<template>
  <div style="margin-left: 10px">
    <h1 v-if="!loading">{{ products["0"].inventory_id[1] }}</h1>

    <v-alert v-if="errors && errors.length" type="error">
      <p v-for="error of errors" :key="error">{{ errors }}</p>
    </v-alert>

    <v-list-item v-ripple v-for="(product, index) in products" :key="index">
      <v-list-item-avatar>
        <v-img
          :src="'data:image/jpeg;base64,' + product.products[0].image"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ product.product_id[1] }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- <v-simple-table v-if="products && products.length">
      <thead>
        <tr>
          <th class="text-left">Producto</th>
          <th class="text-left">Precio</th>
          <th class="text-left">Cantidad</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td >{{ product.product_id[1] }}</td>
          <td>{{ currencyFormat(product) }}</td>
          <td>{{ product.product_qty }}</td>
          <td>
            <DialogProduct
              v-bind:title="product.product_id[1]"
              v-bind:product_qty="product.product_qty"
              v-bind:list_price="currencyFormat(product)"
              v-bind:category="product.products[0].categ_id[1]"
              v-bind:theoretical_qty="product.theoretical_qty"
            />
            <v-btn
              text
              small
              color="primary"
              @click="goToProductDetail(product.id)"
            >
              <v-icon>open_in_new</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table> -->
  </div>
</template>


<script>
import axios from "axios";
import DialogProduct from "./../components/DialogProduct";

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
      loading: false
    };
  },
  watch: {
    search: function() {}
  },
  computed: {},
  created() {
    this.stockInventoryId = this.$route.params.id;
    this.productList(this.stockInventoryId);
    this.debouncedGetAnswer = this.lodash.debounce(this.getResults, 500);
  },
  methods: {
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
    // This methods helps to handle the Currency Format in Price List
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
