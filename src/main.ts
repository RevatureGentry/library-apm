import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import {onAuthStateChange} from "@/plugins/firebase";
import store from './store'
import {AuthActions, AuthGetters} from "@/store/auth.state";
import { ApmVuePlugin } from '@elastic/apm-rum-vue';
import { apm } from '@elastic/apm-rum';

const gatewayUrl = 'http://34.73.134.35/gateway';
const serverUrl =  `http://34.73.134.35/apm`

Vue.config.productionTip = false

Vue.use(ApmVuePlugin, {
  router,
  config: {
    serviceName: 'library',
    serverUrl,
    active: true,
    distributedTracingOrigins: [`${gatewayUrl}`],
    breakdownMetrics: true
  } as AgentConfigOptions
})

let app = new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
});
onAuthStateChange(user => {
  app.$mount("#app");

  app.$router.beforeEach((to, from, next) => {
    if (to.meta.view) {
      const transaction = apm.startTransaction(`${from.name} to ${to.name}`, 'spa');
      transaction.startSpan(`${from.name} to ${to.name}`, 'spa')
    }
    next();
  })

  return app.$store.dispatch(AuthActions.SET_USER_FROM_AUTH_SUCCESS, user).then(() => {
    const authenticated = app.$store.getters[AuthGetters.IS_AUTHENTICATED];
    if (authenticated && user !== null) {
      return app.$router.push({ path: '/home' });
    }
  });
})
