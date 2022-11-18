<script setup lang="ts">
const sayHello = () => $api.sayHello()

const getIconsUrl = (name: string) => {
  return `app://icons/${name}`
}
</script>

<template>
  <div text-xl>
    <Counter />
    <div mt-2>
      <button @click="sayHello">
        sayHello
      </button>
    </div>

    <div flex flex-col>
      <p>getIconsUrl function expample</p>

      <div self-start border rounded-md overflow-hidden p-1 mt-2>
        <img block object-cover :src="getIconsUrl('32x32.png')" />
      </div>
    </div>
  </div>
</template>
