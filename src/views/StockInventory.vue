<template>
  <div>
    <v-list-item
      v-ripple
      v-for="(item, index) in stockInventories"
      :key="index"
      @click="goToStockInventoryDetail(item.id)"
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
        .get(`http://192.168.100.59:3000/stock-inventory?offset=0&limit=10`)
        .then(response => {
          this.stockInventories = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style lang="stylus"></style>