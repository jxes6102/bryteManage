<template>
    <div 
        class="w-full h-[100vh] flex flex-col justify-start items-center"
    >
        <div>news</div>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import { useMobileStore } from '@/stores/index'

const router = useRouter()
const route = useRoute()

const mobileStore = useMobileStore()

const isMobile = computed(() => {
  return mobileStore.isMobile
})

</script>

<style lang="scss" scoped>

</style>