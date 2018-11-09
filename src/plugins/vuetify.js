import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// import 'font-awesome/css/font-awesome.css';  
// import './theme/default.styl';

Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  iconfont: 'md',
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
// Vue.use(Vuetify, {
//   iconfont: 'md',
// })
