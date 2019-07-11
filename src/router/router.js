import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import LoginForm from '../components/LoginForm.vue'
import Favorites from '../components/Favorites.vue'
import Albums from '../components/Albums.vue'
import Photos from '../components/Photos.vue'


Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: App, meta: { requiresAuth: true } },
    { path: '/login', component: LoginForm },
    { path: '/favorites', component: Favorites, meta: { requiresAuth: true }},
    { path: '/albums', component: Albums, meta: { requiresAuth: true } },
    { path: '/albums/:id', component: Photos}
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    if (user.status !== "logged_in") {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() 
  }
});

export default router;