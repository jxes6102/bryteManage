<template>
    <div 
        class="w-full h-[100vh] flex flex-col justify-start items-start"
    >
        <div class="w-full my-3 px-3 text-3xl flex flex-wrap justify-start items-center">
            組織管理
        </div>
        <el-tabs v-model="activeName" class="demo-tabs mx-2" @tab-click="handleClick">
            <el-tab-pane label="集團" name="1"></el-tab-pane>
            <el-tab-pane label="單位" name="2"></el-tab-pane>
            <el-tab-pane label="用戶" name="3"></el-tab-pane>
        </el-tabs>
        <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
        <div class="w-full md:w-[80%] my-2 p-1 md:p-2 rounded-md ">
            <el-form v-if="activeName == '1'" :inline="!isMobile" :model="groupForm" label-width="60px">
                <el-form-item label="關鍵字">
                    <el-col :span="24">
                        <el-input placeholder="集團名稱或集團代號" v-model="groupForm.keyWord" />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form v-else-if="activeName == '2'" :inline="!isMobile" :model="institutionForm" label-width="60px">
                <el-form-item label="集團">
                    <el-col :span="24">
                        <el-input
                            disabled
                            v-model="institutionForm.groupName"
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
                <el-form-item label="關鍵字">
                    <el-col :span="24">
                        <el-input placeholder="單位名稱或單位代號" v-model="institutionForm.keyWord" />
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <el-button class="mx-1" type="primary" @click="onSubmit">查詢</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form v-else-if="activeName == '3'" :inline="!isMobile" :model="userForm" label-width="60px">
                <el-form-item label="集團">
                    <el-col :span="24">
                        <el-input
                            disabled
                            v-model="userForm.groupName"
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
                            v-model="userForm.institution" 
                            placeholder="">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="關鍵字">
                    <el-col :span="24">
                        <el-input placeholder="使用者名稱或帳號" v-model="userForm.keyWord" />
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
        <!-- <div class="w-full my-1 md:my-3 px-3 text-xl font-semibold flex flex-wrap justify-start items-center">
            群組名稱
        </div> -->
        <div class="w-full md:w-[80%] h-auto my-1 px-2 py-1 flex flex-wrap justify-center items-center">
            <el-table v-if="activeName == '1'" :data="groupTable" stripe style="width: 100%">
                <el-table-column prop="groupName" label="集團名稱" />
                <el-table-column prop="groupID" label="集團代號" />
                <el-table-column prop="leader" label="負責人姓名" />
                <el-table-column prop="amount" label="單位數量" />
                <!-- <el-table-column prop="date" label="Date">
                    <template #default="scope">
                        <div @click="editAuthority(scope)" class="truncate">{{ scope.row.address }}</div>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-table v-else-if="activeName == '2'" :data="institutionTable" stripe style="width: 100%">
                <el-table-column prop="institutionName" label="單位名稱" />
                <el-table-column prop="institutionID" label="單位代號" />
                <el-table-column prop="leader" label="負責人姓名" />
                <el-table-column prop="phone" label="連絡電話" />
                <el-table-column prop="receivable" label="應收帳款" />
                <el-table-column prop="expirationDate" label="到期日" />
            </el-table>
            <el-table v-else-if="activeName == '3'" :data="userTable" stripe style="width: 100%">
                <el-table-column prop="groupName" label="集團" />
                <el-table-column prop="institutionName" label="機構" />
                <el-table-column prop="user" label="名稱" />
                <el-table-column prop="account" label="帳號" />
                <el-table-column prop="email" label="信箱" />
            </el-table>
        </div>
        <div class="w-full md:w-[80%] h-auto flex flex-wrap justify-center items-center">
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

        <choseGroup @close="cancel" v-if="groupStatus"></choseGroup>

        <Teleport to="body">
            <dialogView @close="cancel" v-if="authorityStatus">
                <template v-slot:title>
                    <div class="w-full my-[1px] md:my-1 px-2 py-[1px] md:py-1 text-2xl">群組名稱</div>
                    <div class="line-style w-[100%] text-[#D3D3D3] flex"></div>
                </template>
                <template v-slot:message>
                    <div class="w-[100%] h-auto flex flex-wrap justify-center items-center overflow-y-auto">
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
import { ref,computed,watch } from "vue"
import { useRouter,useRoute } from "vue-router"
import { useMobileStore } from '@/stores/index'
import dialogView from "@/components/dialogView.vue"
import choseGroup from "@/components/choseGroup.vue"

const router = useRouter()
const route = useRoute()

const mobileStore = useMobileStore()

const isMobile = computed(() => {
  return mobileStore.isMobile
})

const groupStatus = ref(false)

const groupForm = ref({
    keyWord:''
})

const institutionForm = ref({
  groupName:'',
  keyWord:'',
})

const userForm = ref({
  groupName:'',
  institution:'',
  keyWord:'',
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

const groupTable = [
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
  {
    groupName: '精英國際教育集團',
    groupID: 'ELITE',
    leader: '張義雄',
    amount:'13'
  },
]

const institutionTable = [
  {
    institutionName: '精英國際教育集團',
    institutionID: 'ELITE',
    leader: '張義雄',
    phone:'0958457154',
    receivable:'123',
    expirationDate:'2024-12-04'
  },
  {
    institutionName: '精英國際教育集團',
    institutionID: 'ELITE',
    leader: '張義雄',
    phone:'0958457154',
    receivable:'123',
    expirationDate:'2024-12-04'
  },
  {
    institutionName: '精英國際教育集團',
    institutionID: 'ELITE',
    leader: '張義雄',
    phone:'0958457154',
    receivable:'123',
    expirationDate:'2024-12-04'
  },

]

const userTable = [
  {
    groupName: '精英國際教育集團',
    institutionName: '智光CRM客戶管理',
    user: '張義雄',
    account :'root',
    email:'zxcasd@gmail.com',
  },
  {
    groupName: '精英國際教育集團',
    institutionName: '智光CRM客戶管理',
    user: '張義雄',
    account :'root',
    email:'zxcasd@gmail.com',
  },
  {
    groupName: '精英國際教育集團',
    institutionName: '智光CRM客戶管理',
    user: '張義雄',
    account :'root',
    email:'zxcasd@gmail.com',
  },
  {
    groupName: '精英國際教育集團',
    institutionName: '智光CRM客戶管理',
    user: '張義雄',
    account :'root',
    email:'zxcasd@gmail.com',
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

// activeName string 1 集團 2 單位 3 用戶
const activeName = ref('1')
watch(activeName, (newVal, oldVal) => {
    //  console.log('newVal',newVal)
})
const handleClick = (tab, event) => {
    //  console.log('activeName',activeName.value)
    //  console.log('tab', tab)
    //  console.log('event', event)
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

:deep(.demo-tabs > .el-tabs__header) {
    margin: 0px !important;
}


</style>