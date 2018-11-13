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
export default {
  name: 'Auth',
  data() {
    return {}
  },
}
</script>
