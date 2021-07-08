<template>
    <div class="container">
        <el-card class="anoCard">
            <div slot="header">
                <span>{{ title }}</span>
            </div>
            <div>
                <el-row>
                    <el-button type="primary" size="mini" @click="loadSqlTable">加载数据库</el-button>
                    <el-button type="primary" size="mini">上传脚本文件</el-button>
                    <div style="float: right;">
                        <el-button type="primary" size="mini" @click="preview">预览</el-button>
                        <el-button type="primary" size="mini">导出</el-button>
                    </div>
                </el-row>
                <el-row style="display: flex; justify-content: center;">
                    <el-checkbox
                        :indeterminate="isIndeterminateSqlTable"
                        v-model="checkAllSqlTable"
                        @change="handleCheckSqlTableChange"
                        >全选</el-checkbox
                    >
                    <div style="margin: 15px 10px;"></div>
                    <el-checkbox-group v-model="checkedSqlTableList" @change="handleCheckedSqlTableChange">
                        <el-checkbox v-for="btn in sqlTableList" :key="btn" :label="btn" :value="btn">{{
                            btn
                        }}</el-checkbox>
                    </el-checkbox-group>
                    <el-button style="margin-left: 20px;" type="success" size="mini" @click="loadSqlTableField"
                        >确定</el-button
                    >
                </el-row>
                <div>
                    <el-tabs v-model="activeName" v-if="checkedSqlTableList.length > 0">
                        <el-tab-pane
                            v-for="tableName in sqlTableList"
                            :key="tableName"
                            :label="tableName"
                            :name="tableName"
                        >
                            <div>
                                <el-row style="display: flex; justify-content: center;">
                                    <el-checkbox
                                        :indeterminate="isIndeterminate"
                                        v-model="checkAll"
                                        @change="handleCheckAllChange"
                                        >全选</el-checkbox
                                    >
                                    <div style="margin: 15px 10px;"></div>
                                    <el-checkbox-group v-model="checkedBtn" @change="handleCheckedCitiesChange">
                                        <el-checkbox
                                            v-for="btn in checkBtn"
                                            :key="btn.key"
                                            :label="btn.key"
                                            :value="btn.key"
                                            >{{ btn.value }}</el-checkbox
                                        >
                                    </el-checkbox-group>
                                </el-row>
                                <el-table :data="tableData.get(tableName)" stripe style="width: 100%">
                                    <el-table-column prop="Field" label="名称" width="180"> </el-table-column>
                                    <el-table-column prop="Type" label="类型" width="180"> </el-table-column>
                                    <el-table-column prop="Comment" label="注释"> </el-table-column>
                                    <el-table-column prop="Null" label="是否为空"> </el-table-column>
                                    <el-table-column prop="desc" label="表格是否显示">
                                        <template slot-scope="scope">
                                            <el-checkbox
                                                :checked="scope.row.isShow"
                                                v-model="scope.row.isShow"
                                                @change="checkBoxChange(scope.$index, scope.row)"
                                            ></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="desc" label="是否搜索">
                                        <template slot-scope="scope">
                                            <el-checkbox
                                                :checked="scope.row.isSearch"
                                                v-model="scope.row.isSearch"
                                                @change="checkBoxChange(scope.$index, scope.row)"
                                            ></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="desc" label="是否添加">
                                        <template slot-scope="scope">
                                            <el-checkbox
                                                :checked="scope.row.isAdd"
                                                v-model="scope.row.isAdd"
                                                @change="checkBoxChange(scope.$index, scope.row)"
                                            ></el-checkbox> </template
                                    ></el-table-column>
                                    <el-table-column prop="desc" label="是否修改">
                                        <template slot-scope="scope">
                                            <el-checkbox
                                                :checked="scope.row.isUpdate"
                                                v-model="scope.row.isUpdate"
                                                @change="checkBoxChange(scope.$index, scope.row)"
                                            ></el-checkbox> </template
                                    ></el-table-column>
                                    <el-table-column prop="desc" label="操作">
                                        <template slot-scope="scope">
                                            <el-button
                                                type="danger"
                                                size="mini"
                                                @click="checkRow(scope.$index, scope.row, true)"
                                                >全选</el-button
                                            ><el-button
                                                type="warning"
                                                size="mini"
                                                @click="checkRow(scope.$index, scope.row, false)"
                                                >反选</el-button
                                            ></template
                                        ></el-table-column
                                    >
                                </el-table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-card>
        <el-dialog title="预览" :visible.sync="previewDialog" width="50%" :close-on-click-modal="false">
            <div>
                <div v-for="item in previewData" :key="item.key">
                    <div style="color: red; font-size: 18px;   font-weight: bold;">{{ item.key }}:</div>
                    <div v-html="item.value"></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { previewJsCode, tableList, tableGetField } from '@/api/code_generate'
