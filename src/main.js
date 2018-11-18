import Vue from "vue";
import "./plugins/vuetify";
import VueRouter from "vue-router";
import AsyncComputed from "vue-async-computed";
import App from "./App";
import store from "./vuex/store";
import { initStoreWithKuzzle } from "./services/kuzzleWrapper";
import * as types from "./vuex/modules/common/kuzzle/mutation-types";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
Vue.use(AsyncComputed);
if (process.env.NODE_ENV == "development") {
  Vue.prototype.inDevelopment = true;
}
initStoreWithKuzzle(store);

Vue.use(VueRouter);
console.log(navigator.userAgent);

store.dispatch(types.LOAD_ENVIRONMENTS);
store
  .dispatch(types.SWITCH_LAST_ENVIRONMENT)
  .then(() => {
    let router = require("./services/router").default;

    /* eslint-disable no-new */
    new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    });
  })
  .catch(() => {
    let router = require("./services/router").default;

    /* eslint-disable no-new */
    new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    });
  })
