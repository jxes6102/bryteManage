<template>
    <div 
        class="w-full h-[100vh] flex flex-col justify-start items-start"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            發送推播通知
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[80%] my-2 p-1 md:p-2 rounded-md ">
            <el-form :inline="false" :model="form" label-width="80px">
                <el-form-item label="標題">
                    <el-input 
                        placeholder="" 
                        v-model="form.title"
                        :style="{ width: isMobile ? '95%' : '400px' }" />
                </el-form-item>
                <el-form-item label="內容">
                    <el-input 
                        placeholder="" 
                        v-model="form.content"
                        :style="{ width: isMobile ? '95%' : '400px' }" />
                </el-form-item>
                <el-form-item label="目標">
                    <el-select
                        :style="{ width: isMobile ? '95%' : '400px' }"
                        v-model="form.goal" 
                        placeholder=""
                        >
                        <el-option label="指定使用者" value="user" />
                        <el-option label="主題" value="subject" />
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.goal == 'user'" label="使用者">
                    <el-input
                        disabled
                        v-model="form.user"
                        placeholder=""
                        class="input-with-select"
                        :style="{ width: isMobile ? '95%' : '400px' }"
                        >
                        <template #append>
                            <el-button
                                @click="editUser"
                                style="background-color: #409eff;color:white;">
                                選擇
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item v-else label="主題名稱">
                    <el-input 
                        placeholder="" 
                        v-model="form.topical"
                        :style="{ width: isMobile ? '95%' : '400px' }" />
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="onSubmit">發送</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>

        <Teleport to="body">
            <dialogView type="large" v-if="groupStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">選擇集團</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-full h-[80%] my-[1px] md:my-1 px-2 py-[1px] md:py-1 flex flex-col justify-around items-center">
                        <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1">
                            <el-form class="w-full" :model="groupForm">
                                <el-form-item>
                                    <el-col :span="16">
                                        <el-input placeholder="集團名稱或集團代號" v-model="groupForm.name" />
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                        <div class="w-[100%] md:w-[95%] h-auto flex flex-wrap justify-center items-center">
                            <el-table :data="groupTableData" stripe style="width: 100%">
                                <el-table-column prop="date" label="集團名稱">
                                    <template #default="scope">
                                        <el-tooltip
                                            :disabled="!isMobile"
                                            class="box-item"
                                            effect="light"
                                            :content="scope.row.date"
                                            placement="top-start"
                                        >
                                            <div class="truncate">{{ scope.row.date }}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="集團代號">
                                    <template #default="scope">
                                        <el-tooltip
                                            :disabled="!isMobile"
                                            class="box-item"
                                            effect="light"
                                            :content="scope.row.date"
                                            placement="top-start"
                                        >
                                            <div class="truncate">{{ scope.row.name }}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="負責人姓名">
                                    <template #default="scope">
                                        <el-tooltip
                                            :disabled="!isMobile"
                                            class="box-item"
                                            effect="light"
                                            :content="scope.row.date"
                                            placement="top-start"
                                        >
                                            <div class="truncate">{{ scope.row.address }}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="單位數量">
                                    <template #default="scope">
                                        <el-tooltip
                                            :disabled="!isMobile"
                                            class="box-item"
                                            effect="light"
                                            :content="scope.row.date"
                                            placement="top-start"
                                        >
                                            <div class="truncate">{{ scope.row.address }}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="w-[100%] h-auto flex flex-wrap justify-center items-center">
                            <el-pagination
                                small
                                background
                                layout="prev, pager, next"
                                :total="50"
                                class="mt-1"
                            />
                        </div>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-end items-center">
                        <button
                            class="min-w-[10%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            確定
                        </button>
                        <button
                            @click="cancel"
                            class="min-w-[10%] bg-blue-500 hover:bg-blue-600 text-white font-bold mx-2 py-1 px-2 md:py-2 md:px-3 rounded">
                            取消
                        </button>
                    </div>
                </template>
            </dialogView>
            <dialogView type="large" v-if="userStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">選擇使用者</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-[90%] flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto">
                        <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1">
                            <el-form :inline="!isMobile" :model="userForm" label-width="60px">
                                <el-form-item label="集團">
                                    <el-col :span="24">
                                        <el-input
                                            disabled
                                            v-model="form.name"
                                            placeholder=""
                                            class="input-with-select"
                                            >
                                            <template #append>
                                                <el-button
                                                    @click="openSelect" 
                                                    style="background-color: #409eff;color:white;">
                                                    選擇
                                                </el-button>
                                            </template>
                                        </el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="機構">
                                    <el-col :span="24">
                                        <el-select
                                            :style="isMobile ? 'width: 100%;font-size: 14px;' : ''"
                                            v-model="form.institution" 
                                            placeholder="">
                                            <el-option label="Zone one" value="shanghai" />
                                            <el-option label="Zone two" value="beijing" />
                                        </el-select>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label-width="0px">
                                    <el-col :span="18">
                                        <el-input placeholder="使用帳號或信箱" v-model="form.keyWord" />
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                        <div class="w-[100%] md:w-[95%] h-[70%] flex flex-wrap justify-center items-center">
                            <el-table :data="userTableData" stripe style="width: 100%">
                                <el-table-column prop="date" label="集團名稱">
                                    <template #default="scope">
                                        <el-tooltip
                                            :disabled="!isMobile"
                                            class="box-item"
                                            effect="light"
                                            :content="scope.row.date"
                                            placement="top-start"
                                        >
                                            <div class="truncate">{{ scope.row.date }}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="單位名稱">
                                    <template #default="scope">
                                        <el-tooltip
                                            :disabled="!isMobile"
                                            class="box-item"
                                            effect="light"
                                            :content="scope.row.date"
                                            placement="top-start"
                                        >
                                            <div class="truncate">{{ scope.row.name }}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="使用者名稱">
                                    <template #default="scope">
                                        <el-tooltip
                                            :disabled="!isMobile"
                                            class="box-item"
                                            effect="light"
                                            :content="scope.row.date"
                                            placement="top-start"
                                        >
                                            <div class="truncate">{{ scope.row.address }}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="信箱">
                                    <template #default="scope">
                                        <el-tooltip
                                            :disabled="!isMobile"
                                            class="box-item"
                                            effect="light"
                                            :content="scope.row.date"
                                            placement="top-start"
                                        >
                                            <div class="truncate">{{ scope.row.address }}</div>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                small
                                background
                                layout="prev, pager, next"
                                :total="50"
                                class="my-4"
                            />
                        </div>
                    </div>
                </template>
            </dialogView>
        </Teleport>
    </div>
