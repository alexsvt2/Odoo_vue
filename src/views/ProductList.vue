<template>
  <div style="margin-left: 10px">
    <search-products
      :productList="products"
      @triggerProductsList="productList(stockInventoryId)"
    ></search-products>
    <!-- <h1>{{ products["0"].inventory_id[1] }}</h1> -->
    <!-- Investigar para manejar el nombre dinamico -->

    <v-alert v-if="errors && errors.length" type="error">
      <p v-for="error of errors" :key="error">{{ errors }}</p>
    </v-alert>

    <v-list-item
      v-ripple
      v-for="(product, index) in products"
      :key="index"
      v-on:click="toggleDialogProductbyId($event, product)"
    >
      <v-list-item-avatar tile>
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
          <v-toolbar-title>{{
            itemForDialog.product_description
          }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Confirm</v-btn>
            <v-btn dark text @click="updateProduct(itemForDialog)">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field
                  v-model="itemForDialog.product_qty"
                  label="Stock"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <div
      style="position: fixed; bottom: 0px;  left: 0px; right: 0px; width: 100%; height: 120px; display: flex; flex-direction: column;"
    >
      <button style="height: 60px"><v-icon>mdi-watch</v-icon>Añadir</button>
      <button style="height: 60px">Validar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DialogProduct from './../components/DialogProduct';
import searchProducts from './../components/SearchProducts';
import environment from './../environment';

var _ = require('lodash');
export default {
  components: {
    searchProducts,
    DialogProduct
  },
  data() {
    return {
      search: '',
      products: [],
      errors: [],
      stockInventoryId: 0,
      dialog: false,
      inset: false,
      loading: false,
      itemForDialog: {}
    };
  },
  created() {
    this.stockInventoryId = this.$route.params.id;
    this.productList(this.stockInventoryId);
    this.debouncedGetAnswer = this.lodash.debounce(this.getResults, 500);
  },
  methods: {
    toggleDialogProductbyId(event, item) {
      this.itemForDialog = {
        id: item.id,
        product_qty: item.product_qty,
        product_id: item.product_id[0],
        product_description: item.product_id[1],
        state: item.state,
        inventory_id: item.inventory_id[0],
        location_id: item.location_id[0],
        list_price: item.products[0].list_price,
        theoretical_qty: item.theoretical_qty,
        __last_update: item.__last_update
      };
      this.dialog = !this.dialog;
    },
    goToProductDetail(id) {
      this.$router.push({ path: `/product_detail/${id}` });
    },
    getResults: function(term) {
      axios
        .get(
          `${environment.apiURL}/stock-inventory/stock-details/get-product-by-filters?value=${term}`
        )
        .then(response => {
          this.products = response.data.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    async updateProduct(productLine) {
      const params = {
        id: productLine.id,
        product_id: productLine.product_id,
        product_qty: Number(productLine.product_qty),
        inventory_id: productLine.inventory_id,
        location_id: productLine.location_id
      };

      await axios
        .put(`${environment.apiURL}/stock-inventory/stock-details`, params)
        .then(res => {
          console.log(res.statusText);
          this.dialog = !this.dialog;

          if (res.data.error !== '') {
            console.log(JSON.stringify(res.data.error));
          } else {
            this.productList(this.stockInventoryId)
          }
        })
    },
    productList(stockInventoryId) {
      this.loading = true;
      axios
        .get(
          `${environment.apiURL}/stock-inventory/stock-details?inventory_id=${stockInventoryId}`
        )

        .then(response => {
          this.products = response.data.data;
        })
        .catch(err => {
          this.err.push(err);
        });
    },
    currencyFormat: function(product) {
      return (
        '$' +
        product.products[0].list_price
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      );
    }
  }
};
</script>
