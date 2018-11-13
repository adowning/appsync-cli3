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
          v-model="username"
          :class="amplifyUI.input"
          placeholder="Email"
          autofocus
        />
      </div>
      <div v-if="sent" :class="amplifyUI.formField">
        <div :class="amplifyUI.inputLabel">
          Verification Code *
        </div>
        <input
          v-model="code"
          :class="amplifyUI.input"
          placeholder="Verification Code"
          autofocus
        />
      </div>
      <div v-if="sent" :class="amplifyUI.formField">
        <div :class="amplifyUI.inputLabel">
          New Password *
        </div>
        <input
          v-model="password"
          :class="amplifyUI.input"
          type="password"
          placeholder="New Password"
          autofocus
        />
      </div>
    </div>

    <div :class="amplifyUI.sectionFooter">
      <span :class="amplifyUI.sectionFooterPrimaryContent">
        <button
          v-if="!sent"
          :class="amplifyUI.button"
          :disabled="!username"
          @click="submit"
        >
          Submit
        </button>
        <button
          v-if="sent"
          :class="amplifyUI.button"
          :disabled="!username"
          @click="verify"
        >
          Verify
        </button>
      </span>
      <span :class="amplifyUI.sectionFooterSecondaryContent">
        <a v-if="!sent" :class="amplifyUI.a" @click="signIn">
          Back to Sign In
        </a>
        <a v-if="sent" :class="amplifyUI.a" @click="submit">
          Resend Code
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
  name: 'ForgotPassword',
  props: {
    forgotPasswordConfig: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      username: '',
      code: '',
      password: '',
      error: '',
      sent: false,
      logger: {},
      amplifyUI: AmplifyUI,
    }
  },
  computed: {
    options() {
      const defaults = {
        header: 'Forgot Password',
      }
      return Object.assign(defaults, this.forgotPasswordConfig || {})
    },
  },
  mounted() {
    this.logger = new this.$Amplify.Logger(this.$options.name)
  },
  methods: {
    submit: function() {
      this.$Amplify.Auth.forgotPassword(this.username)
        .then(() => {
          this.sent = true
          this.logger.info('forgotPassword success')
        })
        .catch(e => this.setError(e))
    },
    verify: function() {
      this.$Amplify.Auth.forgotPasswordSubmit(
        this.username,
        this.code,
        this.password
      )
        .then(() => {
          this.logger.info('forgotPasswordSubmit success')
          AmplifyEventBus.$emit('authState', 'signedOut')
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
