<script setup lang="ts">
import { add } from '@starter/shared'

const addResult = add(1, 2)
</script>

<template>
  <div text-xl>
    <p>addResult: {{ addResult }}</p>
    <img src="app://icons/icon.ico/">
    <Counter />
  </div>
</template>
