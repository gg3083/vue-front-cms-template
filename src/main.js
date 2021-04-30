import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import '@/style/index.scss' // glob scss
import './plugins/element.js'
import animated from 'animate.css'
import '@/assets/iconfont/iconfont.css'
import filters from './filters'

Vue.use(animated)
// import SlideVerify from 'vue-monoplasty-slide-verify'

// Vue.use(SlideVerify)
Vue.config.productionTip = false
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
