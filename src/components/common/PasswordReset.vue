<template>
  <div class="vld-parent">
    <div>
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

      <div>
        <span :class="amplifyUI.sectionFooterPrimaryContent">
          <button
            v-if="!sent"
            class="btn btn-primary"
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
          <a v-if="sent" :class="amplifyUI.a" @click="submit">
            Resend Code
          </a>
        </span>
      </div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import * as amplifyUI from '@aws-amplify/ui'
import { mapActions } from 'vuex'

export default {
  name: 'PasswordReset',
  props: ['forgotPasswordConfig'],
  data() {
    return {
      username: '',
      code: '',
      password: '',
      error: '',
      sent: false,
      logger: {},
      amplifyUI,
    }
  },
  computed: {
    options() {
      const defaults = {
        header: 'Reset Password',
      }
      return Object.assign(defaults, this.forgotPasswordConfig || {})
    },
  },
  created() {
    this.setNavbarTitle('Reset Password')
  },
  mounted() {
    this.logger = new this.$Amplify.Logger(this.$options.name)
    // this.username = this.$store.getters.user.attributes.email;
    this.username = this.$store.getters.user.attributes.email

    if (this.username != undefined && this.username != '') {
      this.submit()
    }
  },
  methods: {
    ...mapActions('UI', ['setNavbarTitle']),

    submit: function() {
      this.$Amplify.Auth.forgotPassword(this.username)
        .then(() => {
          this.sent = true
          this.logger.info('forgotPassword success')
        })
        .catch(err => this.setError(err))
    },
    verify: function() {
      this.$Amplify.Auth.forgotPasswordSubmit(
        this.username,
        this.code,
        this.password
      )
        .then(() => {
          this.error = 'Your password updated successfully!'
          alert('Your password updated successfully!')
        })
        .catch(err => this.setError(err))
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
