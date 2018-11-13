<template>
  <VLayout>
    <VContent>
      <!--
        <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
      -->
      <AmplifySignOut />

      <!-- <Profile/> -->
    </VContent>
  </VLayout>
</template>

<script>
// import Profile from './EmployeeProfile/index.js'
export default {
  name: 'Employees',
  components: {
    // Profile
  },
  data() {
    return {}
  },
  mounted() {
    this.$Bus.$on('authState', info => {
      console.log(
        `Here is the auth event that was just emitted by an Amplify component: ${info}`
      )
      if (info == 'signedOut') {
        this.$router.push('/auth')
      }
    })
  },
}
</script>
