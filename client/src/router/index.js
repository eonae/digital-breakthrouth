// router

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import MapScreen from '../views/MapScreen.vue'
import ProfileScreen from '../views/ProfileScreen.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/map', name: 'Tracking...', component: MapScreen },
    { path: '/profile', component: ProfileScreen },
    { path: '/', redirect: '/map' }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('to:', to);
  console.log('from:', from);
  next();
});

function checkUser(to, from, next) {

  if (!store.state.user.initialized) {
    store
      .dispatch('user/require')
      .then(() => {

        if (!store.state.user.authorized) {

          next(from.path == '/' ? '/home' : false);
        } next();
      })
      .catch(() => {

        next(false);
      })
  } else {
    if (!store.state.user.authorized) {
      next(from.path('/') ? '/home' : false);
    } next();
  }
}

export default router;