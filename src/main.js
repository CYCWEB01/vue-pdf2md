import Vue from 'vue'
import App from './App.vue'
import 'process';
import 'path-browserify';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
