import Vuex from 'vuex';
import userModule from './modules/userModule';

// const isProduction = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
    modules: {
      user : userModule,
    //   shop: shopModule,
    //   cart : cartModule
    },
    // strict : !isProduction
  })
  