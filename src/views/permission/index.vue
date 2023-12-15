<template>
    <div 
        class="flex flex-col justify-center items-center"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            權限管理
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full my-3 p-4 border-2 rounded">
            <el-form
                label-width="60"
                :inline="true" 
                :model="formInline" 
                class="demo-form-inline">
                <el-form-item label="集團">
                    <el-input
                        v-model="formInline.user" 
                        placeholder="Approved by" 
                        clearable />
                </el-form-item>
                <el-form-item label="機構">
                    <el-select
                        class="w-[200px]"
                        v-model="formInline.region"
                        placeholder="Activity zone"
                        clearable
                    >
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="關鍵字">
                    <el-input
                        v-model="formInline.keyWord" 
                        placehozlder="Approved by" 
                        clearable />
                </el-form-item>
                <el-form-item class="w-full flex flex-wrap justify-end items-center">
                    <!-- <el-icon @click="onSubmit"><Search /></el-icon> -->
                    <el-button icon="Search" />
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="w-full my-3 p-4 border-2 rounded flex flex-wrap justify-start items-center">
            <div class="w-1/2 flex flex-wrap justify-start items-center">
                <div class="px-1">集團</div>
                <div>
                    <el-input
                        v-model="formInline.user" 
                        placeholder="Approved by" 
                        clearable />
                </div>
                <div></div>
            </div>
            <div class="w-1/2">zxc</div>
        </div> -->
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

const formInline = ref({
  user: '',
  region: '',
  date: '',
  keyWord:''
})

const onSubmit = () => {
  console.log('submit!')
}

</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper){
    width: 200px;
}

:deep(.el-form-item__label) {
    font-size: 16px;
}
</style>