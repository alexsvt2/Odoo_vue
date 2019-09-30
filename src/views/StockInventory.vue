<template>
  <div>
    <v-list-item
      v-ripple
      v-for="(item, index) in stockInventories"
      :key="index"
      @click="goToStockInventoryDetail(item)"
    >
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle>
        <v-list-item-subtitle>{{ item.state }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import axios from 'axios';
import searchProducts from './../components/SearchProducts';
import environment from './../environment';
const PouchDB = require('pouchdb').default;

var db = new PouchDB('stockInventory');
export default {
  components: {
    searchProducts
  },
  data() {
    return {
      stockInventories: []
    };
  },
  created() {
    this.stockInventoryList();
  },
  methods: {
    async goToStockInventoryDetail(item) {
      console.log(item);
      // this.$store.dispatch('setStockInventory', { item });
      // document.this.$store.commit('setStockInventory', { ...item });
      let error = 0;

      await db
        .get('stockInventory')
        .then(doc => {
          doc.stockInventory = { ...item };
          db.put(doc)
            .then(putDoc => {
              console.log(putDoc);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
          db.put({ _id: 'stockInventory', stockInventory: { ...item } })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        });

      this.$router.push({ path: `/product_list/${item.id}` });
    },
    stockInventoryList() {
      // console.log(
      //   'this.$store.stockInventory',
      //   this.$store.getters.stockInventory
      // );
      axios
        .get(`${environment.apiURL}/stock-inventory?offset=0&limit=10`)
        .then(response => {
          this.stockInventories = response.data.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style lang="stylus"></style>