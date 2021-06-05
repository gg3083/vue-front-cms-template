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
        >
        </SimplePage>
    </div>
</template>

<script>
import SimplePage from '@/views/components/simple_page'
import { listRole, addUser, updateUser, deleteUser } from '@/api/role'
import {
    tableColumn,
    searchFormColumn,
    modelFormRules,
    editModelFormColumn,
    addModelFormColumn,
    modelForm,
    operateBtn,
} from './template1_data'
export default {
    name: 'role',
    components: {
        SimplePage,
    },
    data() {
        return {
            title: '权限管理',
            fetchFunc: listRole,
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
        }
    },
}
</script>

<style scoped></style>
