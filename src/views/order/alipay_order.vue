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
            :set-page-size="20"
        >
        </SimplePage></div
></template>

<script>
import SimplePage from '@/views/components/simple_page'
import { listAlipayOrder } from '@/api/order'
import {
    tableColumn,
    searchFormColumn,
    modelFormRules,
    editModelFormColumn,
    addModelFormColumn,
    modelForm,
    operateBtn,
} from './alipay_data'
export default {
    name: 'alipay_order',
    components: {
        SimplePage,
    },
    data() {
        return {
            title: '角色管理',
            fetchFunc: listAlipayOrder,
            addFunc: listAlipayOrder,
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
