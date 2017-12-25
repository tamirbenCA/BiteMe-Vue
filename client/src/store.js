import Vuex from 'vuex';
import usersModule from './modules/users.module';

// const isProduction = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
    modules: {
      user : usersModule,
    //   shop: shopModule,
    //   cart : cartModule
    },
    // strict : !isProduction
  })
  