export default {
    name: 'js_code_generate',
    data() {
        return {
            title: 'js代码生成',
            tableData: new Map(),
            previewDialog: false,
            previewData: [],
            checkAll: true,
            checkAllSqlTable: true,
            checkedBtn: [],
            checkBtn: [
                { key: 'viewBtn', value: '查看' },
                { key: 'editBtn', value: '编辑' },
                { key: 'delBtn', value: '删除' },
                { key: 'showAddModel', value: '添加' },
                { key: '_getPageTab1', value: '查询' },
            ],
            isIndeterminate: false,
            isIndeterminateSqlTable: false,
            activeName: '',
            sqlTableList: [],
            checkedSqlTableList: [],
            isShowTable: false,
        }
    },
    created() {},
    mounted() {
        this.checkedBtn = this.checkBtn.map((item) => {
            return item.key
        })
        this.loadSqlTable()
    },
    methods: {
        loadSqlTable() {
            tableList()
                .then((res) => {
                    if (res.code === 0) {
                        this.sqlTableList = res.obj
                        this.checkedSqlTableList = res.obj ? res.obj : []
                        this.activeName = this.sqlTableList[0]
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        loadSqlTableField() {
            tableGetField(this.checkedSqlTableList)
                .then((res) => {
                    if (res.code === 0) {
                        this.isShowTable = true
                        let hasMap = new Map()
                        for (let key in res.obj) {
                            let data = res.obj[key]
                            data.forEach((item) => {
                                if (['id', 'delete_status'].includes(item.Field)) {
                                    this.cancelCheckData(item)
                                } else {
                                    this.checkData(item)
                                }
                            })
                            hasMap.set(key, data)
                        }
                        this.tableData = hasMap
                    }
                })
                .catch(() => {})
        },
        checkBoxChange(index, row) {
            this.$set(this.tableData, index, row)
        },
        handleCheckSqlTableChange(val) {
            console.log(val)
            this.checkedSqlTableList = val ? this.sqlTableList : []
            this.isIndeterminateSqlTable = false
        },
        handleCheckedSqlTableChange(value) {
            let checkedCount = value.length
            this.checkAllSqlTable = checkedCount === this.sqlTableList.length
            this.isIndeterminateSqlTable = checkedCount > 0 && checkedCount < this.sqlTableList.length
            console.log(value)
        },
        handleCheckAllChange(val) {
            this.checkedBtn = val
                ? this.checkBtn.map((item) => {
                      return item.key
                  })
                : []
            this.isIndeterminate = false
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length
            this.checkAll = checkedCount === this.checkBtn.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkBtn.length
            console.log(value)
        },
        checkData(item) {
            item.isSearch = true
            item.isAdd = true
            item.isUpdate = true
            item.isShow = true
            return item
        },
        cancelCheckData(item) {
            item.isSearch = false
            item.isAdd = false
            item.isUpdate = false
            item.isShow = false
            return item
        },
        checkRow(id, row, status) {
            if (status) {
                row = this.checkData(row)
            } else {
                row = this.cancelCheckData(row)
            }
            this.$set(this.tableData, id, row)
        },
        preview() {
            let data = []
            this.tableData.forEach((value, key) => {
                data.push({
                    key: key,
                    value: value,
                })
            })
            console.log(data)
            previewJsCode(data)
                .then((res) => {
                    console.log(res)
                    this.previewDialog = true
                    for (let item in res.obj) {
                        this.previewData.push({
                            key: item,
                            value: res.obj[item],
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },
}
</script>

<style scoped></style>
