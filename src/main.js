import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import SeverityList from './components/SeverityList';

Vue.config.productionTip = false
Vue.component('severity-list', SeverityList)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
