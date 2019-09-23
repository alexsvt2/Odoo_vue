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
      <v-btn color="pink" text @click="snackbar = false">
        CERRAR
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    productList: Array
  },
  data() {
    return {
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
          `http://192.168.100.59:3000/stock-inventory/stock-details/get-product-by-barcode?barcode=${this.searchBarcodeInput}`
        )
        .then(res => {
          if (res.data.length > 0) {
            if (this.searchBarcodeInput === res.data[0].barcode) {
              this.productList.map(valueMap => {
                if (valueMap.products[0].barcode === res.data[0].barcode) {
                  //   this.updateState();
                  this.addProduct();
                }
              });
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
        inventory_id: this.stockInventory.inventory_id,
        product_qty: 1,
        // product_id: productSearched[0].id,
        location_id: this.stockInventory.location_id
      };
      console.log(params);
      //   await axios
      //     .post(`http://192.168.100.59:3000/stock-inventory/stock-details`, {})
      //     .then(res => {
      //       console.log(res);
      //     });
    },

    async updateProduct(productSearched) {
      const params = {
        id: stockInventory.id,
        inventory_id: stockInventory.inventory_id,
        product_qty: 1,
        product_id: productSearched[0].id,
        location_id: stockInventory.location_id
      };
      await axios
        .put('http://192.168.100.59:3000/stock-inventory/stock-details', {})
        .then(res => {
          console.log(res);
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
