import i18next from 'i18next'

export default i18next.init({
  lng: 'cn',
  resources: {
    en: {
      translation: {
        sayHello: 'SayHello',
      },
    },
    cn: {
      translation: {
        sayHello: '你好',
      },
    },
  },
})
