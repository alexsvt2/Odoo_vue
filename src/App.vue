<template>
  <v-app>
    <v-navigation-drawer
    v-if="checkCurrentRoute()"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <list dense>
        <v-list-item v-for="(url, i) in urls" :key="i" :to="url.link">
          <v-list-item-icon>
            <v-icon>{{url.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ url.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </list>
    </v-navigation-drawer>
    <v-app-bar
    v-if="checkCurrentRoute()"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Odoo Inventario</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Estos Iconos no los necesito en este momento, pero no los quiero eliminar
       <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>-->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" item>
              <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in itemsUser" :key="index" @click>
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content style="margin-top: 10px">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: null,
    dialog: false,
    urls: [
      { icon: 'home', text: 'Inicio', link: '/home' },
      { icon: 'list', text: 'Stock Inventory', link: '/stock_inventory' },
      { icon: 'info', text: 'About', link: '/about' }
    ],
    itemsUser: [
      { icon: 'home', title: 'Settings' },
      { icon: 'contacts', title: 'Logout' }
    ]
  }),
  created: function() {
  },
  methods: {
    checkCurrentRoute() {
      let currentRoute = this.$router.currentRoute.fullPath;
      if (currentRoute == '/') {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
