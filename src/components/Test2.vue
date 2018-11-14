<template>
  <VLayout row-wrap>
   <v-btn @click="scan">asdf</v-btn>
  </VLayout>
</template>

<script>
// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
// For the best user experience, make sure the user is ready to give your app
// camera access before you show the prompt. On iOS, you only get one chance.
 


export default {
  page: {
    title: 'Log in',
  },
  props:[{
    checkingIn:{
      default: false,
      type: Boolean
    }
  }],
  components: {
    // QrcodeStream,
    // QrcodeDropZone,
    // QrcodeCapture
  },

  data() {
    return {
    }
  },
  computed: {
  
  },
  mounted() {
 
  },
  methods: {
    scan(){
// Start a scan. Scanning will continue until something is detected or
// `QRScanner.cancelScan()` is called.
QRScanner.scan(displayContents);
 
function displayContents(err, text){
  if(err){
    // an error occurred, or the scan was canceled (error code `6`)
  } else {
    // The scan completed, display the contents of the QR code:
    alert(text);
  }
}
 
// Make the webview transparent so the video preview is visible behind it.
QRScanner.show();
// Be sure to make any opaque HTML elements transparent here to avoid
// covering the video.

    },
  }
}
</script>
