import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Landing from '../views/Landing.vue'
import { Dictionary } from 'vue-router/types/router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/projects',
    name: 'Projects',
    component: Home
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: {
      hideTitle: true
    }
  },
  {
    path: '/projects/:id',
    name: 'project-details',
    props (route) {
      return route.params
    },
    component: () => import(/* webpackChunkName: "projects" */ '@/views/Project.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
