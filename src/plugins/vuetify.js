import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
function onDeviceReady() {
QRScanner.prepare(onDone); // show the prompt
 
function onDone(err, status){
  console.log('dr')
  console.log('dr')
  console.log('dr')
  console.log('dr')
  if (err) {
   // here we can handle errors and clean up any loose ends.
   console.error(err);
  }
  if (status.authorized) {
    // W00t, you have camera access and the scanner is initialized.
    // QRscanner.show() should feel very fast.
  } else if (status.denied) {
   // The video preview will remain black, and scanning is disabled. We can
   // try to ask the user to change their mind, but we'll have to send them
   // to their device settings with `QRScanner.openSettings()`.
  } else {
    // we didn't get permission, but we didn't get permanently denied. (On
    // Android, a denial isn't permanent unless the user checks the "Don't
    // ask again" box.) We can ask again at the next relevant opportunity.
  }
}
}

document.addEventListener("deviceready", onDeviceReady, false);

    // Now safe to use device APIs
Vue.use(Vuetify, {
  iconfont: 'md',
})
