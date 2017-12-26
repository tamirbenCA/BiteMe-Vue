import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import JoinIn from '@/components/JoinIn'
import LogIn from '@/components/LogIn'
import ItemDetails from '@/components/ItemDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/join',
      name: 'JoinIn',
      component: JoinIn,
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/itemdetails/:itemid',
      name: 'ItemDetails',
      component: ItemDetails,
    }
  ]
})
