import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import JoinIn from '@/components/JoinIn'
import itemsByTag from '@/components/itemsByTag'


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
  ]
})
