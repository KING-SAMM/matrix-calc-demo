import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Matrix2x2 from './views/Matrix2x2.vue'
import Matrix3x3 from './views/Matrix3x3.vue'
import Vector from './views/Vector.vue'
import Logarithm from './views/Logarithm.vue'
import NumberSystems from './views/NumberSystems.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/matrix2x2',
      name: 'matrix2x2',
      component: Matrix2x2
    },
    {
      path: '/matrix3x3',
      name: 'matrix3x3',
      component: Matrix3x3
    },
    {
      path: '/vector',
      name: 'vector',
      component: Vector
    },
    {
      path: '/logarithm',
      name: 'logarithm',
      component: Logarithm
    },
    {
      path: '/numbersystems',
      name: 'numbersystems',
      component: NumberSystems
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
