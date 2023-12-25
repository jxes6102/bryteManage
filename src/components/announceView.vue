<template>
    <div v-if="!isMobile" class="absolute w-auto h-auto top-0 left-0 flex flex-col justify-center items-center z-[9999]">
        <div
            @click="tohome"
            class="absolute w-auto h-auto top-0 right-0 p-2 flex flex-wrap justify-center items-center cursor-pointer z-[20]">
            <el-icon size="50"><Close /></el-icon>
        </div>
        <div class="w-full h-[100vh] flex flex-wrap justify-center items-center overflow-hidden">
            <div 
                v-for="(item,index) in 4" :key="index"
                class="w-[25%] h-[100vh] bg-[#F0F8FF] border-2 border-[#F2FFFF] flex flex-col justify-start items-center">
                <transition
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                    <div v-if="showList[index]?.class" class="relative w-full h-[80px] rounded-lg bg-slate-50 my-1 flex flex-wrap justify-center items-center">
                        <div class="absolute top-0 left-[5px] w-[5vw] h-[5vw] max-w-[80px] max-h-[80px] rounded-full ">
                            <img :src="getImageUrl(showList[index]?.img)" alt="">
                        </div>
                        <div class="w-full text-4xl font-bold flex flex-wrap justify-center items-center">{{ showList[index]?.class }} </div>
                        <div class="w-full text-xl font-bold flex flex-wrap justify-center items-center">{{ '導師:' + showList[index]?.teacher }} </div>
                    </div>
                </transition>
                <div class="w-full flex flex-wrap justify-center items-center">
                    <transition-group 
                        name="fade"
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                    >
                        <div
                            v-for="(thing,key) in showList[index]?.crowd" :key="key"
                            :class="(showList[index]?.crowd.length <= maxCount) ? 
                                'w-[95%]' : 'w-[48%] mx-[2px]'"
                            class=" h-[auto] rounded-lg bg-slate-50 mt-1 text-xs lg:text-sm xl:text-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-wrap justify-center items-center">
                            <div class="w-full flex flex-wrap justify-center items-center">
                                <div class="w-auto font-semibold">{{thing.number + '號'}}</div>
                                <div class="w-auto font-semibold">{{thing.name}}</div>
                            </div>
                            <div class="w-full flex flex-wrap justify-center items-center">
                                <div class="w-auto text-center font-semibold">接送人員:</div>
                                <div v-if="thing.isMom" class="w-auto text-[#F08080] text-center font-semibold">媽媽</div>
                                <div v-else class="w-auto text-[#0000CD] text-center font-semibold">爸爸</div>
                            </div>
                            <div class="w-full flex flex-wrap justify-center items-center">
                                <div class="w-auto text-center font-semibold">抵達情況:</div>
                                <div v-if="thing.isArrive" class="w-auto text-[#DC143C] text-center font-semibold">{{ thing.time + '分抵達'}}</div>
                                <div v-else class="w-auto text-[#79FF79] text-center font-semibold">已抵達</div>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute w-[100vw] h-[100vh] top-0 left-0 bg-white flex flex-col justify-center items-center z-[9999]" v-else>
        <div class="text-2xl">此畫面無法用手機開啟</div>
        <div
            @click="tohome"
            class="absolute w-auto h-auto top-0 right-0 p-2 flex flex-wrap justify-center items-center">
            <el-icon size="50"><Close /></el-icon>
        </div>
    </div>
</template>

<script setup>
import { ref,computed,onBeforeUnmount,onMounted } from 'vue'
import { useRouter } from "vue-router";
import { useMenuStore,useMobileStore,useheaderStore,useAnnounceStore } from '@/stores/index'
import 'animate.css'

const router = useRouter()
const menuStore = useMenuStore()
const mobileStore = useMobileStore()
const headerStore = useheaderStore()
const announceStore = useAnnounceStore()

onMounted(() => {
    headerStore.closeHeader()
    menuStore.closeMenu()

    // setTimeout(() => {
    //     list.value[1].crowd.push({
    //         number:8,
    //         name:'老鼠十號',
    //         time:'14',
    //         isArrive:false,
    //     })
    // }, 2000);
})

onBeforeUnmount(() => {
    headerStore.openHeader()
    menuStore.openMenu()
    window.clearInterval(timer.value)
})

