<template>
  <div class="login-page">
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <!--
          you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple"
        -->
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <div>
                <FdcSignIn
                  v-if="displayMap.showSignIn"
                  :sign-in-config="options.signInConfig"
                />
                <FdcSignUp
                  v-if="displayMap.showSignUp"
                  :sign-up-config="options.signUpConfig"
                />
                <FdcConfirmsignup
                  v-if="displayMap.showConfirmSignUp"
                  :confirm-sign-up-config="options.confirmSignUpConfig"
                />
                <FdcConfirmsignin
                  v-if="displayMap.showConfirmSignIn"
                  :confirm-sign-in-config="options.confirmSignInConfig"
                />
                <FdcForgotpassword
                  v-if="displayMap.showForgotPassword"
                  :forgot-password-config="options.forgotPasswordConfig"
                />
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
        <div
          class="full-page-background"
          style="background-image: url(static/img/background/background-2.jpg) "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import SignUp from './SignUp'
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'
import ConfirmSignIn from './ConfirmSignIn'
import ConfirmSignUp from './ConfirmSignUp'
// import AppNavbar from "src/components/Common/Views/Pages/Layout/AppNavbar";

export default {
  name: 'Authenticator',
/* eslint-disable */
  components: {
    'fdc-sign-in': SignIn,
    'fdc-sign-up': SignUp,
    'fdc-forgotpassword': ForgotPassword,
    'fdc-confirmsignin': ConfirmSignIn,
    'fdc-confirmsignup': ConfirmSignUp
  },
  props: ['authOptions'],
  data () {
    return {
      user: {
        email: null
      },
      displayMap: { showSignIn: false, showSignUp: true },
      error: '',
      logger: {}
    }
  },
  computed: {
    options () {
      const defaults = {
        signInConfig: {},
        signUpConfig: {},
        confirmSignUpConfig: {},
        confirmSignInConfig: {},
        forgotPasswordConfig: {}
      }
      return Object.assign(defaults, this.authOptions || {})
    }
  },
  async mounted () {
    AmplifyEventBus.$on('localUser', user => {
      this.user = user
      this.options.signInConfig.email = this.user.email
      this.options.confirmSignInConfig.user = this.user
      this.options.confirmSignUpConfig.email = this.user.email
    })
    AmplifyEventBus.$on('authState', data => {
      this.displayMap = this.updateDisplayMap(data)
    })
    Auth.currentAuthenticatedUser()
      .then(user => {
        if (!user) {
          this.displayMap = this.updateDisplayMap('signedOut')
          return;
        }
        this.user = user
        this.displayMap = this.updateDisplayMap('signedIn')
      })
      .catch(e => new Error(e))
  },
  methods: {
    updateDisplayMap: state => {
      return {
        showSignIn: state === 'signedOut',
        showSignUp: state === 'signUp',
        showConfirmSignUp: state === 'confirmSignUp',
        showConfirmSignIn: state === 'confirmSignIn',
        showForgotPassword: state === 'forgotPassword',
        showSignOut: state === 'signedIn',
        showMfa: state === 'setMfa'
      }
    },
    setError: function (e) {
      this.error = e.message || e
      this.logger.error(this.error)
    }
  }
}
</script>
