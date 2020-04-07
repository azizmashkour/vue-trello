import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import vSelect from 'vue-select'
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import './filters/index'
import { storeInStorage } from './utils'

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.component('v-select', vSelect)

Vue.prototype.$persist = (payload) => {
  storeInStorage('myProjects', payload)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
