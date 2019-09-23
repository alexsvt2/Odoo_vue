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
export default {
  props: {
    productList: Array
  },
  async created() {
    this.stockInventory = this.$store.getters.stockInventory;
    this.paramId = this.$route.params.id;
    // this.
    await axios
      .get(
        `${environment.apiURL}/stock-inventory/stock-inventory-by-id?id=${this.paramId}`
      )
      .then(res => {
        this.stockInventory = res.data[0];
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
          if (res.data.length > 0) {
            if (this.searchBarcodeInput === res.data[0].barcode) {
              if (this.productList.length > 0) {
                this.productList.map(valueMap => {
                  if (valueMap.products[0].barcode === res.data[0].barcode) {
                    console.log(valueMap.products[0]);
                    this.updateProduct(valueMap);
                  } else {
                    console.log('no hay');
                  }
                });
              } else {
                this.addProduct(res.data[0]);
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
    // Calle Miza 7213, Colinas de Agua Caliente.
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
