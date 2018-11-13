<template>
  <VLayout row-wrap>
    <VLayout column>
      <canvas id="signaturepad" ref="signaturepad" width="400" height="200"/>
      <!--
        <v-img
        src="../assets/logo.png"
        aspect-ratio="1.7"/>
      -->
      <VFlex/>
      <VFlex sm10 md8 lg6>
        <VFlex v-if="!sigFinished">
          <VFlex>
            This device is not checked out and will need to be checked out in
            order to be used or moved its current location. By signing, you
            acknoweldge this piece of equipment is in your sole care and custody
            and you are responsible for loss or any damage to the device. You
            will be responsible until the device is transfered to another
            employee or checked in at the end of your shift.
          </VFlex>
          <VSpacer/>
          <VFlex xs12 sm6 d-flex>
            <VSelect  v-model="select"
                      label="Employee" :items="employeeList" item-text="name"
            >
            </VSelect>
          </VFlex>
          <!--
            <VFlex>
              <VTextField
                v-model="printedName"
                placeholder="Enter full name"
                outline
              />
            <v-btn  @click.native="namePrinted = true">Submit</v-btn>
            </VFlex>
          -->
          <VFlex>
            <canvas v-show="select" id="signaturepad" ref="signaturepad" width="600" height="200" />
          </VFlex>
        
          <VBtn v-show="sigFinished && printedName" @click.native="signed = true">
            Submit
          </VBtn>
        </VFlex>

    
        <VFlex v-if="sigFinished">
          <QrcodeStream          
            :v-if="checkoutForm && !scan && !paused && startScan"
            @init="onInit"
            @decode="onDecode"
          />
          <VBtn
            block
            color="blue-grey"
            class="white--text"
            @click.native="scan()"
          >
            Scan ID Badge
          </VBtn>
        </VFlex>
        
        <VFlex>
          <VBtn
            block
            color="green"
            class="white--text"
            fakeScan
            @click.native="goHome()"
          >
            Cancel
          </VBtn>
        </VFlex>
      </VFlex>
    </VLayout>
  </VLayout>
</template>

<script>
import SignaturePad from 'signature_pad'
import { mapState } from 'vuex'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  page: {
    title: 'Log in',
  },
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },

  data() {
    return {
      startScan: false,
      printedName: null,
      namePrinted: false,
      signature: null,
      select: null,
      paused: false,
      ready: false,
      signed: false,
      checkoutForm: null,
      signaturePad: {},
      items: [],
      sigFinished: false,
    }
  },
  computed: {
    ...mapState({
      employeeList: state => state.employeeList
    })
  },
  mounted() {
    const signaturePad = new SignaturePad(this.$refs.signaturepad, {
      penColor: 'rgb(66, 133, 244)',
      backgroundColor: 'rgb(245,245,245)',
      onEnd: this.onSigned,
    })
    this.signaturePad = signaturePad
  },
  methods: {
    setActivePerson(item){
      console.log(item)
    },
    onInit() {},
    onSigned() {
      this.sigFinished = true
    },
    onDecode() {},
    async submitSignature() {
      var _signature = await this.signaturePad.toDataURL('image/jpeg')
      this.signaturePad.off()
      var checkoutForm = {
        time: new Date(),
        employee: this.printedName,
        signature: _signature,
        device: this.$deviceId,
      }
      this.$Hub.dispatch(
        'auth',
        { event: 'signIn', data: checkoutForm },
        'Auth'
      )
    },
    goHome() {
      this.$router.push('/')
    },
    /* eslint-disable-next-line */
    async loginEmployee(_badge) {
      this.loginErrors = []

      var badge = {
        name: 'asdf',
        password: 'asdfasdf',
      }
      this.$Amplify.Auth.signIn(badge.name, badge.password)
        .then(data => {
          if (data && data.signInUserSession) {
            //  store.commit('setUser', data)
            this.$AmplifyEventBus.$emit('authState', 'signedIn')
            this.$router.push('/crewList')
            this.$PubSub.publish('employeeUpdated', {
              msg: `${data.username} has clocked in.`,
            })
          }
        })
        .catch(() => {
          this.loginErrors.push('Invalid badge')
          //    this.$store.commit('setUser', null)
          return null
        })
    },
    scan() {
      var self = this
      this.signed = true
      /* eslint-disable-next-line */
      // cordova.plugins.barcodeScanner.scan(
      //   function(result) {
      //     console.log(result)
      //     self.loginEmployee(JSON.parse(result))
      //   },
      //   function(error) {
      //     alert('Scanning failed: ' + error)
      //   },
      //   {
      //     preferFrontCamera: false, // iOS and Android
      //     showFlipCameraButton: true, // iOS and Android
      //     showTorchButton: true, // iOS and Android
      //     torchOn: false, //  Android, launch with the torch switched on (if available)
      //     saveHistory: false, // Android, save scan history (default false)
      //     prompt: 'Place ID badge inside the scan area', // Android
      //     resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      //     formats:
      //       'DATA_MATRIX,UPC_A,UPC_E,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128,CODABAR,ITF,RSS14,PDF_417,RSS_EXPANDED,MSI,AZTEC',
      //     // all but PDF_417 and RSS_EXPANDED
      //     orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
      //     disableAnimations: true, // iOS
      //     disableSuccessBeep: false, // iOS and Android
      //   }
      // )
    },
  },
  onDestroy() {
    console.log('destroying')
    this.user = null
  },
}
</script>
