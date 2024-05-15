import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import  CartView  from '../views/CartView';
import UserView from "../views/UserView";
import ProductoView from "../views/ProductoView";
import LoginView from "../views/LoginView";



Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
    
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/producto',
    name: 'producto',
    component: ProductoView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
