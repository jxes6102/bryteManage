<template>
  <div class="relative w-full h-[100vh] min-h-[100vh] overflow-y-auto overflow-x-hidden">
    <transition mode="in-out"
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp"
      >
      <headerView v-if="headerStatus"></headerView>
    </transition>
    <transition 
      enter-active-class="animate__animated animate__slideInLeft"
      leave-active-class="animate__animated animate__slideOutLeft"
      >
      <menuView v-if="menuStatus"></menuView>
    </transition>
    <RouterView
      :class="(!isMobile && menuStatus) ? 'ml-[200px] w-[calc(100%_-_200px)]' : 'w-[100%]'"
      class="transition-all duration-1000" />

    <!-- <transition 
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      >
      <announceView v-if="announceStatus"></announceView>
    </transition> -->
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted,computed,watch } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import headerView from './components/headerView.vue'
import menuView from './components/menuView.vue'
import announceView from './components/announceView.vue'
import { useMobileStore,useMenuStore,useheaderStore,useAnnounceStore,useLoginStore } from './stores/index'
import { useRouter } from "vue-router";

const router = useRouter()
const mobileStore = useMobileStore()
const menuStore = useMenuStore()
const headerStore = useheaderStore()
const announceStore = useAnnounceStore()
const loginStore = useLoginStore()

const announceStatus = computed(() => {
  return announceStore.status
})
const headerStatus = computed(() => {
  return headerStore.status
})
const menuStatus = computed(() => {
  return menuStore.status
})
const isMobile = computed(() => {
  return mobileStore.isMobile
})
const setWidth = () => {
  mobileStore.setMobile(window.innerWidth)
}

const init = () => {
  if(!localStorage.getItem('bryteManageToken')){
    router.push({ path: '/loginView' })
  }else{
    loginStore.isLogin()
    router.push({ path: '/' })
  }
}
init()

onMounted(() => {
  setWidth()

  if(loginStore.status){
    headerStore.openHeader()
    if(!isMobile.value){
      menuStore.openMenu()
    }
  }

  window.addEventListener('resize', () => {
    setWidth()
  }, false);

  if(localStorage.getItem('announce') == 'true'){
    announceStore.openAnnounce()
  }else{
    announceStore.closeAnnounce()
  }
})

watch(isMobile, (newVal,oldVal) => {
  if((newVal == true) && (oldVal == false)){
    menuStore.closeMenu()
  }
  // console.log('oldVal',oldVal)
  // console.log('newVal',newVal)
})

</script>

<style scoped>
/*
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
*/
</style>
