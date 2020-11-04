import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

const prefersDarkMode = (): boolean => {
  return 'watchMedia' in window && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default new Vuetify({
  theme: {
    dark: true
  }
});
