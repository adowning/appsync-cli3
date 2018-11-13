<template>
  <div id="app">
    <content dark>
      <router-link to="/">
        Home
      </router-link> |
      <VBtn @click.native="signOut()">
        signout
      </VBtn>
      <router-link to="/profile">
        profile
      </router-link>
      <router-link to="/test">
        Test
      </router-link>
      <router-view />
      <footer />
    </content>
  </div>
</template>
<script>
/* eslint-disable-next-line */
import { Auth } from 'aws-amplify';
import { components } from 'aws-amplify-vue'
import Footer from './components/common/Footer'
export default {
  name: 'App',
  components: {
    ...components,
    // eslint-disable-next-line vue/no-unused-components
    Footer,
  },
  data() {
    return {}
  },
  methods: {
    signOut() {
      Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err))

      // By doing this, you are revoking all the auth tokens(id token, access token and refresh token)
      // which means the user is signed out from all the devices
      // Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)
      Auth.signOut({ global: true })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    },
  },
}
</script>
<style>
.footer {
  /* Apply this to v-bottom-nav if necessary. */
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
.v-bottom-nav {
  /* Apply this to v-bottom-nav if necessary. */
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
body {
  margin: 0;
  background-color: white;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
h4 {
  font-weight: 400;
  text-align: left;
}
h5 {
  font-weight: 400;
  text-align: left;
}
.pre {
  background: #f8f8f8;
}
.container {
  text-align: center;
  margin-left: 30px;
}
.shifted {
  text-align: left;
}
section {
  margin-top: 30px;
}
article {
  margin-top: 30px;
}
.lineBreak {
  height: 0;
  border-bottom: 1px solid #ededed;
  margin: 1em 10%;
}
.form {
  display: inline-block;
  width: 320px;
}
inputRow {
  display: block;
  margin-top: 0.5em;
}
.input {
  width: 100%;
  font-size: 1em;
  padding: 0.5em;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-bottom: 2px solid #232f3e;
}
.inputLabel {
  display: block;
  text-align: left;
}
.actionRow {
  display: flex;
  margin-top: 0.5em;
  text-align: right;
}
.action {
  font-size: 1em;
  border: none;
  outline: none;
  padding: 12px 50px;
  background-color: #ededed;
  cursor: pointer;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}
.error {
  background: orange;
  padding: 0.5em;
}
.nav {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  background-color: #2196f3;
  color: #fff;
  padding: 1em;
}
.item {
  font-weight: 500;
  padding: 0 0.5em;
  cursor: pointer;
}
.nav > .greeting {
  font-weight: 500;
  color: #000;
  padding: 0 0.5em;
}
.nav > .main {
  flex-grow: 1;
  text-align: left;
}
.nav > .right {
  font-size: 0.8em;
}
.avatar {
  max-height: 150px;
}
.avatar-pic {
  max-height: 100px;
}
/* accordion */
.message {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.message-header {
  cursor: pointer;
}
.message-body {
  padding: 0;
  max-height: 50em;
  width: 100%;
  overflow: hidden;
  transition: 0.3s ease all;
}
.is-closed .message-body {
  max-height: 0;
}
.is-primary .arrow {
  transform: rotateZ(90deg) translatex(-5px);
}
.arrow {
  display: inline-block;
}
.message-content {
  padding: 20px;
}
</style>
