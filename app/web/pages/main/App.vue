<script setup lang="ts">
import { add } from '@starter/shared'

const addResult = add(1, 2)

const generateAppProtocolUri = (path: string) => `app://${path}/`
</script>

<template>
  <div text-xl>
    <p>addResult: {{ addResult }}</p>
    <Counter />
    <img :src="generateAppProtocolUri('icons/icon.ico')">
  </div>
</template>
