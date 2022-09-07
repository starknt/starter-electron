<script setup lang="ts">
const sayHello = () => $api.sayHello()
</script>

<template>
  <div text-xl>
    <Counter />
    <div mt-2>
      <button @click="sayHello">
        sayHello
      </button>
    </div>
  </div>
</template>
