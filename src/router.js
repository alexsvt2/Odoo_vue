import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import StockInventory from './views/StockInventory.vue';
import ProductList from './views/ProductList.vue';
import ProductDetail from './views/ProductDetail.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
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