const list = ref([
    {
        class:'猴子班',
        teacher:'曾O義',
        img:'img/monkey.png',
        crowd:[ 
            {
                number:1,
                name:'猴子一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'猴子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'猴子三號',
                time:'15',
                isMom:false,
                isArrive:false,
            },
            {
                number:4,
                name:'猴子四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
            {
                number:1,
                name:'猴子一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'猴子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'猴子三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'猴子四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
            {
                number:1,
                name:'猴子一號',
                time:'32',
                isMom:false,
                isArrive:false,
            },
            {
                number:2,
                name:'猴子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'猴子三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'猴子四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
            {
                number:1,
                name:'猴子一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'猴子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'猴子三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'猴子四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
            {
                number:1,
                name:'猴子一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'猴子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'猴子三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'猴子四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
            {
                number:1,
                name:'猴子一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'猴子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'猴子三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'猴子四號',
                time:'21',
                isMom:false,
                isArrive:true,
            },
            {
                number:1,
                name:'猴子一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'猴子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'猴子三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'猴子四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },

        ]
    },
    {
        class:'老鼠班',
        teacher:'曾O義',
        img:'img/mouse.png',
        crowd:[ 
            {
                number:1,
                name:'老鼠一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'老鼠二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'老鼠三號',
                time:'15',
                isMom:false,
                isArrive:false,
            },
            {
                number:4,
                name:'老鼠四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
        ]
    },
    {
        class:'黃牛班',
        teacher:'曾O義',
        img:'img/ox.png',
        crowd:[ 
            {
                number:1,
                name:'黃牛一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'黃牛二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'黃牛三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'黃牛四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
        ]
    },
    {
        class:'老虎班',
        teacher:'曾O義',
        img:'img/tiger.png',
        crowd:[ 
            {
                number:1,
                name:'老虎一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'老虎二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'老虎三號',
                time:'15',
                isMom:false,
                isArrive:false,
            },
            {
                number:4,
                name:'老虎四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
        ]
    },
    {
        class:'兔子班',
        teacher:'曾O義',
        img:'img/tiger.png',
        crowd:[ 
            {
                number:1,
                name:'兔子一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'兔子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'兔子三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'兔子四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
        ]
    },
    {
        class:'河馬班',
        teacher:'曾O義',
        img:'img/ox.png',
        crowd:[ 
            {
                number:1,
                name:'河馬一號',
                time:'32',
                isMom:false,
                isArrive:false,
            },
            {
                number:2,
                name:'河馬二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'河馬三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'河馬四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
        ]
    },
    {
        class:'綿羊班',
        teacher:'曾O義',
        img:'img/mouse.png',
        crowd:[ 
            {
                number:1,
                name:'綿羊一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'綿羊二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'綿羊三號',
                time:'15',
                isMom:false,
                isArrive:false,
            },
            {
                number:4,
                name:'綿羊四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
        ]
    },
    {
        class:'螃蟹班',
        teacher:'曾O義',
        img:'img/monkey.png',
        crowd:[ 
            {
                number:1,
                name:'螃蟹一號',
                time:'32',
                isMom:false,
                isArrive:false,
            },
            {
                number:2,
                name:'螃蟹二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'螃蟹三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'螃蟹四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
        ]
    },
    {
        class:'貓咪班',
        teacher:'曾O義',
        img:'img/monkey.png',
        crowd:[ 
            {
                number:1,
                name:'貓咪一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'貓咪二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'貓咪三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'貓咪四號',
                time:'21',
                isMom:false,
                isArrive:true,
            },
        ]
    },
    {
        class:'獅子班',
        teacher:'曾O義',
        img:'img/mouse.png',
        crowd:[ 
            {
                number:1,
                name:'獅子一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'獅子二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'獅子三號',
                time:'15',
                isMom:true,
                isArrive:false,
            },
            {
                number:4,
                name:'獅子四號',
                time:'21',
                isMom:false,
                isArrive:true,
            },
        ]
    },
    {
        class:'蠑螈班',
        teacher:'曾O義',
        img:'img/ox.png',
        crowd:[ 
            {
                number:1,
                name:'蠑螈一號',
                time:'32',
                isMom:true,
                isArrive:false,
            },
            {
                number:2,
                name:'蠑螈二號',
                time:'43',
                isMom:true,
                isArrive:true,
            },
            {
                number:3,
                name:'蠑螈三號',
                time:'15',
                isMom:false,
                isArrive:false,
            },
            {
                number:4,
                name:'蠑螈四號',
                time:'21',
                isMom:true,
                isArrive:true,
            },
        ]
    },
])
const timer = ref(null)
const showIndex = ref(0)
const maxCount = ref(0)
const showList = computed(() => {
    let target = []
    target = list.value.slice(showIndex.value*4,showIndex.value*4+4)
    for(let index in target){
        target[index].crowd = target[index].crowd.slice(0,maxCount.value*2)
    }
  return target
})
const isMobile = computed(() => {
  return mobileStore.isMobile
})
const init = () => {
    headerStore.closeHeader()
    menuStore.closeMenu()
    maxCount.value = Math.floor((window.innerHeight - 70)/90) 
    //console.log(maxCount.value)

    timer.value = window.setInterval(( () => {
        let max = Math.floor(list.value.length/4)
        if(showIndex.value >= max) {
            showIndex.value = 0
        }else{
            showIndex.value++
        }
        //console.log('showList',showList.value)

    }), 5000);
}

init()

const tohome = () => {
    announceStore.closeAnnounce()
}

// //延遲設定
// const delay = () => {   
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve('delay');
//         }, 2000);
//     });
// }

const getImageUrl = (path) => {
    return new URL(`../assets/${path}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.fade-enter-active, 
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
</style>