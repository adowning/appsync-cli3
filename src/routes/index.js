import Login from '../components/Login'
import CreateEnvironmentPage from '../components/Common/Environments/CreateEnvironmentPage'
import store from '../vuex/store'
import { hasSecurityRights } from '../services/userAuthorization'
import SecuritySubRoutes from './children/security'
import DataSubRoutes from './children/data'

export default function createRoutes(VueRouter) {
  let router = new VueRouter(
    {
      routes: [
        {
          path: '/',
          name: 'Home',
          redirect: '/crew',
          component(resolve) {
            require(['../components/Home'], resolve)
          },
          meta: {
            auth: true
          },
          children: [
            {
              path: '/crew',
              name: 'Crew',
              // redirect: "/profile/",
              meta: {
                auth: true
              },
              component(resolve) {
                require(['../components/Crew/index.vue'], resolve)
              }
              // children: DataSubRoutes
            },
            {
              path: '/profile',
              name: 'Profile',
              // redirect: "/profile/",
              meta: {
                auth: true
              },
              component(resolve) {
                require(['../components/Profile/index.vue'], resolve)
              }
              // children: DataSubRoutes
            },
            {
              path: '/security',
              name: 'Security',
              redirect: '/security/users',
              component(resolve) {
                if (!hasSecurityRights()) {
                  require(['../components/Common/PageNotAllowed'], resolve)
                } else {
                  require(['../components/Security/Layout'], resolve)
                }
              },
              children: SecuritySubRoutes
            },
            {
              path: '/data',
              name: 'DataLayout',
              meta: {
                auth: true
              },
              component(resolve) {
                require(['../components/Data/Layout'], resolve)
              },
              children: DataSubRoutes
            }
          ]
        },
        {
          path: '/signup',
          name: 'Signup',
          component(resolve) {
            require(['../components/Signup'], resolve)
          }
        },
        {
          path: '/login',
          name: 'Login',
          meta: {
            auth: false
          },
          component: Login
        },
        {
          path: '/create-env',
          name: 'CreateEnv',
          meta: {
            auth: false
          },
          component: CreateEnvironmentPage
        }
      ]
    },
    'hash'
  )

  router.afterEach(() => {
    Array.prototype.forEach.call(
      document.querySelectorAll('.loader'),
      element => {
        element.classList.remove('loading')
      }
    )
  })

  router.beforeEach((to, from, next) => {
    console.log(to.name)
    Array.prototype.forEach.call(
      document.querySelectorAll('.loader'),
      element => {
        element.classList.add('loading')
      }
    )

    if (
      (to.name === 'CreateEnv' && store.getters.hasEnvironment) ||
      (to.name === 'Signup' && store.getters.adminAlreadyExists) ||
      (to.name === 'Login' && store.getters.isAuthenticated)
    ) {
      next('/')
    } else {
      next()
    }
  })

  return router
}
