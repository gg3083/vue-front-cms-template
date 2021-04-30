<template>
    <div class="container">
        <el-card class="card">
            <div slot="header">
                <span>角色设置</span>
            </div>
        </el-card>
        <el-table :data="tablePage" border stripe style="width: 100%;">
            <el-table-column align="center" prop="id" label="ID"></el-table-column>
            <el-table-column align="center" prop="loginName" label="登录账户"></el-table-column>
            <el-table-column align="center" prop="realName" label="昵称"></el-table-column>
            <el-table-column align="center" prop="realName" label="权限"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'index.vue',
    data() {
        return {
            tablePage: [],
        }
    },
}
</script>

<style scoped></style>
