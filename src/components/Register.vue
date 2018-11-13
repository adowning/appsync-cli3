<template>
  <VLayout>
    <VContent>
      <!--
        <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
      -->
      <AmplifyAuthenticator />

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
}
</script>
