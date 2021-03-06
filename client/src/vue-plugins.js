import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import ElTableWrapper from 'element-table-wrapper'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI,  { locale }, /* ElTableWrapper */ )