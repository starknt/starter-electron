import { createApp } from 'vue'
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'

import { web } from 'eevi-is'
import AppVue from '../App.vue'

import '@app/compat-i18n'

import 'uno.css'

// eslint-disable-next-line no-console
console.log(web())

const app = createApp(AppVue)

app.use(I18NextVue, { i18next })

app.mount('#app')
