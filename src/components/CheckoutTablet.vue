<template>
  <VApp id="inspire">
    <VContent>
      <VContainer fluid fill-height>
        <VLayout align-center justify-center>
          <VFlex xs12 sm12 md6>
            <VLayout column>
              <VAlert :value="true" type="info">
                This device is not checked out and will need to be checked out
                in order to be used or moved its current location.
              </VAlert>
              <div v-show="employeeName">
                <VueSignaturePad
                  id="signature"
                  ref="signaturePad"
                  width="100%"
                  height="250px"
                />
                By signing, you acknoweldge this piece of equipment is in your
                sole care and custody and you are responsible for loss or any
                damage to the device. You will be responsible until the device
                is transfered to another employee or checked in at the end of
                your shift.
                <!--
                  <v-btn
                    block
                    color="green"
                    class="white--text"
                    @click.native="updateScanedEmployee('1444044')">
                    fakeScan
                  </v-btn>
                -->
              </div>
            </VLayout>
          </VFlex>
        </VLayout>
      </VContainer>
      <VBtn @click.native="reload()">
        Submit
      </VBtn>
    </VContent>
  </VApp>
</template>

<script>
import VueSignature from 'vue-signature-pad'
import Vue from 'vue'
Vue.use(VueSignature)

export default {
  data() {
    return {
      employeeName: false,
    }
  },
  methods: {
    reload() {
      window.location.reload(true)
    },
    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      alert('Open DevTools see the save data.')
      console.log(isEmpty)
      console.log(data)
    },
  },
}
</script>
<style>
#signature {
  border: double 1px transparent;
  border-radius: 1px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #000000, #000000);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
