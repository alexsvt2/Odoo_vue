<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-items>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/product_list">Product List</v-btn>
        <v-btn text to="/stock_inventory">Stock Inventory</v-btn>
      </v-toolbar-items>
 
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Vue App</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content style="margin-top: 10px">
      <router-view/>
    </v-content>
  </v-app>
</template>
 
<script>
import HelloWorld from "./components/HelloWorld";
 
export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: () => ({})
};
</script>