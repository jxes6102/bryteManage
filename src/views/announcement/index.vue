<template>
    <div class="relative h-auto flex flex-col justify-center items-center">
        announcement
        <div
            @click="tohome"
            class="absolute w-auto h-auto top-0 right-0 p-2 flex flex-wrap justify-center items-center">
            <el-icon size="30"><Close /></el-icon>
        </div>
    </div>
</template>

<script setup>
import { ref,onBeforeUnmount } from 'vue'
import { useRouter } from "vue-router";
import { useMenuStore,useMobileStore,useheaderStore } from '@/stores/index'
import 'animate.css'

const router = useRouter()
const menuStore = useMenuStore()
const mobileStore = useMobileStore()
const headerStore = useheaderStore()

onBeforeUnmount(() => {
    headerStore.openHeader()
    menuStore.openMenu()
})

const init = () => {
    headerStore.closeHeader()
    menuStore.closeMenu()
}

init()

const tohome = () => {
    router.push({path:'/'})
}

</script>

<style lang="scss" scoped>

</style>