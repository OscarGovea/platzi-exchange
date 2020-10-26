import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import {dollarFilter,percentFilter} from "@/filters";
import Chart from 'chart.js'
import Chartik from 'vue-chartkick'
import {VueSpinners} from '@saeris/vue-spinners'

Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false;

Vue.use(VueSpinners)
Vue.use(Chartik.use(Chart))



new Vue({
  router:router,
  render: h => h(App)
}).$mount("#app");
