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
    component: LoginView,
    meta: {
      guest: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    meta: {
      guest: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/producto/:id',
    name: 'producto',
    component: ProductoView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reseñas',
    name: 'modalReseñas',
    component: modalReseñas,
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/maquillaje',
    name: 'maquillaje',
    component: MaquillajeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cabello',
    name: 'cabello',
    component: CabelloView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/unas',
    name: 'unas',
    component: UñasView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/skincare',
    name: 'skincare',
    component: SkinCareView,
    meta: {
      requiresAuth: true
    }
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
  const isAuthenticated = !!localStorage.getItem('vue2.token'); // Check if the token exists

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires authentication
    if (!isAuthenticated) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    // Route should be accessible only to guests (unauthenticated users)
    if (isAuthenticated) {
      next({ path: '/home' }); // Redirect authenticated users to a different route
    } else {
      next();
    }
  } else {
    next(); // Ensure to call next() always
  }
});

export default router
