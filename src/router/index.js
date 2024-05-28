import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CartView from '../views/CartView';
import WishView from '../views/WishView';
import UserView from "../views/UserView";
import ProductoView from "../views/ProductoView";
import LoginView from "../views/LoginView";
import SignUpView from "../views/SignUpView";
import MaquillajeView from "../views/MaquillajeView";
import CabelloView from '@/views/CabelloView.vue';
import SkinCareView from '@/views/SkinCareView.vue';
import UñasView from '@/views/UñasView.vue';
import MtdPagoView from '@/views/MtdPagoView.vue';
import HistorialView from '@/views/HistorialView.vue';
import modalReseñas from '@/components/modalReseñas.vue';
import SearchView from '@/views/SearchView.vue';




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView

  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishView
  },
  {
    path: '/producto/:id',
    name: 'producto',
    component: ProductoView,
    props: true
  },
  {
    path: '/reseñas',
    name: 'modalReseñas',
    component: modalReseñas,
    props: true
  },
  {
    path: '/maquillaje',
    name: 'maquillaje',
    component: MaquillajeView
  },
  {
    path: '/cabello',
    name: 'cabello',
    component: CabelloView
  },
  {
    path: '/unas',
    name: 'unas',
    component: UñasView
  }, 
  {
    path: '/skincare',
    name: 'skincare',
    component: SkinCareView
  },
  {
    path: '/metodoPago',
    name: 'metodoPago',
    component: MtdPagoView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/historial',
    name: 'historial',
    component: HistorialView,
    meta: {
      requiresAuth: true
    }
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
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('vue2.token'); // O utiliza Vuex
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // Asegúrate de llamar a next() siempre
  }
});

export default router