</template>

<script setup>
/*eslint-disable*/
import { ref,computed,provide } from "vue"
import { useRouter,useRoute } from "vue-router"
import { useMobileStore } from '@/stores/index'
import dialogView from "@/components/dialogView.vue"

const router = useRouter()
const route = useRoute()

const mobileStore = useMobileStore()

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const groupStatus = ref(false)
const groupForm = ref({
  name: '',
})

const form = ref({
  title: '',
  content:'',
  goal:'user',
  user:'',
  topical:''
})

const onSubmit = () => {
  console.log('submit!')
}

const openSelect = () => {
    groupStatus.value = true
}

const cancel = () => {
    groupStatus.value = false
    userStatus.value = false
}

provide('cancel', cancel)

const tableData = [
  {
    img:'',
    type:'促銷活動',
    title:'實事求是',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'活動訊息',
    title:'我們都是一個沒有關係的人',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'促銷活動',
    title:'實事求是',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'活動訊息',
    title:'我們都是一個沒有關係的人',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'促銷活動',
    title:'實事求是',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'活動訊息',
    title:'我們都是一個沒有關係的人',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'促銷活動',
    title:'實事求是',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },
  {
    img:'',
    type:'活動訊息',
    title:'我們都是一個沒有關係的人',
    startTime:'2023/02/13 00:00',
    endTime:'2023/02/13 00:00'
  },

]

const groupTableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'Los Angeles',
  },
]

const userTableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'Los Angeles',
  },
]

const newsform = ref({
    id:'',
    type:'',
    title:'',
    text:'',
    img:'',
    startTime:'',
    endTime:'',
    createTime:'',
    modifyTime:'',
    content:''
})

const userForm = ref({
    name:'',
    institution:'',
    keyWord:''
})

const userStatus = ref(false)
const editUser = (item) => {
    console.log('editUser',item)
    userStatus.value = true
}

const checkNew = () => {
    console.log('checkNew',newsform.value)
}

</script>

<style lang="scss" scoped>
:deep(.el-input__wrapper){
    width: 200px;
}

:deep(.el-form-item__label) {
    font-size: 16px;
}

@media screen and (max-width: 330px) {
    :deep(.custom-el-form-item .el-form-item__content) {
        width: 100%;
        justify-content: center;
        align-items: center;
    }

}

</style>