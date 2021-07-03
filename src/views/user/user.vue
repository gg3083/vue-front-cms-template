<template>
    <div class="container">
        <SimplePage
            :title="title"
            :fetch-func="fetchFunc"
            :edit-func="editFunc"
            :del-func="delFunc"
            :add-func="addFunc"
            :table-column="tableColumn"
            :search-form-column="searchFormColumn"
            :search-form="searchForm"
            :model-form-rules="modelFormRules"
            :edit-model-form-column="editModelFormColumn"
            :add-model-form-column="addModelFormColumn"
            :model-form="modelForm"
            :operate-btn="operateBtn"
            @restEmit="restPassWord"
        >
        </SimplePage>
    </div>
</template>

<script>
import SimplePage from '@/views/components/simple_page'
import { listUser, addUser, updateUser, resetPwd, deleteUser } from '@/api/user'
import { listRole } from '@/api/role'

import {
    tableColumn,
    searchFormColumn,
    modelFormRules,
    editModelFormColumn,
    addModelFormColumn,
    modelForm,
    operateBtn,
} from './user_data'
export default {
    name: 'user',
    components: {
        SimplePage,
    },
    data() {
        return {
            title: '用户管理',
            fetchFunc: listUser,
            editFunc: updateUser,
            delFunc: deleteUser,
            addFunc: addUser,
            tableColumn: tableColumn,
            searchFormColumn,
            searchForm: {},
            modelFormRules,
            editModelFormColumn,
            addModelFormColumn,
            modelForm,
            operateBtn,
            typeSelectData: [],
        }
    },
    created() {
        this.getRoleAll()
    },
    mounted() {},
    methods: {
        restPassWord(args) {
            console.log('restEmit', args)
            this.$confirm('确定要重置该用户的密码吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    resetPwd(args.id)
                        .then((res) => {
                            if (res.code === 200) {
                                // this.tablePage.splice(this.tablePage.findIndex((item) => item.id === row.id), 1)
                                this.$message.success('重置成功')
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                        .catch(() => {
                            this.$message.error('重置失败')
                        })
                })
                .catch(() => {
                    this.$message.info('取消重置')
                })
        },
        getRoleAll() {
            listRole({ pageNo: 1, pageSize: 499 })
                .then((res) => {
                    console.log(res.obj.data)
                    this.typeSelectData = res.obj.data
                    this.setSelectRoleData(res.obj.data)
                })
                .catch((error) => {
                    console.log(error.message)
                })
        },

        setSelectRoleData(data) {
            this.addModelFormColumn.forEach((item) => {
                if (item.prop === 'roleId') {
                    item.typeData = []
                    data.forEach((result) => {
                        item.typeData.push({
                            label: result.roleName,
                            value: result.id,
                        })
                    })
                }
            })
            this.editModelFormColumn.forEach((item) => {
                if (item.prop === 'roleId') {
                    item.typeData = []
                    data.forEach((result) => {
                        item.typeData.push({
                            label: result.roleName,
                            value: result.id,
                        })
                    })
                }
            })
        },
    },
}
</script>

<style scoped></style>
