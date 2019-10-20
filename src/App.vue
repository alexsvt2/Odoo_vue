<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <list dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Odoo Inventary/VueApp</span>
      </v-toolbar-title>


<!-- Iconos y Espacio en Nav -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
          </v-img></v-avatar>
      </v-btn>

      <!-- Iconos y Espacio en Nav -->


    </v-app-bar>

    <v-content style="margin-top: 10px">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => ({
    drawer: null,
    items: [
    // Estas rutas deben cambiarse para hacerlas dinamicas(Pendiente de Entender como Mejorarla)
      { icon: 'home', text: 'Inicio', link: '/' },
      { icon: 'list', text: 'Stock Inventory', link: '/stock_inventory' },
      { icon: 'info', text: 'About', link: '/about' },
      // { icon: 'contacts', text: 'Product List', link: '/product_list' }
    ]
  })
};
</script>
