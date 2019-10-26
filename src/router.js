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
      meta: { requiresAuth: true }
      // beforeEnter: (to, from, next) => {
      //   console.log(to)
      //   next('/');
      // }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { requiresAuth: true }
    },
    {
      path: '/stock_inventory',
      name: 'stockInventory',
      component: StockInventory,
      meta: { requiresAuth: true }
    },
    {
      path: '/stock_inventory/product_list/:id',
      name: 'product_list',
      component: ProductList,
      meta: { requiresAuth: true }
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   // debugger;
//   if (usuario_logeado) {
//     console.log('El usuario esta logeado');
//     if (
//       to.name === 'home' ||
//       to.name === 'about' ||
//       to.name === 'stockInventory'
//     ) {
//       console.log('El usuario es redirigido');
//       next('/home');
//     }
//   } else {
//     next('/');
//   }
//   next();
// });

var loggedUser = true;

// router.beforeEach((to, from, next) => {
//   var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth && loggedUser) {
//     next({ path: '/home' }); // Autenticacion requerida Login
//   } else if (loggedUser === false) {
//     next({ path: '/' });
//   }
//   next();
// });

// Este ejemplo me lo encontre en un foro, parece que es el definitivo
// router.beforeEach((to, from, next) => {
//   var requiresAuth = to.matched.some( record => record.meta.requiresAuth );
//   var currentUser = false;
//   // when route requires auth and there's no current user, reidrect to '/login'
//   if(requiresAuth && !currentUser){
//     next('/login');
//   // when we go to login route and are already logged in, we can skip this page
//   // so we redirect to the homepage
//   } else if (to.path == '/login' && currentUser){
//     next('/');
//   // if none of the above matches, we have a normal navigation that should just go through
//   // so we call `next()`
//   } else {
//     next(); // you called `next('/')` which redirected to the homepage over and over again.
//   }
// });

export default router;
