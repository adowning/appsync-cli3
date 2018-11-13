<template>
  <div :class="amplifyUI.formSection">
    <div :class="amplifyUI.sectionHeader">
      {{ options.header }}
    </div>
    <div :class="amplifyUI.sectionBody">
      <div :class="amplifyUI.formField">
        <div :class="amplifyUI.inputLabel">
          Email *
        </div>
        <input
          v-model="options.email"
          :class="amplifyUI.input"
          placeholder="asdf"
          autofocus
          @keyup.enter="signIn"
        />
      </div>
      <div :class="amplifyUI.formField">
        <div :class="amplifyUI.inputLabel">
          Password *
        </div>
        <input
          v-model="password"
          :class="amplifyUI.input"
          type="password"
          placeholder="Password"
          @keyup.enter="signIn"
        />
        <div :class="amplifyUI.hint">
          Forgot your password?
          <a :class="amplifyUI.a" @click="forgot">
            Reset
          </a>
        </div>
      </div>
    </div>
    <div :class="amplifyUI.sectionFooter">
      <span :class="amplifyUI.sectionFooterPrimaryContent">
        <button :class="amplifyUI.button" @click="signIn">
          Sign In
        </button>
      </span>
      <span :class="amplifyUI.sectionFooterSecondaryContent">
        No Account? <a :class="amplifyUI.a" @click="signUp">
          Sign Up
        </a>
      </span>
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>
<script>
import * as AmplifyUI from '@aws-amplify/ui'
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'

export default {
  name: 'SignIn',
  props: {
    signInConfig: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      password: '',
      error: '',
      amplifyUI: AmplifyUI,
    }
  },

  computed: {
    options() {
      const defaults = {
        header: 'Sign In',
        email: '',
      }
      return Object.assign(defaults, this.signInConfig || {})
    },
  },

  methods: {
    signIn: function() {
      // Auth.signIn(this.options.email, this.password)
      console.log(this.options.email)
      Auth.signIn(this.options.email, 'asdfasdf')
        .then(data => {
          if (data.challengeName) {
            console.log('confirm1')
            AmplifyEventBus.$emit('localUser', data)
            return AmplifyEventBus.$emit('authState', 'confirmSignIn')
          }
          this.$router.push('/account/profile')
          return AmplifyEventBus.$emit('authState', 'signedIn')
        })
        .catch(err => this.setError(err))
    },

    signUp: function() {
      AmplifyEventBus.$emit('authState', 'signUp')
    },

    forgot: function() {
      AmplifyEventBus.$emit('authState', 'forgotPassword')
    },

    setError: function(e) {
      this.error = e.message || e
    },
  },
}
</script>
