import { createApp } from 'vue'
import { web } from 'eevi-is'
import AppVue from '../App.vue'
import { sum } from '#preload/common'
import 'uno.css'

// eslint-disable-next-line no-console
console.log(web())

// eslint-disable-next-line no-console
console.log('#preload/common sum function', sum(1, 2, 3, 4, 5))

const app = createApp(AppVue)

app.mount('#app')
