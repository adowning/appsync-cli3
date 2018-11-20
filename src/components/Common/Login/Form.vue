<template>
  <v-form>
    <div v-if="!scanned">
      <div class="row message-warning">
        <h5>Checkout device</h5>
        <div class="divider"></div>
        <p class="message">
          This device must be checked out in order to be used.
        </p>
      </div>
      <div v-if="startScan && inDevelopment">
        <img src="../../../assets/images/asdfqrcode.svg" style="width: 30%" />
      </div>
      <qrcode-stream v-if="startScan" @decode="onDecode"></qrcode-stream>

      <v-btn v-if="!startScan" block outline primary @click="startScan = true;"
        >Scan Badge</v-btn
      >
      <v-btn v-if="startScan" block outline warning @click="reload();"
        >Cancel</v-btn
      >
    </div>
    <div row v-if="scanned">
      <v-label
        >Hello {{ username }} sign here to acknowledge receipt of
        device</v-label
      >
      <div class="row message-warning">
        <VueSignaturePad
          width="90%"
          height="100px"
          ref="signaturePad"
          required
          :options="{ onEnd }"
        />
      </div>
      <div class="row">
        <div v-if="error" class="col s12">
          <p class="error card red-color white-text" v-if="error">
            <i class="fa fa-times dismiss-error" @click="dismissError();"></i>
            Login failed: <br />{{ error }}
          </p>
          <p v-if="!error">&nbsp;</p>
        </div>
        <div v-if="!error" class="col s8">
          <p class="right">
            <button
              class="btn waves-effect waves-light"
              type="submit"
              name="action"
              tabindex="3"
              @click="login"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
    <v-btn v-if="inDevelopment" block outline warning @click="login();"
      >test</v-btn
    >
  </v-form>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
#loginForm {
  margin-top: 15px;
}
.error {
  position: relative;
  padding: 8px 12px;
  margin: 0;
}
.right-align {
  margin-top: 0;
}
.dismiss-error {
  position: absolute;
  right: 10px;
  cursor: pointer;
  padding: 3px;
  border-radius: 2px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>

<script>
import Focus from "../../../directives/focus.directive";
import {
  DO_LOGIN,
  PREPARE_SESSION
} from "../../../vuex/modules/auth/mutation-types";
import { DO_CLOCKIN } from "../../../vuex/modules/users/mutation-types";
import kuzzle from "../../../services/kuzzle";
import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';
import { QrcodeStream } from "vue-qrcode-reader";

Vue.use(VueSignaturePad);
export default {
  name: "LoginForm",
  props: {
    onLogin: Function
  },
  directives: {
    Focus
  },
  components: {
    QrcodeStream
  },
  data() {
    return {
      username: null,
      password: null,
      startScan: false,
      accept: false,
      scanned: false,
      items: [],
      select: false,
      userList: [],
      checkboxId: false,
      error: "",
      bytes: null
    };
  },
  mounted() {
    // var that = this;
    // kuzzle.security.searchUsers(null, null, function(error, result) {
    //   if (!error) {
    //     that.userList = result.users;
    //     console.log(result.users[0].id);
    //   }
    // });
  },
  methods: {
    onDecode(_code) {
      var code = JSON.parse(_code)
      if (code.name) {
        this.username = code.name
        this.password = code.password
        this.scanned = true
      } else {
        this.error = "bad scan";
        // location.reload()
      }
    },
    onEnd() {
      this.bytes = VueSignaturePad.data().signatureData.src;
      this.signed = true;
    },
    dismissError() {
      this.error = "";
      location.reload();
    },
    reload() {},
    login() {
      this.error = "";
      this.$store;
      this.username = "ttest";
      this.password = "asdfasdf";
      this.userid = '1444044';
      this.$store
        .dispatch(DO_LOGIN, {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$store
            .dispatch(DO_CLOCKIN, this.userid)
            .then(() => {
              this.onLogin();
            })
            .catch(err => {
              this.error = err.message;
            });
        });
    },
    loginAsGuest() {
      this.error = "";
      kuzzle.unsetJwtToken();
      this.$store
        .dispatch(PREPARE_SESSION, "anonymous")
        .then(() => {
          this.onLogin();
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
