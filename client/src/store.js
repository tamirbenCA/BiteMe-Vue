import userModule from './modules/UserModule.js'


export default new Vuex.Store({
    modules: {
      user : userModule,
    },
    strict : true
  })