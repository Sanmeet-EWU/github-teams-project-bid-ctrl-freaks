import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../pages/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pages/weather'
  },
  {
    path: '/pages/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/pages/weather'
      },
      {
        path: 'map',
        component: () => import('@/pages/Map.vue')
      },
      {
        path: 'weather',
        component: () => import('@/pages/Weather.vue')
      },
      {
        path: 'setting',
        component: () => import('@/pages/Setting.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
