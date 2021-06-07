<template>
    <div class="container">
        <el-card class="anoCard">
            <div slot="header">
                <span>{{ title }}</span>
            </div>
            <div style="display: flex;">
                <ul
                    class="role-list"
                    v-infinite-scroll="loadData"
                    infinite-scroll-disabled="disabled"
                    style="overflow:auto"
                >
                    <li
                        :key="key"
                        v-for="(data, key) in tableData"
                        :class="{ 'role-item-active': currentModel.id === data.id }"
                        @click="clickCurrent(data)"
                    >
                        {{ data.roleName }} : {{ data.roleAlias }}
                    </li>
                    <p v-if="loading" style="width: 180px; text-align: center">加载中...</p>
                    <p v-if="noMore" style="width: 180px; text-align: center; font-size: 8px;color: #99a9bf;">
                        _____到底了_____
                    </p>
                </ul>

                <div class="role-show">
                    {{ currentModel }}
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { listRole, addRole, updateRole, deleteRole } from '@/api/role'
import {
    tableColumn,
    searchFormColumn,
    modelFormRules,
    editModelFormColumn,
    addModelFormColumn,
    modelForm,
    operateBtn,
} from './role_data'
export default {
    name: 'role_new',
    data() {
        return {
            title: '角色管理',
            fetchFunc: listRole,
            editFunc: updateRole,
            delFunc: deleteRole,
            addFunc: addRole,
            tableColumn: tableColumn,
            searchFormColumn,
            searchForm: {},
            modelFormRules,
            editModelFormColumn,
            addModelFormColumn,
            modelForm,
            operateBtn,
            tableData: [],
            currentModel: '',
            checkLi: false,
            currentPage: 1,
            pageSize: 20,
            loading: false,
            totals: 0,
        }
    },
    created() {
        this._getPageTab1(this.currentPage, this.pageSize)
    },
    computed: {
        noMore() {
            return this.tableData.length >= this.totals
        },
        disabled() {
            return this.loading || this.noMore
        },
    },
    methods: {
        _getPageTab1(current, size) {
            listRole({ pageNo: current, pageSize: size })
                .then((res) => {
                    let data = res.obj.data
                    this.tableData = this.tableData.concat(data)
                    console.log(this.tableData.length)
                    this.totals = res.obj.totals
                    // this.treePage = this.loadDataByRecursive(data, 0)
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
        },
        clickCurrent(data) {
            this.currentModel = data
            this.checkLi = true
        },
        loadData() {
            console.log('loadData')
            this.loading = true
            setTimeout(() => {
                if (this.tableData.length / this.pageSize + 1 < this.currentPage) {
                    console.log('没有啦！！！')
                    return
                } else {
                    this.currentPage++
                    this._getPageTab1(this.currentPage, this.pageSize)
                }
                this.loading = false
            }, 2000)
        },
    },
}
</script>

<style scoped>
.role-list {
    width: 200px;
    height: 500px;
}
.role-list li {
    width: 180px;
    /*background: #8c939d;*/
    margin-bottom: 10px;
    text-align: center;
    height: 30px;
    font-size: 14px;
}
.role-list li:hover {
    color: #409eff !important;
}

.role-item-active {
    color: #409eff !important;
}

/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
.role-list::-webkit-scrollbar {
    width: 5px; /*对垂直滚动条有效*/
    height: 1px; /*对水平滚动条有效*/
    /*display: none;*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
.role-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #ececec;
    background-color: #ececec;
    display: none;
    border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
.role-list::-webkit-scrollbar-thumb {
    border-radius: 7px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
    display: none;
}

/* 光标移到滚动滑块上样式颜色变深 */
.role-list::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.2);
}

/*定义两端按钮的样式*/
/*.role-list::-webkit-scrollbar-button {*/
/*    background-color: cyan;*/
/*}*/

/*定义右下角汇合处的样式*/
.role-list::-webkit-scrollbar-corner {
    background: khaki;
}
</style>
