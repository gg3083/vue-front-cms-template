import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import './plugins/element.js'
//使用cdn 屏蔽上面两行 放开下面一行
// import router from './router'
import store from './store'
import '@/style/index.scss' // glob scss
import animated from 'animate.css'
import '@/assets/iconfont/iconfont.css'
import * as filters from './filters'

Vue.use(animated)

Vue.config.productionTip = false
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
