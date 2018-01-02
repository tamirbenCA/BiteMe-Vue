import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import HomePage from '@/components/HomePage'
import Menu from '@/components/Menu'
import JoinIn from '@/components/JoinIn'
import itemsByTag from '@/components/itemsByTag'
import SearchedItems from '@/components/SearchedItems'
import LogIn from '@/components/LogIn'
import ItemDetails from '@/components/ItemDetails'
// import Map from '@/components/Map'
import ManageOrders from '@/components/ManageOrders'
import AdminPage from '@/components/AdminPage'
import AboutUs from '@/components/AboutUs'
import MyCart from '@/components/MyCart'
import EditItem from '@/components/EditItem'
import SellersList from '@/components/SellersList'
import ItemsBySeller from '@/components/ItemsBySeller'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/meals',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/join',
      name: 'JoinIn',
      component: JoinIn
    },
    // {
    //   path: '/items/:tag',
    //   name: 'itemsByTag',
    //   component: itemsByTag
    // },
    // {
    //   path: '/searchedItems/:key',
    //   name: 'SearchedItems',
    //   component: SearchedItems
    //   // component: itemsByTag
    // },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/itemdetails/:itemId',
      name: 'ItemDetails',
      component: ItemDetails
    },
    {
      path: '/manageorders/:userid',
      name: 'ManageOrders',
      component: ManageOrders,
      beforeEnter: (to, from, next) => {
        // console.log('to:', to)
        if (to.params.userid === store.getters.userId) {
          next()
        } else {
          console.log('forbidden access');
          console.log(this)
          next(false) 
        }
      }
    },
    // {
    //   path: '/map',
    //   name: 'Map',
    //   component: Map,
    // },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminPage,
      beforeEnter: (to, from, next) => {
        // console.log('to:', to)
        // console.log('store:', store.getters.loggedinUser.itemsForSale)
        if (store.getters.isAdmin) {
          next()
        } else {
          console.log('forbidden access');
          next(false)
          this.router.push('/')
          }
        }
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/aboutus#our-mission',
      name: 'our-mission',
      component: AboutUs
    },
    {
      path: '/myCart',
      name: 'myCart',
      component: MyCart
    },
    {
    path: '/additem',
    name: 'addItem',
    component: EditItem
    },
    {
    path: '/item/:itemId/edit',
    name: 'editItem',
    component: EditItem,
    beforeEnter: (to, from, next) => {
      // console.log('to:', to)
      // console.log('store:', store.getters.loggedinUser.itemsForSale)
      if (store.getters.loggedinUser.itemsForSale.includes(to.params.itemId)) {
        next()
      } else {
        console.log('forbidden access');
        next(false) 
        }
      }
    },
    {
      path: '/sellerslist',
      component: SellersList
    },
    {
      path: '/items/seller/:sellerId',
      component: ItemsBySeller
    },
    {
      path: '/items',
      component: SearchedItems
    }
  ],

  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})
