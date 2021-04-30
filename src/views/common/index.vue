<template>
    <div class="container">
        <el-card class="card">
            <div slot="header">
                <span>角色设置</span>
            </div>
            <!-- 3将组件写入到页面 -->
            <!-- 7如果由额外的参数也可以用extraFormData传入 -->
            <my-table
                border
                :fetch-func="listRoleFunc"
                :column="versionManageColumn"
                :pagination="versionManagePagi"
                :data-url="verifyManageUrl"
                :filter-btn="filterBtn"
                :extra-form-data="extraFormData"
            >
                <template #operate>
                    <el-button type="info">查看信息</el-button>
                </template>
                <template #packageName="{ scope }">
                    <div style="color:red">{{ scope.row.packageName }}(嘿嘿嘿,我要变红)</div>
                </template>
            </my-table>
        </el-card>
    </div>
</template>
<script>
import { versionManageColumn, filterBtn } from './commonTableOption'
import MyTable from '../components/my-table/my-table'
import { listRole } from '@/api/user'

export default {
    components: {
        MyTable,
    },
    data() {
        return {
            versionManagePagi: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            },
            versionManageColumn,
            verifyManageUrl: 'http://47.110.148.106:3030/mock/11/version/manage',
            filterBtn,
            extraFormData: {
                name: '花花',
            },
            listRoleFunc: listRole,
        }
    },
}
</script>
