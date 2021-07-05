<template>
    <div class="simple_page">
        <el-card class="mtop30 anoCard">
            <div slot="header">
                <span>{{ title }}</span>
            </div>
            <el-row>
                <div id="search-key">
                    <span>搜索条件：</span>
                    <el-form ref="searchForm" :model="searchForm" label-width="80px" size="mini" inline>
                        <el-form-item
                            :label="`${searchCol.label}:`"
                            :key="index"
                            v-for="(searchCol, index) in searchFormColumn"
                        >
                            <span v-if="searchCol.type">
                                <el-select
                                    v-model="searchCol.value"
                                    :placeholder="searchCol.placeholder"
                                    style="width: 100%;"
                                    size="small"
                                >
                                    <el-option
                                        :key="index"
                                        :label="type_data.label"
                                        :value="type_data.value"
                                        v-for="(type_data, index) in searchCol.typeData"
                                    ></el-option>
                                </el-select>
                            </span>
                            <span v-else>
                                <el-input v-model="searchCol.value" class="el-input-item" size="small"></el-input>
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                :key="key"
                                v-for="(btn, key) in operateBtn"
                                :type="btn.type"
                                @click.native="dynamicFunc(btn.clickFunc, btn.args)"
                                >{{ btn.label }}</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
            </el-row>
            <!--            <el-row>排序：</el-row>-->
            <el-table
                ref="myTable"
                border
                stripe
                :data="tablePage"
                size="mini"
                :header-cell-style="{ background: '#409EFF', color: '#fff' }"
            >
                <template v-for="(col, index) in tableColumn">
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
                        <template v-slot:default="scope">
                            <div v-if="col.btnData">
                                <button-comp
                                    :key="key"
                                    v-for="(viewBtn, key) in col.btnData"
                                    :button-item="viewBtn"
                                    @clickFunc="getRowData(scope.row, index, viewBtn.btnKey, viewBtn.emit)"
                                />
                            </div>
                            <div v-else>
                                <slot v-if="col.formatData" :name="`${col.prop}`" :scope="scope">
                                    <span v-html="col.formatData(scope.row[col.prop], col.tag)"></span>
                                </slot>
                                <slot v-else :scope="scope">
                                    <span>{{ scope.row[col.prop] }}</span>
                                </slot>
                            </div>
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
        </el-card>
        <div id="dialog">
            <el-dialog title="查看" :visible.sync="queryDialog" width="30%">
                <div>
                    <el-form ref="form" :rules="modelFormRules" :model="editModelForm" label-width="120px">
                        <el-form-item
                            :label="`${formCol.label}:`"
                            :key="index"
                            v-for="(formCol, index) in editModelForm"
                        >
                            <span>{{ formCol.value }} </span>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="queryDialog = false">关闭</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog title="添加" :visible.sync="addDialog" width="30%" :close-on-click-modal="false">
                <div>
                    <el-form ref="addForm" :rules="modelFormRules" :model="addModelForm" label-width="120px">
                        <el-form-item
                            :label="`${editCol.label}:`"
                            :key="index"
                            v-for="(editCol, index) in addModelFormColumn"
                            :prop="`${editCol.prop}`"
                        >
                            <span v-if="editCol.type">
                                <el-select
                                    v-model="addModelForm[editCol.prop].value"
                                    :placeholder="editCol.placeholder"
                                    style="width: 100%;"
                                    size="small"
                                >
                                    <el-option
                                        :key="index"
                                        :label="type_data.label"
                                        :value="type_data.value"
                                        v-for="(type_data, index) in editCol.typeData"
                                    ></el-option>
                                </el-select>
                            </span>
                            <span v-else>
                                <el-input
                                    v-model="addModelForm[editCol.prop].value"
                                    class="el-input-item"
                                    size="small"
                                ></el-input>
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="addDialog = false">取消</el-button>
                            <el-button type="primary" @click="addModelFunc('addForm')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog title="修改" :visible.sync="editDialog" width="30%" :close-on-click-modal="false">
                <div>
                    <el-form ref="editForm" :rules="modelFormRules" :model="editModelForm" label-width="120px">
                        <el-form-item
                            :label="`${editCol.label}:`"
                            :key="index"
                            v-for="(editCol, index) in editModelFormColumn"
                            :prop="`${editCol.prop}`"
                        >
                            <span v-if="editCol.type">
                                <el-select
                                    v-model="editModelForm[editCol.prop].value"
                                    :placeholder="editCol.placeholder"
                                    style="width: 100%;"
                                    size="small"
                                >
                                    <el-option
                                        :key="index"
                                        :label="type_data.label"
                                        :value="type_data.value"
                                        v-for="(type_data, index) in editCol.typeData"
                                    ></el-option>
                                </el-select>
                            </span>
                            <span v-else>
                                <el-input
                                    v-model="editModelForm[editCol.prop].value"
                                    class="el-input-item"
                                    size="small"
                                ></el-input>
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="cancelEditModel">取消</el-button>
                            <el-button type="primary" @click="editModelFunc('editForm')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import buttonComp from './button_comp'

