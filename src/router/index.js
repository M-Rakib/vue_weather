import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'
import { nextTick } from 'vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/weather/:state/:city',
      name: 'CityView',
      component: CityView,
      meta: {
        title: "Weather",
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title} | Weather App - Vue 3`
  next()
});

export default router
