<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="demo-rate-block">
      <span class="demonstration">Default</span>
      <el-rate v-model="value1" />
    </div>
    <div class="text-3xl text-red-600 font-bold underline">
      about
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(null)
const value2 = ref(null)
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']) 
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