export default {
    name: 'PageHelper',
    components: {
        buttonComp,
    },
    props: {
        title: {
            type: String,
            required: true,
            default: 'Title',
        },
        fetchFunc: {
            type: Function,
            required: true,
            default: () => true,
        },
        editFunc: {
            type: Function,
            required: false,
            default: () => true,
        },
        delFunc: {
            type: Function,
            required: false,
            default: () => true,
        },
        addFunc: {
            type: Function,
            required: false,
            default: () => true,
        },
        tableColumn: {
            type: Array,
            required: false,
            default: () => [],
        },
        searchForm: {
            type: Object,
            required: false,
        },
        searchFormColumn: {
            type: Array,
            required: false,
            default: () => [],
        },
        modelForm: {
            type: Object,
            required: false,
        },
        modelFormRules: {
            type: Object,
            required: false,
        },
        editModelFormColumn: {
            type: Array,
            required: false,
            default: () => [],
        },
        addModelFormColumn: {
            type: Array,
            required: false,
            default: () => [],
        },
        operateBtn: {
            type: Array,
            required: false,
            default: () => [],
        },
        setPageSize: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            pageSizes: [10, 20, 30, 40],
            tablePage: [],
            editDialog: false,
            addDialog: false,
            editModelForm: this.modelForm,
            addModelForm: this.modelForm,
            queryDialog: false,
        }
    },
    created() {
        this.pageSize = this.setPageSize
        this._getPageTab1(this.currentPage, this.pageSize)
        for (let item in this.editModelForm) {
            if (this.editModelForm[item] && this.editModelForm[item].label === '') {
                this.editModelForm[item].label = item
            }
        }
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
            let req = { pageNo: current, pageSize: size }
            this.searchFormColumn.forEach((item) => {
                if (typeof item.value === 'number') {
                    req[item.prop] = item.value
                } else if (item.value) {
                    req[item.prop] = item.value
                }
            })
            // console.log('搜索条件：', req)
            this.fetchFunc(req)
                .then((res) => {
                    this.total = res.obj.data === null ? 0 : res.obj.totals
                    this.tablePage = res.obj.data === null ? [] : res.obj.data
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
        },
        getRowData(row, index, type, emit) {
            console.log(row, index, type, emit)
            if (emit) {
                this.$emit(emit, row)
            }
            switch (type) {
                case 'editBtn':
                    this.editDialog = true
                    for (let item in row) {
                        if (this.editModelForm[item]) {
                            this.editModelForm[item].value = row[item]
                        }
                    }
                    break
                case 'viewBtn':
                    this.queryDialog = true
                    for (let item in row) {
                        if (this.editModelForm[item]) {
                            this.editModelForm[item].value = row[item]
                        }
                    }
                    break
                case 'delBtn':
                    this.$confirm('确定要删除该条记录吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            this.delFunc(row.id)
                                .then((res) => {
                                    if (res.code === 0) {
                                        this.tablePage.splice(this.tablePage.findIndex((item) => item.id === row.id), 1)
                                        this.$message.success('删除成功')
                                    } else {
                                        this.$message.error(res.message)
                                    }
                                })
                                .catch(() => {
                                    this.$message.error('删除失败')
                                })
                        })
                        .catch(() => {
                            this.$message.info('取消删除')
                        })
                    break
            }
        },
        cancelEditModel() {
            this.editDialog = false
            this.initModelForm()
        },
        editModelFunc(formName) {
            this.$refs[formName].validate((valid) => {
                let req = {}
                this.editModelFormColumn.forEach((item) => {
                    if (this.editModelForm[item.prop] !== '') {
                        req[item.prop] = this.editModelForm[item.prop].value
                    }
                })
                if (valid) {
                    let id = this.editModelForm.id.value
                    console.log('修改校验通过', id, req)
                    this.editFunc(id, req)
                        .then((res) => {
                            if (res.code === 0) {
                                this.editDialog = false
                                this.$message.success('修改成功！')
                                this._getPageTab1(this.currentPage, this.pageSize)
                                this.initModelForm()
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        addModelFunc(formName) {
            console.log(this.$refs[formName])
            this.$refs[formName].validate((valid) => {
                let req = {}
                this.addModelFormColumn.forEach((item) => {
                    if (this.addModelForm[item.prop] !== '') {
                        let model = this.addModelForm[item.prop]
                        switch (model.type) {
                            case Number:
                                req[item.prop] = Number(model.value)
                                break
                            default:
                                req[item.prop] = model.value
                        }
                    }
                })
                if (valid) {
                    console.log('添加校验通过', req)
                    this.addFunc(req)
                        .then((res) => {
                            if (res.code === 0) {
                                this.addDialog = false
                                this.$message.success('添加成功！')
                                this._getPageTab1(this.currentPage, this.pageSize)
                                this.initModelForm()
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        showAddModel() {
            this.addDialog = true
        },
        dynamicFunc(method, args) {
            console.log(method)
            if (method) {
                try {
                    if (args && args.length > 0) {
                        this[method](...args)
                    } else {
                        this[method]()
                    }
                } catch (e) {
                    // console.log(e)
                    if (args && args.length > 0) {
                        this.$emit(method, ...args)
                    } else {
                        this.$emit(method)
                    }
                }
            } else {
                console.error('未绑定方法')
            }
        },
        initModelForm() {
            for (let item in this.addModelForm) {
                this.addModelForm[item].value = ''
                this.editModelForm[item].value = ''
            }
        },
    },
}
</script>

<style scoped>
.el-input-item {
    width: 200px;
}
</style>
