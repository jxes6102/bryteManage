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
    const status = ref(true)
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

export const useheaderStore = defineStore('header', () => {
    const status = ref(true)
    const setHeader = () => {
        status.value = !status.value 
    }
    const closeHeader = () => {
        status.value = false
    }
    const openHeader = () => {
        status.value = true
    }
    return { status,setHeader,closeHeader,openHeader }
})

export const useAnnounceStore = defineStore('announce', () => {
    const status = ref(false)
    const setAnnounce = () => {
        status.value = !status.value 
    }
    const closeAnnounce = () => {
        status.value = false
    }
    const openAnnounce = () => {
        status.value = true
    }
    return { status,setAnnounce,closeAnnounce,openAnnounce }
})