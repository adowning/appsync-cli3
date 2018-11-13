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
          v-model="options.username"
          :class="amplifyUI.input"
          name="username"
          placeholder="Username"
          autofocus
        />
      </div>
      <div :class="amplifyUI.formField">
        <div :class="amplifyUI.inputLabel">
          Code *
        </div>
        <input
          v-model="code"
          :class="amplifyUI.input"
          name="code"
          placeholder="Code"
        />
        <div :class="amplifyUI.hint">
          Lost your code?
          <a :class="amplifyUI.a" @click="resend">
            Resend Code
          </a>
        </div>
      </div>
    </div>
    <div :class="amplifyUI.sectionFooter">
      <span :class="amplifyUI.sectionFooterPrimaryContent">
        <button :class="amplifyUI.button" @click="confirm">
          Confirm
        </button>
      </span>
      <span :class="amplifyUI.sectionFooterSecondaryContent">
        Have an Account? <a :class="amplifyUI.a" @click="signIn">
          Sign In
        </a>
      </span>
    </div>
    <div v-if="error != 'Valid username not received.'" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import * as AmplifyUI from '@aws-amplify/ui'
export default {
  name: 'ConfirmSignUp',
  props: ['confirmSignUpConfig'],
  data() {
    return {
      code: '',
      error: '',
      logger: {},
      amplifyUI: AmplifyUI,
    }
  },
  computed: {
    options() {
      const defaults = {
        username: '',
        header: 'Confirm Sign Up',
      }
      return Object.assign(defaults, this.confirmSignUpConfig || {})
    },
  },
  mounted: function() {
    this.logger = new this.$Amplify.Logger(this.$options.name)
    if (!this.options.username) {
      return this.setError('Valid username not received.')
    }
  },
  methods: {
    confirm() {
      this.$Amplify.Auth.confirmSignUp(this.options.username, this.code)
        .then(() => {
          this.logger.info('confirmSignUp success')

          let params = {}

          params.amount = '2.0'
          params.currency = 'usd'
          params.source = this.$cookie.get('stripe_token')
          params.plan_level = 'Plan'
          params.affiliate_id = this.$cookie.get('affiliate_id')

          console.log('stripe api params' + JSON.stringify(params))

          AmplifyEventBus.$emit('authState', 'signedOut')
        })
        .catch(e => this.setError(e))
    },
    resend() {
      this.$Amplify.Auth.resendSignUp(this.options.username)
        .then(() => {
          this.logger.info('resendSignUp success')
        })
        .catch(e => this.setError(e))
    },
    signIn() {
      AmplifyEventBus.$emit('authState', 'signedOut')
    },
    setError(e) {
      this.error = e.message || e
      this.logger.error(this.error)
    },
  },
}
</script>
