import Vue from 'vue'
import Router from 'vue-router'
import { AmplifyPlugin, AmplifyEventBus } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'
import AmplifyStore from './store'

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules)

let user

getUser().then((user, error) => {
  if (error) {
    console.log(error)
  }
  if (user) {
    router.push({ path: '/' })
  }
})

AmplifyEventBus.$on('authState', async state => {
  if (state === 'signedOut') {
    user = null
    AmplifyStore.commit('setUser', null)
    router.push({ path: '/auth' })
  } else if (state === 'signedIn') {
    user = await getUser()
    router.push({ path: '/' })
  }
})

function getUser () {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
    .then(data => {
       console.log(data)
      if (data && data.signInUserSession) {
        AmplifyStore.commit('setUser', data)
        return data
      }
    })
    .catch(err => {
      console.log(err)
      AmplifyStore.commit('setUser', null)
    router.push({ path: '/auth' })
      return null
    })
}

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${view}.vue`)
}

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: function () {
        return import(/* webpackChunkName: "Test" */ './components/Test2.vue')
      },
    },
    {
      path: '/',
      name: 'Home',
      component: loadView('Home')
    },
    {
      path: '/test2',
      name: 'test2',
      component: function () {
        return import(/* webpackChunkName: "Test" */ './components/Test2')
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/signout',
      name: 'signout',
      component: function () {
        return import(/* webpackChunkName: "Signout" */ './components/Signout.vue')
      },
      meta: { requiresAuth: true}

    },
    {
      path: '/profile',
      name: 'profile',
      component: function () {
        return import(/* webpackChunkName: "EmployeeProfile" */ './components/EmployeeProfile/Profile')
      },
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      name: '404',
      component: function () {
        return import(/* webpackChunkName: "404" */ './components/common/404.vue')
      }
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser()
    if (!user) {
      return next({
        path: '/auth',
        query: {
          redirect: to.fullPath
        }
      })
    }
    return next()
  }
  return next()
})

export default router
// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'

// Vue.use(Router)

// export default new Router({
//   mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: function () {
//         return import(/* webpackChunkName: "about" */ './views/About.vue')
//       }
//     },
//     {
//       path: '/scanbadge',
//       name: 'scanbadge',
//       component: function () {
//         return import(/* webpackChunkName: "Scanbadge" */ './components/Scanbadge.vue')
//       }
//     }
//   ]
// })
