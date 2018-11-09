<template>
  <v-layout column>
    <v-img 
      src="../assets/logo.png" 
      aspect-ratio="1.7"/>    
      <!-- <v-flex :v-if="!signed"> This device is not checked out and will need to be checked out in order to be used or moved its current location. 
          By signing, you acknoweldge this piece of equipment is in your sole care and custody and you are responsible for loss 
          or any damage to the device. You will be responsible until the device is transfered to another employee or checked in at the end of your shift.
      </v-flex> -->
    <signature-pad :v-if="!checkoutForm" />
      
      <qrcode-reader 
        :v-if="checkoutForm && !scan && !paused && startScan" 
        :paused="paused" 
        @init="onInit" 
        @decode="onDecode"/>
    <v-flex>
      <v-btn 
        v-if="!startScan" 
        block 
        color="blue-grey" 
        class="white--text" 
        @click.native="scan()">
        Scan ID Badge
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn 
        v-if="isDeveloperMode" 
        block 
        color="green" 
        class="white--text" 
        @click.native="updateScanedEmployee('1444044')">
        fakeScan
      </v-btn>
      <v-btn 
        block 
        color="red" 
        class="white--text" 
        @click.native="goHome()">
        Cancel
      </v-btn>
    </v-flex>
  </v-layout>
</template>
      
<script>
import SignaturePad from 'signature_pad'
export default{
  page: {
    title: "Log in"
  },
  data() {
    return {
      startScan: false,
      printedName: null,
      signature: null,
      signed: false,
      checkoutForm: null
    }
  },
  mounted(){
        var canvas = document.querySelector("canvas");
        this.signaturePad = new SignaturePad(canvas);

  },
  methods: {
  async submitSignature(){
       var _signature = await this.signaturePad.toDataURL("image/jpeg");
    var checkoutForm = {
            time: new Date(),
            employee: this.printedName,
            signature: _signature,
            device: this.$deviceId
        }
        this.$Hub.dispatch('auth', { event: 'signIn', data: checkoutForm }, 'Auth');

        //use amplify to sav file then send when user is inactive
  },
    goHome(){
      this.$router.push("/")
    },
    /* eslint-disable-next-line */
    async loginEmployee(_badge) {
          this.loginErrors = []

            var badge = {
                name: 'asdf',
                password: 'asdfasdf'
            }
         this.$Amplify.Auth.signIn(badge.name, badge.password)
          .then(data => {
              if (data && data.signInUserSession) {
                //   store.commit('setUser', data)
                  this.$AmplifyEventBus.$emit('authState', 'signedIn')
                    this.$router.push("/crewList")
                   this.$PubSub.publish('employeeUpdated', { msg: `${data.username} has clocked in.`  });
              }
          })
          .catch(() => {
            this.loginErrors.push('Invalid badge')
            //   store.commit('setUser', null)
              return null
          })
    },
    scan() {
      var self = this
      /* eslint-disable-next-line */
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          console.log(result)
          self.loginEmployee(JSON.parse(result))
        },
        function(error) {
          alert("Scanning failed: " + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: false, // Android, save scan history (default false)
          prompt: "Place ID badge inside the scan area", // Android
          resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats:
            "DATA_MATRIX,UPC_A,UPC_E,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128,CODABAR,ITF,RSS14,PDF_417,RSS_EXPANDED,MSI,AZTEC", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          // disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      )
    }
  },
    onDestroy() {
      console.log("destroying")
    //   this.user = null
    }
  }
  

</script>
