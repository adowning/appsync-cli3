<template>
  <div :class="amplifyUI.formSection">
    <div v-show="true" :class="amplifyUI.sectionHeader">
      Sign Up
    </div>
    <div v-show="true" :class="amplifyUI.sectionBody">
      <div
        v-for="signUpField in orderBy(options.signUpFields, 'displayOrder')"
        :key="signUpField.key"
        :class="amplifyUI.formField"
        :signUpField="signUpField"
      >
        <div :class="amplifyUI.inputLabel">
          {{ signUpField.label }} {{ signUpField.required ? '*' : '' }}
        </div>
        <input
          v-model="signUpField.value"
          :type="signUpField.type"
          :class="[amplifyUI.input, signUpField.invalid ? 'invalid' : '']"
          :placeholder="signUpField.label"
          @change="clear(signUpField)"
        />
      </div>
    </div>
    <div :class="amplifyUI.sectionFooter">
      <span :class="amplifyUI.sectionFooterPrimaryContent">
        <button v-show="true" :class="amplifyUI.button" @click="signUp">
          Create Account
        </button>
      </span>
      <span :class="amplifyUI.sectionFooterSecondaryContent">
        Have an Account? <a :class="amplifyUI.a" @click="signIn">
          Sign In
        </a>
      </span>
    </div>
    <div v-if="error_message" class="error">
      {{ error_message }}
    </div>
  </div>
</template>
<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import Vue from 'vue'
import * as AmplifyUI from '@aws-amplify/ui'
import { Auth } from 'aws-amplify'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

export default {
  name: 'SignUp',
  components: {},

  data() {
    return {
      affiliate_id: '',
      development: 'production',
      paidstatus: false,
      amplifyUI: AmplifyUI,
      error_message: '',
      signedIn: false,
      credentials: {
        // eslint-disable-next-line
        sandbox: process.env.VUE_APP_PAYPAL_SANBOX_ID,
        // eslint-disable-next-line
        production: process.env.VUE_APP_PAYPAL_PRODUCKTION_ID,
      },
    }
  },
  computed: {
    options() {
      const defaults = {
        header: 'Sign Up',
        signUpFields: [
          {
            label: 'Affiliate ID',
            key: 'affiliate_id',
            required: false,
            type: 'string',
            value: this.$cookie.get('affiliate_id'),
            displayOrder: 1,
          },
          {
            label: 'Email',
            key: 'email',
            required: true,
            type: 'string',
            displayOrder: 2,
          },
          {
            label: 'Password',
            key: 'password',
            required: true,
            type: 'password',
            displayOrder: 3,
          },
        ],
      }

      return Object.assign(defaults, this.signUpConfig || {})
    },
  },
  /* eslint-disable */
  async beforeCreate() {
    if (process.env.NODE_ENV == 'development') {
      console.log('development')
      this.development = 'sandbox'
    } else {
      console.log('production')
      this.development = 'production'
    }
    try {
      await Auth.currentAuthenticatedUser()
      this.signedIn = true
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
      } else {
        this.signedIn = false
      }
    })
  },

  methods: {
    paypalPaymentAuthorized: function(data) {
      console.log('data' + data)
    },
    paypalPaymentCompleted: function(data) {
      console.log('data1' + data)
      this.paidstatus = true
    },
    paypalPaymentCancelled: function(data) {
      console.log('data2' + data)
    },

    signUp: function() {
      // if (!this.validate()) {
      //   return null;
      // }
      let user = {
        attributes: {},
      }
      this.options.signUpFields.forEach(e => {
        if (e.key === 'email') {
          // user.username = e.value;
          user.username = 'asdf'
        } else if (e.key === 'password') {
          // user.password = e.value;
          user.password = 'asdfasdf'
        } else if (e.key === 'affiliate_id') {
          this.$cookie.set('affiliate_id', e.value, 1)
        } else {
          user.attributes[e.key] = e.value
        }
      })

      Auth.signUp(user)
        .then(data => {
          AmplifyEventBus.$emit('localUser', data.user)
          if (data.userConfirmed === false) {
            return AmplifyEventBus.$emit('authState', 'confirmSignUp')
          }
          return AmplifyEventBus.$emit('authState', 'signedOut')
        })
        .catch(err => this.setError(err))
    },

    signIn: function() {
      AmplifyEventBus.$emit('authState', 'signedOut')
    },

    validate: function() {
      let allValid = true
      this.options.signUpFields.map(el => {
        if (el.required && !el.value) {
          allValid = false
          Vue.set(el, 'invalid', true)
        }
        return el
      })
      return allValid
    },

    clear(field) {
      if (field && field.invalid && field.value) {
        Vue.set(field, 'invalid', false)
      }
    },

    setError: function(e) {
      this.error_message = e.message || e
    },

    checkout: function() {
      // stripe payment
      this.$checkout.open({
        name: 'Payment Details',
        currency: 'USD',
        amount: 2100,
        token: token => {
          // console.log("token " + JSON.stringify(token));
          this.$cookie.set('stripe_token', token.id, 1)
          this.paidstatus = true
        },
      })
    },
  },
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.signout {
  background-color: #ededed;
  margin: 0;
  padding: 11px 0px 1px;
}
</style>
