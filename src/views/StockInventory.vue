<template>
  <div>
    <v-simple-table>
      <tbody>
        <tr v-for="(item, index) in stockInventories" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.state}}</td>
          <td>
            <div class="text-center">
              <v-btn text small color="primary" @click="goToStockInventoryDetail(item.id)">
                <v-icon>open_in_new</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
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