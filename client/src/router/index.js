import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import JoinIn from '@/components/JoinIn'
import itemsByTag from '@/components/itemsByTag'

import LogIn from '@/components/LogIn'
import ItemDetails from '@/components/ItemDetails'
import Map from '@/components/Map'
import ManageOrders from '@/components/ManageOrders'

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
      path: '/items/:tag',
      name: 'itemsByTag',
      component: itemsByTag,
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/itemdetails/:itemId',
      name: 'ItemDetails',
      component: ItemDetails,
    },
    {
      path: '/manageorders/:userid',
      name: 'ManageOrders',
      component: ManageOrders,
    },
    {
      path: '/map',
      name: 'Map',
      component: Map,
    }
  ]
})
