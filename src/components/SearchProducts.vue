<template>
  <div>
    <input
      id="barcode-search"
      style="background: grey;"
      v-model="searchBarcodeInput"
      type="text"
      @keypress.enter="onSearchProductBarcode"
      :disabled="inputState"
      autofocus
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
        // console.log(this.stockInventory);
      })
      .catch(err => {
        console.log(err);
      });
    this.paramId = this.$route.params.id;
    await axios
      .get(
        `${environment.apiURL}/stock-inventory/stock-inventory-by-id?id=${this.paramId}`
      )
      .then(res => {
        this.stockInventory = res.data.data[0];
      });
  },
  data() {
    return {
      paramId: 0,
      searchBarcodeInput: '',
      snackbar: false,
      snackbarText: '',
      stockInventory: Array,
      inputState: false
    };
  },
  methods: {
    async onSearchProductBarcode() {
      this.inputState = true;
      await axios
        .get(
          `${environment.apiURL}/stock-inventory/stock-details/get-product-by-barcode?barcode=${this.searchBarcodeInput}`
        )
        .then(res => {
          const response = res.data.data;
          // console.log(response);
          if (response.length > 0) {
            // Verifica que el input sea igual al barcode retornado en posicion
            if (this.searchBarcodeInput === response[0].barcode) {
              // si la longitud de los productos de stock.inventory.line es mayor a 0
              // verificara si no existe en el array de productosList
              // usando el barcode como referencia
              if (this.productList.length > 0) {
                let mapIndex = -1;
                this.productList.map((valueMap, index) => {
                  // si existe, actualizará y sumará uno a la cantidad
                  if (valueMap.products[0].barcode === response[0].barcode) {
                    mapIndex = index;
                  }
                });
                console.log(mapIndex);
                if (mapIndex !== -1) {
                  console.log(this.productList[mapIndex]);
                  this.updateProduct(this.productList[mapIndex]);
                  // Aqui esta lo que necesito, pero que no entiendo
                } else {
                  this.addProduct(response[0]);
                }
              } else {
                this.addProduct(response[0]);
              }
            }
          } else {
            this.snackbar = true;
            this.snackbarText = 'No se encontró el producto';
            this.inputState = true;
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
          this.inputState = false;
          setTimeout(() => {
            document.getElementById('barcode-search').focus();
            this.searchBarcodeInput = '';
          }, 100);
          if (res.data.error !== '') {
            console.log(JSON.stringify(res.data.error));
          } else {
            this.$emit('triggerProductsList');
          }
        });
    },

    async updateProduct(stockInventoryLine, qty=1) {
      const params = {
        id: stockInventoryLine.id,
        inventory_id: this.stockInventory.id,
        product_qty: stockInventoryLine.product_qty + qty,
        product_id: stockInventoryLine.product_id[0],
        location_id: this.stockInventory.location_id[0]
      };

      await axios
        .put(`${environment.apiURL}/stock-inventory/stock-details`, params)
        .then(res => {
          setTimeout(() => {
            document.getElementById('barcode-search').focus();
            this.searchBarcodeInput = '';
          }, 100);
          this.inputState = false;
          if (res.data.error !== '') {
            console.log(JSON.stringify(res.data.error));
          } else {
            this.$emit('triggerProductsList');
          }
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
