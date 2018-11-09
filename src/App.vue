<template>
  <v-app>
        <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
      </v-btn>

    <v-content>
      <!-- <HelloWorld/> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable-next-line */
import { components } from 'aws-amplify-vue'

export default {
  name: 'App',

  data () {
    return {
      //
    }
  }
}
</script>
