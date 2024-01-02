import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import parameterView from '../views/parameter/index.vue'
import permissionView from '../views/permission/index.vue'
import newsView from '../views/news/index.vue'
import pointView from '../views/point/index.vue'
import notificationView from '../views/notification/index.vue'
import organizeView from '../views/organize/index.vue'
import errorView from '../views/errorView.vue'

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
      path: '/newsView',
      name: 'newsView',
      component: newsView 
    },
    { 
      path: '/pointView',
      name: 'pointView',
      component: pointView 
    },
    { 
      path: '/pointView',
      name: 'pointView',
      component: pointView 
    },
    { 
      path: '/notificationView',
      name: 'notificationView',
      component: notificationView 
    },
    { 
      path: '/organizeView',
      name: 'organizeView',
      component: organizeView 
    },
    { 
      path: '/:pathMatch(.*)*',
      component: errorView 
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
