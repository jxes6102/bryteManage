import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import parameterView from '../views/parameter/index.vue'
import permissionView from '../views/permission/index.vue'
import announcementView from '../views/announcement/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/parameterView',
      name: 'parameterView',
      component: parameterView
    },
    {
      path: '/permissionView',
      name: 'permissionView',
      component: permissionView
    },
    {
      path: '/announcementView',
      name: 'announcementView',
      component: announcementView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
