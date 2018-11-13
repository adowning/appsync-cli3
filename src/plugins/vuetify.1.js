import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify, {
  theme: {
    primary: '#FF9900',
    secondary: '#232F3E',
    accent: '#00B9F2',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    orange: '#FF9900',
    squid_ink: '#232F3E',
    blue: '#00B9F2',
    grey: '#BBBBBB',
    dark_grey: '#828282',
    light_grey: 'E6E6E6',
    purple: '#527FFF',
    link: '#007EB9',
  },
  iconfont: 'md',
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {},
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    },
  },
})
