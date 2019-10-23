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
      component: Home,
      beforeEnter: (to, from, next) => {
        console.log(to)
        next('/');
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      beforeEnter: (to, from, next) => {
        console.log(to)
        next('/');
      }
    },
    {
      path: '/stock_inventory',
      name: 'stockInventory',
      component: StockInventory,
      beforeEnter: (to, from, next) => {
        console.log(to)
        next('/');
      }
    },
    {
      path: '/stock_inventory/product_list/:id',
      name: 'product_list',
      component: ProductList
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (true) {
//     console.log(router.currentRoute.path);
//   	next('/login')
//   } else {
//   	next('/home')
//   }
// });

export default router;
