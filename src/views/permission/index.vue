<template>
    <div 
        class="w-full h-[100vh] flex flex-col justify-start items-center"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            權限管理
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-[95%] my-2 p-1 md:p-2 rounded-md ">
            <el-form :inline="!isMobile" :model="form" label-width="60px">
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
                            v-model="form.region" 
                            placeholder="">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="關鍵字">
                    <el-col :span="24">
                        <el-input v-model="form.desc" />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full my-1 md:my-3 px-3 text-xl font-semibold flex flex-wrap justify-start items-center">
            群組名稱
        </div>
        <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-center items-center">
            <el-table :show-header="false" :data="tableData" stripe style="width: 100%">
                <el-table-column prop="date">
                    <template #default="scope">
                        <div @click="editAuthority(scope)" class="truncate">{{ scope.row.address }}</div>
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
                class="mt-4"
            />
        </div>
        <div class="w-full my-3 px-3 text-xl flex flex-wrap justify-start items-center">
            共 1 筆資料
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
            <dialogView v-if="authorityStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">群組名稱</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] md:w-[95%] h-auto flex flex-wrap justify-center items-center overflow-y-auto">
                        <el-table :show-header="false" :data="authority" stripe style="width: 100%">
                            <el-table-column prop="date" label="集團名稱">
                                <template #default="scope">
                                    <el-checkbox v-model="scope.row.status" :label="scope.row.text" size="large" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
                <template v-slot:control>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                    <div class="w-full h-auto my-1 px-2 py-1 flex flex-wrap justify-end items-center">
                        <button
                            @click="checkAuthority"
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
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const openSelect = () => {
    groupStatus.value = true
}

const cancel = () => {
    groupStatus.value = false
    authorityStatus.value = false
}

provide('cancel', cancel)

const tableData = [
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

const authority = ref([
    {
        text:'權限節點說明',
        status:false
    },
    {
        text:'顯示集團管理',
        status:false
    },
    {
        text:'建立集團',
        status:false
    },
    {
        text:'檢視集團',
        status:false
    },
    {
        text:'編輯集團',
        status:false
    },
    {
        text:'刪除集團',
        status:false
    },
    {
        text:'顯示機構管理',
        status:false
    },
    {
        text:'建立機構',
        status:false
    },
    {
        text:'檢視機構',
        status:false
    },
    {
        text:'編輯機構',
        status:false
    },
    {
        text:'刪除機構',
        status:false
    },
    {
        text:'編輯橫幅',
        status:false
    },
    {
        text:'編輯簡介',
        status:false
    },
    {
        text:'顯示用戶管理',
        status:false
    },
    {
        text:'建立用戶',
        status:false
    },
    {
        text:'檢視用戶',
        status:false
    },
    {
        text:'編輯用戶',
        status:false
    },
    {
        text:'刪除用戶',
        status:false
    },
    {
        text:'顯示公告管理',
        status:false
    },
    {
        text:'建立公告',
        status:false
    },
    {
        text:'檢視公告',
        status:false
    },
    {
        text:'編輯公告',
        status:false
    },
    {
        text:'刪除公告',
        status:false
    },
])
const authorityStatus = ref(false)
const editAuthority = (item) => {
    console.log('editAuthority',item)
    authorityStatus.value = true
}

const checkAuthority = () => {
    console.log('authority',authority.value)
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