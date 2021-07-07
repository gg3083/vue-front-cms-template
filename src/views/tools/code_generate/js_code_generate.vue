<template>
    <div class="container">
        <el-card class="anoCard">
            <div slot="header">
                <span>{{ title }}</span>
            </div>
            <div>
                <el-row>
                    <el-button type="primary" size="mini">上传脚本文件</el-button>
                    <div style="float: right;">
                        <el-button type="primary" size="mini" @click="preview">预览</el-button>
                        <el-button type="primary" size="mini">导出</el-button>
                    </div>
                </el-row>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="key" label="名称" width="180"> </el-table-column>
                    <el-table-column prop="type" label="类型" width="180"> </el-table-column>
                    <el-table-column prop="length" label="长度"> </el-table-column>
                    <el-table-column prop="desc" label="注释"> </el-table-column>
                    <el-table-column prop="desc" label="表格是否显示">
                        <template slot-scope="scope">
                            <el-checkbox :checked="scope.row.isShow" v-model="scope.row.isShow"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="是否搜索">
                        <template slot-scope="scope">
                            <el-checkbox :checked="scope.row.isSearch" v-model="scope.row.isSearch"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="是否添加">
                        <template slot-scope="scope">
                            <el-checkbox :checked="scope.row.isAdd" v-model="scope.row.isAdd"></el-checkbox> </template
                    ></el-table-column>
                    <el-table-column prop="desc" label="是否修改">
                        <template slot-scope="scope">
                            <el-checkbox
                                :checked="scope.row.isUpdate"
                                v-model="scope.row.isUpdate"
                            ></el-checkbox> </template
                    ></el-table-column>
                    <el-table-column prop="desc" label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="checkRow(scope.$index, scope.row, true)"
                                >全选</el-button
                            ><el-button type="warning" size="mini" @click="checkRow(scope.$index, scope.row, false)"
                                >反选</el-button
                            ></template
                        ></el-table-column
                    >
                </el-table>
            </div>
        </el-card>
        <el-dialog title="预览" :visible.sync="previewDialog" width="50%" :close-on-click-modal="false">
            <div>
                <div v-html="previewData"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { previewJsCode } from '@/api/code_generate'
export default {
    name: 'js_code_generate',
    data() {
        return {
            title: 'js代码生成',
            tableData: [],
            previewDialog: false,
            previewData: '',
        }
    },
    created() {
        {
            let data = {
                key: 'id',
                type: 'bigint',
                length: 11,
                desc: '主键',
            }
            this.tableData.push(data)
        }
        {
            let data = {
                key: 'name',
                type: 'varchar',
                length: 32,
                desc: '名称',
            }
            this.tableData.push(data)
        }
        {
            let data = {
                key: 'password',
                type: 'varchar',
                length: 64,
                desc: '密码',
            }
            this.tableData.push(data)
        }
        {
            let data = {
                key: 'create_time',
                type: 'timestamp',
                length: 11,
                desc: '创建时间',
            }
            this.tableData.push(data)
        }
        {
            let data = {
                key: 'delete_status',
                type: 'tinyint',
                length: 2,
                desc: '是否删除',
            }
            this.tableData.push(data)
        }
    },
    mounted() {
        this.tableData.forEach((item) => {
            if (['id', 'delete_status'].includes(item.key)) {
                this.cancelCheckData(item)
            } else {
                this.checkData(item)
            }
        })
    },
    methods: {
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
            console.log()
            previewJsCode(this.tableData)
                .then((res) => {
                    console.log(res)
                    this.previewDialog = true
                    this.previewData = res.obj.replace(/\n/g, '<br>')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },
}
</script>

<style scoped></style>
