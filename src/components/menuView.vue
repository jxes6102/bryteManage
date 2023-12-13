<template>
    <div class="fixed top-[8vh] left-0 w-[100vw] md:w-[300px] h-[92vh] bg-neutral-100 flex flex-col justify-start items-center">
        <template v-for="(item,index) in urlData" :key="index">
            <div class="w-4/5 text-2xl font-medium mt-4 flex flex-wrap justify-center items-center">{{item.name}}</div>
            <template v-for="(thing,key) in item.children" :key="key">
                <div class="w-4/5 text-2xl font-medium mt-1 flex flex-wrap justify-center items-center">
                    <el-icon>
                        <component :is="thing.icon"></component>
                    </el-icon>
                    {{thing.name}}
                </div>
            </template>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import 'animate.css'

const urlData = ref([
    {
        name:'系統管理',
        children:[
            {
                name:'基本參數',
                icon:'Document'
            },
            {
                name:'權限管理',
                icon:'Avatar'
            },
        ]
    },
    {
        name:'訊息E點通',
        children:[
            {
                name:'組織管理',
                icon:'AddLocation'
            },
            {
                name:'公告管理',
                icon:'Service'
            },
            {
                name:'積分管理',
                icon:'Coin'
            },
            {
                name:'推播通知',
                icon:'Phone'
            },
        ]
    },
    {
        name:'豋出',
    },
]) 


</script>

<style lang="scss" scoped>

</style>