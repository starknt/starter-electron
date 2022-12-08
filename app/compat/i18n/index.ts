import i18next from 'i18next'
import { dev } from 'eevi-is'
import en from './locales/en.json'
import cn from './locales/cn.json'

export default i18next.init({
  lng: 'cn',
  debug: dev(),
  resources: {
    en,
    cn,
  },
  nsSeparator: '.',
})
