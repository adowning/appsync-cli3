<template>
  <div :class="amplifyUI.formSection">
    <div :class="amplifyUI.sectionHeader">
      {{ options.header }}
    </div>
    <div :class="amplifyUI.sectionBody">
      <div :class="amplifyUI.formField">
        <div :class="amplifyUI.inputLabel">
          Code *
        </div>
        <input v-model="code" :class="amplifyUI.input" placeholder="Code" />
        <div :class="amplifyUI.hint">
          Lost your code?
          <a :class="amplifyUI.a" @click="send">
            Resend Code
          </a>
        </div>
      </div>
    </div>
    <div :class="amplifyUI.sectionFooter">
      <span :class="amplifyUI.sectionFooterPrimaryContent">
        <button :class="amplifyUI.button" :disabled="!code" @click="submit">
          Submit
        </button>
      </span>
      <span :class="amplifyUI.sectionFooterSecondaryContent">
        <a :class="amplifyUI.a" @click="signIn">
          Back to Sign In
        </a>
      </span>
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import * as AmplifyUI from '@aws-amplify/ui'
export default {
  name: 'ConfirmSignIn',
  props: ['confirmSignInConfig'],
  data() {
    return {
      verifyAttr: '',
      code: '',
      error: '',
      logger: {},
      amplifyUI: AmplifyUI,
    }
  },
  computed: {
    options() {
      const defaults = {
        header: 'Confirm Sign In',
        user: {},
      }
      return Object.assign(defaults, this.confirmSignInConfig || {})
    },
  },
  mounted() {
    this.logger = new this.$Amplify.Logger(this.$options.name)
    if (Object.keys(this.options.user).length === 0) {
      this.setError('Valid user not received.')
    }
  },
  methods: {
    send: function() {
      this.$Amplify.Auth.verifyCurrentUserAttribute(this.verifyAttr)
        .then(data => {
          this.logger.info('verifyCurrentUserAttribute successs '+ data)
        })
        .catch(e => this.setError(e))
    },
    submit: function() {
      this.$Amplify.Auth.confirmSignIn(
        this.options.user,
        this.code,
        this.options.user.challengeName
      )
        .then(() => {
          this.logger.info('confirmSignIn successs')
          let params = {}

          params.amount = '2.0'
          params.currency = 'usd'
          params.source = this.$cookie.get('stripe_token')
          params.plan_level = 'Plan'
          params.affiliate_id = this.$cookie.get('affiliate_id')

          console.log('stripe api params' + JSON.stringify(params))

          AmplifyEventBus.$emit('authState', 'signedIn')
        })
        .catch(e => this.setError(e))
    },
    signIn: function() {
      AmplifyEventBus.$emit('authState', 'signedOut')
    },
    setError: function(e) {
      this.error = e.message || e
      this.logger.error(this.error)
    },
  },
}
</script>
