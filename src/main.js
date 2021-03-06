// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui';

Vue.use(MintUI);

Vue.config.productionTip = false
console.log('router'+router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // template: '<App/>'
  render: h => h(App)
})
