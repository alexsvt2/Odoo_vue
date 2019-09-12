<template>
  <div style="margin-left: 10px">
    <!-- Los estilos Son temporales -->
    <h1 style="margin-top: 10px">Odoo Product List</h1>

    <!-- <v-text-field label="Search Product" v-model="search"></v-text-field> -->

    <v-alert v-if="errors && errors.length" type="error">
      <p v-for="error of errors">{{errors}}</p>
    </v-alert>

    <v-simple-table v-if="products && products.length">
      <thead>
        <tr>
          <!-- <th class="text-left">ID</th> -->
          <th class="text-left">Producto</th>
          <th class="text-left">Precio</th>
          <th class="text-left">Cantidad</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <!-- <td>{{ product.id }}</td> -->
          <td>{{ product.product_id[1] }}</td>
          <td>{{ product.products[0].list_price }}</td>
          <td style="text-align: right">{{product.product_qty}}</td>

          <td>
            <div class="text-center">
              <v-btn text small color="primary" @click="detailDialog(product.id)">
                <v-icon>open_in_new</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <!-- Pagination inactiva hasta poder tener el total de Productos
      <div class="text-center">
      <v-pagination v-model="page" :length="1"></v-pagination>
    </div>-->
  </div>
</template>


<script>
import axios from "axios";
var _ = require("lodash");
export default {
  data() {
    return {
      search: "",
      products: [],
      errors: [],
      stockInventoryId: 0
    };
  },
  watch: {
    search: function() {
      // this.getResults(this.search); // Nada mas tengo que traer el input dentro de la funcion
      // this.debouncedGetAnswer;
    }
  },
  computed: {},
  created() {
    this.stockInventoryId = this.$route.params.id;
    this.productList(this.stockInventoryId);
    this.debouncedGetAnswer = this.lodash.debounce(this.getResults, 500);
  },
  methods: {
    detailDialog(id) {
      alert(`${id}`);
    },
    getResults: function(term) {
      axios
        .get(
          `http://localhost:3000/stock-inventory/stock-details/get-product-by-filters?value=${term}`
        )
        .then(response => {
          this.products = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    productList(stockInventoryId) {
      axios
        .get(
          `http://localhost:3000/stock-inventory/stock-details?inventory_id=${stockInventoryId}`
        )
        .then(response => {
          this.products = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
      // .then(response => {
      //   this.products = response.data;
      // })
      // .catch(e => {
      //   this.errors.push(e);
      // });
    }
  }
};

// http://localhost:3000/stock-inventory/stock-details/get-product-by-filters?value=ValordeBusqueda
// http://localhost:3000/stock-inventory/stock-details
// http://localhost:3000/stock-inventory/stock-details/get-product-by-id?product_id=1
</script>