<template>
    <div
        @click="close"
        class="transition-all fixed w-full h-full left-0 top-0 bg-slate-800 opacity-50 flex flex-wrap justify-center items-center"
        :style="{ 'z-index': layer }"
    >
    </div>
    <div 
        :class="{ 
            'left-[calc(50%_-_135px)] top-[calc(50%_-_225px)] md:left-[calc(50%_-_200px)] md:top-[calc(50%_-_300px)] w-[270px] h-[450px] md:w-[400px] md:h-[600px] ' : type == 'default',
            'left-[calc(50%_-_45vw)] top-[calc(50%_-_225px)] md:left-[calc(50%_-_350px)] md:top-[calc(50%_-_300px)] w-[90vw] h-[450px] md:w-[700px] md:h-[600px] ' : type == 'large',
            'left-[calc(50%_-_135px)] top-[calc(50%_-_180px)] md:left-[calc(50%_-_250px)] md:top-[calc(50%_-_200px)] w-[270px] h-[360px] md:w-[500px] md:h-[400px] ' : type == 'small'
        }"
        class="animate__animated animate__bounceIn fixed rounded-lg bg-white flex flex-col justify-start items-center "
        :style="{ 'z-index': layer }"
    >
        <div
            v-if="closeStatus"
            @click.stop="close" 
            class="absolute w-auto h-auto top-0 right-0 p-2 flex flex-wrap justify-center items-center cursor-pointer">
            <el-icon size="30"><Close /></el-icon>
        </div>
        <slot name="title"></slot>
        <slot name="message"></slot>
        <slot name="control"></slot>
    </div>
    
</template>

<script setup>
/*eslint-disable*/
import 'animate.css';
import { ref,computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()

const props = defineProps({
    type: {
        type: String,
        default: 'default'
    },
    closeStatus:{
        type:Boolean,
        default:true
    },
    layer:{
        type:String,
        default:'1000'
    },
})

const emit = defineEmits(['close'])

const isMobile = computed(() => {
    return store.state.isMobile
})

const close = () => {
    // console.log('close')
    emit('close')
}

</script>

<style lang="scss" scoped>

</style>