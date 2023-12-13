import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMobileStore = defineStore('mobile', () => {
    const width = ref(0)
    const isMobile = computed(() => {
        return width.value <= 768
    })
    const setMobile = (value) => {
        width.value = value
    }

    return { width, isMobile ,setMobile }
})

export const useMenuStore = defineStore('menu', () => {
    const status = ref(false)
    const setMenu = () => {
        status.value = !status.value 
    }
    const closeMenu = () => {
        status.value = false
    }
    const openMenu = () => {
        status.value = true
    }
    return { status,setMenu,closeMenu,openMenu }
})
