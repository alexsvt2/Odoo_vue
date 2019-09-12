<template>
  <v-card class="mx-auto" max-width="400" tile>
    <v-list-item v-for="item in stockInventories" three-line>
      <v-list-item-content>
        <v-list-item-title>{{item.name}}</v-list-item-title>
        <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{item.state}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon>
          <v-icon @click="goToStockInventoryDetail(item.id)" color="grey lighten-1">mdi-launch</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      stockInventories: []
    };
  },
  created() {
    this.stockInventoryList();
  },
  methods: {
    goToStockInventoryDetail(id) {
      this.$router.push({ path: `/product_list/${id}` });
    },
    stockInventoryList() {
      axios
        .get(`http://localhost:3000/stock-inventory?offset=0&limit=10`)
        .then(response => {
          this.stockInventories = response.data;
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
</script>

<style lang="stylus"></style>