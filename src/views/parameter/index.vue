<template>
    <div 
        class="w-full h-auto flex flex-col justify-center items-center"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            參數設定
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
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