<template>
  <div>
    <input
      style="background: grey;"
      v-model="searchBarcodeInput"
      type="text"
      @keypress.enter="onSearchProductBarcode"
    />
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <v-btn color="pink" text @click="snackbar = false">CERRAR</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios';
import environment from './../environment';
const PouchDB = require('pouchdb').default;

var db = new PouchDB('stockInventory');
export default {
  props: {
    productList: Array
  },
  async created() {
    await db
      .get('stockInventory')
      .then(doc => {
        this.stockInventory = doc.stockInventory;
        console.log(this.stockInventory);
      })
      .catch(err => {
        console.log(err);
      });
    this.paramId = this.$route.params.id;
    // this.
    await axios
      .get(
        `${environment.apiURL}/stock-inventory/stock-inventory-by-id?id=${this.paramId}`
      )
      .then(res => {
        this.stockInventory = res.data.data[0];
        console.log(this.stockInventory);
      });
  },
  data() {
    return {
      paramId: 0,
      searchBarcodeInput: '',
      snackbar: false,
      snackbarText: '',
      stockInventory: Array
    };
  },
  methods: {
    async onSearchProductBarcode() {
      await axios
        .get(
          `${environment.apiURL}/stock-inventory/stock-details/get-product-by-barcode?barcode=${this.searchBarcodeInput}`
        )
        .then(res => {
          const response = res.data.data;
          console.log(response);
          if (response.length > 0) {
            console.log(response[0].barcode);
            // Verifica que el input sea igual al barcode retornado en posicion
            if (this.searchBarcodeInput === response[0].barcode) {
              // si la longitud de los productos de stock.inventory.line es mayor a 0
              // verificara si no existe en el array de productosList
              // usando el barcode como referencia
              if (this.productList.length > 0) {
                this.productList.map(valueMap => {
                  // si existe, actualizará y sumará uno a la cantidad
                  if (valueMap.products[0].barcode === response[0].barcode) {
                    console.log(valueMap.products[0]);
                    this.updateProduct(valueMap);
                  } else {
                    // Sino existe agregará un nuevo valor y en 1. utilizando el resultado de la llamada
                    // de odoo
                    this.addProduct(response[0]);
                  }
                });
              } else {
                this.addProduct(response[0]);
              }
            }
          } else {
            this.snackbar = true;
            this.snackbarText = 'No se encontró el producto';
            setTimeout(() => {
              this.snackbar = false;
            }, 5000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    async addProduct(productSearched) {
      console.log(productSearched);
      const params = {
        inventory_id: this.stockInventory.id,
        product_qty: 1,
        product_id: productSearched.id,
        location_id: this.stockInventory.location_id[0]
      };
      console.log(params);
      await axios
        .post(`${environment.apiURL}/stock-inventory/stock-details`, params)
        .then(res => {
          console.log('resultado', res);
        });
    },

    async updateProduct(stockInventoryLine) {
      console.log('productList', this.productList);
      stockInventoryLine.product_qty = stockInventoryLine.product_qty + 1;
      const params = {
        id: stockInventoryLine.id,
        inventory_id: this.stockInventory.id,
        product_qty: stockInventoryLine.product_qty + 1,
        product_id: stockInventoryLine.product_id[0],
        location_id: this.stockInventory.location_id[0]
      };
      console.log(params);
      await axios
        .put(`${environment.apiURL}/stock-inventory/stock-details`, params)
        .then(res => {
          console.log('resultado update', res);
        });
    }
    // async executeState(productList, searched) {
    //   productList.map(valueMap => {
    //     if (valueMap.products[0].barcode === searched[0].barcode) {
    //       console.log('El producto existe');
    //     }
    //   });
    // }
  }
};
</script>

<style>
</style>
