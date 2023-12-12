<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import {useCounterStore} from '../stores/counter'
const store = useCounterStore()


console.log(store.count)

store.increment(3)

console.log(store.count)

console.log(store.doubleCount)

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
