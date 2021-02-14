import Vue from 'vue'
import SortedTablePlugin from 'vue-sorted-table'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'

Vue.use(SortedTablePlugin);
Vue.use(VueResource);

Vue.http.options.root = process.env.VUE_APP_API_IP;
Vue.http.get(Vue.http.options.root + '/api/').then(() => {
  Vue.http.options.root = Vue.http.options.root + '/api/v1/';
}).catch(() => {
  Vue.http.options.root = process.env.VUE_APP_API_IP_LOCAL + '/api/v1/';
}).then(() => {
  new Vue({
    router,
    data() {
      return {
        langs: [],
        choosenLangId: '',
        menu_toggle: false,
        scrollPosition: 0,
        urlForRequest: Vue.http.options.root,
        selectAdvice: ''
      }
    },
    render: h => h(App)
  }).$mount('#pager')
})
