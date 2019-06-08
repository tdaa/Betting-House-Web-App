import Vue from 'vue'
import Router from 'vue-router'
import Events from '../components/Events'
import Login from '../components/Login'
import SignUp from '../components/Signup'
import HomePage from '../components/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    }
  ]
})
