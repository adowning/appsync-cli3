import Vue from 'vue'
import './plugins/vuetify'
import './plugins/amplify'
import CBPlugin from './plugins/cloudboost'
import App from './App.vue'
import router from './router'
import store from './store'
import helpers from './helpers'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(CBPlugin)
// import { Capacitor, Plugins, StatusBarStyle } from '@capacitor/core'
// const { SplashScreen, StatusBar } = Plugins

// Vue.prototype.$platform = Capacitor.platform
// if(Capacitor.platform != 'web'){
//   StatusBar.setBackgroundColor({ color: helpers.env('INITIAL_STATUSBAR_COLOR') }).catch(helpers.err)
//   StatusBar.setStyle({ style: StatusBarStyle.Light }).catch(helpers.err)
//   SplashScreen.hide().catch(err=>{console.log(err)})
// }

Vue.prototype.$helpers = helpers
// function onDeviceReady() {
// console.log(Capacitor.platform)

new Vue({
  router,
  store,
  render: function(h) {
    return h(App)
  },
}).$mount('#app')
//  }
//  document.addEventListener("deviceready", onDeviceReady, false);
