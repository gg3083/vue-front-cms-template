<template>
    <div>
        <el-table ref="myTable" v-loading="tableLoading" :data="tablePage">
            <!--  type内置类型列  -->
            <el-table-column type="selection" align="center" />
            <template v-for="(col, index) in column">
                <!--  普通列  -->
                <el-table-column
                    :key="index"
                    :prop="col.prop"
                    :label="col.label"
                    :index="col.index"
                    :column-key="col.columnKey"
                    :width="col.width"
                    :min-width="col.minWidth"
                    :fixed="col.fixed"
                    :render-header="col.renderHeader"
                    :sortable="col.sortable || false"
                    :sort-method="col.sortMethod"
                    :sort-by="col.sortBy"
                    :sort-orders="col.sortOrders"
                    :resizable="col.resizable || true"
                    :formatter="col.formatter"
                    :show-overflow-tooltip="col.showOverflowTooltip || false"
                    :align="col.align || 'center'"
                    :header-align="col.headerAlign || col.align || 'center'"
                    :class-name="col.className"
                    :label-class-name="col.labelClassName"
                    :selectable="col.selectable"
                    :reserve-selection="col.reserveSelection || false"
                    :filters="col.filters"
                    :filter-placement="col.filterPlacement"
                    :filter-multiple="col.filterMultiple"
                    :filter-method="col.filterMethod"
                    :filtered-value="col.filteredValue"
                >
                    <!--  列头  -->
                    <template #header="scope">
                        <!--  表头插槽  -->
                        <slot :name="`${col.prop}Head`" :scope="scope">
                            {{ scope.column.label }}
                        </slot>
                    </template>

                    <!--  内容  -->
                    <template v-slot:default="scope">
                        <!--  常规的按钮  -->
                        <div v-if="col.btnData">
                            <button-comp
                                v-if="col.btnData.viewBtn"
                                :button-item="col.btnData.viewBtn"
                                @clickFunc="getRowData(scope, common, 'viewBtn', 'viewData')"
                            />
                            <button-comp
                                v-if="col.btnData.editBtn"
                                :button-item="col.btnData.editBtn"
                                @clickFunc="getRowData(scope, common, 'editBtn', 'editData')"
                            />

                            <!-- 编辑按钮后，删除按钮前的插槽 -->
                            <slot name="btnSlotMiddle" :scope="scope" />

                            <button-comp
                                v-if="col.btnData.deleteBtn"
                                :button-item="col.btnData.deleteBtn"
                                @clickFunc="deleteRow(scope, common)"
                            />

                            <!--  更多按钮插槽  -->
                            <slot name="btnSlotLast" :scope="scope" />
                        </div>

                        <!--  表格内容插槽  -->
                        <slot v-else :name="`${col.prop}`" :scope="scope">
                            {{ scope.row[col.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-pagination
            background
            layout="total, sizes, prev, pager, next"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :current-page="currentPage"
            :total="total"
            class="fyDiv"
            @size-change="handleSize"
            @current-change="handlePage"
            style="float: right"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'my-table',
    props: {
        fetchFunc: {
            type: Function,
            required: true,
            default: () => true,
        },
        column: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            pageSizes: [10, 20, 30, 40],
            tablePage: [],
            tableLoading: false,
        }
    },
    created() {
        console.log('init my table')
        this._getPageTab1(this.currentPage, this.pageSize)
    },
    methods: {
        handleSize(val) {
            this.pageSize = val
            this._getPageTab1(this.currentPage, val)
        },
        handlePage(val) {
            this.currentPage = val
            this._getPageTab1(val, this.pageSize)
        },
        _getPageTab1(current, size) {
            this.tableLoading = true
            this.fetchFunc({ pageNo: current, pageSize: size })
                .then((res) => {
                    console.log(res)
                    this.total = res.obj === null ? 0 : res.obj.totals
                    this.tablePage = res.obj === null ? [] : res.obj.data
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
            this.tableLoading = false
        },
    },
}
</script>

<style scoped></style>
