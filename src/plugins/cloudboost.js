import * as CB from 'cloudboost'
import {  AmplifyEventBus } from 'aws-amplify-vue'
import store from '../store'

CB.CloudApp.init(
  'http://192.168.1.10:4730',
  'devApp',
  '417c9820-6eeb-42a3-b59b-a8eed67b71ca'
)

function getEmployeeList(Vue) {
  var query = new CB.CloudQuery('Employee')
  // query.equalTo('ColumnName', data)
  query.find({
    success: function(list) {
      //list is an array of CloudObjects
      CB.CloudObject.pin(list).then(
        function(res) {
          // Vue.prototype.$employeeList = res
          store.commit('setEmployeeList', res)
        
        },
        function(err) {
          console.log(err)
        }
      )
    },
    error: function(error) {
      console.log('ot ok', error)
    },
  })
}

// This is your plugin object. It can be exported to be used anywhere.
const CBPlugin = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue) {
    if (window.navigator.onLine) {
      CB.CloudObject.clearLocalStore().then(
        function(res) {
          Vue.prototype.$CB = CB
          console.log(Vue.prototype.$CB)
          getEmployeeList(Vue)
        },
        function(err) {
          console.log(err)
        }
      )
    }

    Vue.mixin({
      // Anything added to a mixin will be injected into all components.
      // In this case, the mounted() method runs when the component is added to the DOM.
      // mounted() {
      //   console.log('Mounted!');
      // }
    })
  },
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(CBPlugin)
}
export default CBPlugin
