<template>
    <div class="fixed top-[8vh] left-0 w-[100vw] md:w-[300px] h-[92vh] bg-lime-400">
        <!-- <button @click="isCollapse = !isCollapse">click</button>
        <transition enter-active-class="animate__animated animate__fadeInLeft">
            <div v-if="isCollapse"> test</div>
        </transition>
        <div class="animate__animated animate__fadeInLeft" v-if="isCollapse"> test</div>
       menu -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import 'animate.css'

const isCollapse = ref(true)
const handleOpen = (key,keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key,keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped>



</style>