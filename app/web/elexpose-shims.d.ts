interface Api {
  sayHello(): void
}

declare global {
  var $api: Api
}

export {}
