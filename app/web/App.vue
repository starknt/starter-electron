<script setup lang="ts">
import { BroadcastDataChannel } from '@app/compat-browser/broadcast'
import { sayHello } from '#common'

onMounted(() => {
  const channel = new BroadcastDataChannel<string>('channel')

  channel.onDidReceiveData = (data) => {
    // eslint-disable-next-line no-console
    console.log('channel message: ', data)
  }

  channel.postData('Hello!')
})

const getIconsUrl = (name: string) => {
  return `app://icons/${name}`
}
</script>

<template>
  <div text-xl>
    <Counter />
    <div mt-2>
      <button @click="sayHello">
        {{ $t('translation.sayHello') }}
      </button>
    </div>

    <div flex flex-col>
      <p>getIconsUrl function expample</p>

      <div self-start border rounded-md overflow-hidden p-1 mt-2>
        <img block object-cover :src="getIconsUrl('32x32.png')">
      </div>
    </div>
  </div>
</template>
