import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import StockInventory from './views/StockInventory.vue';
import ProductList from './views/ProductList.vue';
// import ProductDetail from './views/ProductDetail.vue';

import Login from './components/Login.vue';

import AboutView from './views/About.vue';
import VueRouter from 'vue-router';

Vue.use(Router);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
      // beforeEnter: (to, from, next) => {
      //   console.log(to)
      //   next('/');
      // }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/stock_inventory',
      name: 'stockInventory',
      component: StockInventory
    },
    {
      path: '/stock_inventory/product_list/:id',
      name: 'product_list',
      component: ProductList
    }
  ]
});

/* Tengo que enviar un array de rutas protegidas o hardcodeado
E igual si intento entrar desde otra ruta, no obedece y entra
to.fullPath('/home')
next('/')
Literalmente con from, tendria que manejar desde donde viene el usuario
*/

router.beforeEach((to, from, next) => {
  // Definir la ruta procedente
  if (false) {
    if (
      to.name === 'home' ||
      to.name === 'about' ||
      to.name === 'stockInventory'
    ) {
      next('/');
    }
  }
  next();
});

export default router;
