import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import aws_exports from './aws-exports'
import { AmplifyEventBus } from 'aws-amplify-vue';

Amplify.configure(aws_exports)
Vue.use(AmplifyPlugin, AmplifyModules)
Vue.config.productionTip = false

AmplifyEventBus.$on('authState', info => {
  console.log(`Here is the auth event that was just emitted by an Amplify component: ${info}`)
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
