<template>
    <div class="container">
        <el-card class="anoCard">
            <div slot="header">
                <span>{{ title }}</span>
            </div>
            <div style="display: flex;">
                <div style="width: 50%">
                    <el-tree
                        v-loading="loading1"
                        :data="treePage"
                        ref="tree"
                        @node-click="handleNodeClick"
                        :default-expand-all="true"
                        :highlight-current="true"
                        :expand-on-click-node="false"
                        :render-content="renderContent"
                        show-checkbox
                    >
                    </el-tree>
                </div>
                <div>
                    <el-row
                        v-show="currentModel.id !== undefined"
                        style="margin-bottom: 20px; display: flex; justify-content: space-between;"
                    >
                        <span>权限别名：{{ currentModel.permAlias }}</span>
                        <span>权限名称：{{ currentModel.permName }}</span>
                    </el-row>
                </div>
            </div>
        </el-card>
        <div>
            <el-dialog title="修改" :visible.sync="editDialog" width="30%" :close-on-click-modal="false">
                <div>
                    <el-form ref="editForm" :rules="modelFormRules" :model="editModelForm" label-width="120px">
                        <el-form-item label="权限别称" prop="permAlias">
                            <span>
                                <el-input
                                    v-model="editModelForm.permAlias"
                                    class="el-input-item"
                                    size="small"
                                ></el-input>
                            </span>
                        </el-form-item>
                        <el-form-item label="权限名称" prop="permName">
                            <span>
                                <el-input
                                    v-model="editModelForm.permName"
                                    class="el-input-item"
                                    size="small"
                                ></el-input>
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="editDialog = false">取消</el-button>
                            <el-button type="primary" @click="editModelFunc('editForm')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { listPerm, addPerm, updatePerm, deletePerm } from '@/api/permission'

export default {
    name: 'permission',
    components: {},
    data() {
        return {
            title: '权限管理',
            fetchFunc: listPerm,
            editFunc: updatePerm,
            delFunc: deletePerm,
            addFunc: addPerm,
            loading1: false,
            treePage: [],
            currentModel: {},
            editDialog: false,
            modelFormRules: {},
            editModelForm: {},
        }
    },
    created() {
        // let data =
        //     '[{"id":1,"permName":"系统设置","url":"#","permAlias":"system","parentId":0,"icon":null,"createTime":"2019-08-15T16:21:54","updateTime":"2019-08-15T16:23:58","deleteStatus":0},{"id":2,"permName":"用户管理","url":"#","permAlias":"system:user:list","parentId":1,"icon":null,"createTime":"2019-08-15T16:22:39","updateTime":"2019-08-15T16:24:03","deleteStatus":0},{"id":3,"permName":"权限管理","url":"#","permAlias":"system:role:list","parentId":1,"icon":null,"createTime":"2019-08-15T16:23:45","updateTime":"2019-08-15T16:24:12","deleteStatus":0}]'
        // console.log(JSON.parse(data))
        // let res = JSON.parse(data)
        // let trees = this.loadDataByRecursive(res, 0)
        // console.log(trees)

        this._getPageTab1()
    },
    methods: {
        loadDataByRecursive(treeNodes, parentId) {
            let trees = []

            treeNodes.forEach((item) => {
                if (item.parentId === parentId) {
                    trees.push(this.findChildren(item, treeNodes))
                }
            })
            return trees
        },
        findChildren(node, treeNodes) {
            treeNodes.forEach((item) => {
                if (node.id === item.parentId) {
                    if (!node.children) {
                        node.children = []
                    }
                    node.children.push(this.findChildren(item, treeNodes))
                }
            })
            return node
        },

        _getPageTab1() {
            listPerm()
                .then((res) => {
                    let data = res.obj.data
                    // console.log(JSON.stringify(data))
                    this.treePage = this.loadDataByRecursive(data, 0)
                    if (this.treePage.length > 0) {
                        this.currentModel = this.treePage[0]
                    }
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
        },
        handleNodeClick(data) {
            console.log(data)
            this.currentModel = data
        },
        renderContent(h, { node, data, store }) {
            console.log({ node, data, store })
            let margin_1 = { marginLeft: '20px' }
            return (
                <div>
                    <div className="custom-tree-node">
                        <div>
                            <span>
                                {data.permName}_{data.permAlias}
                            </span>
                            <span style={margin_1}>
                                <el-button size="mini" type="text" on-click={() => this.append(data)}>
                                    添加
                                </el-button>
                                <el-button size="mini" type="text" on-click={() => this._updatePerm(data)}>
                                    编辑
                                </el-button>
                                <el-button size="mini" type="text" on-click={() => this._remove(data)}>
                                    删除
                                </el-button>
                            </span>
                        </div>
                    </div>
                </div>
            )
        },
        append(data) {
            console.log(data)
            const newChild = { parentId: data.id, permName: 'testtest', children: [] }
            if (!data.children) {
                this.$set(data, 'children', [])
            }
            addPerm(newChild)
                .then((res) => {
                    if (res.code === 0) {
                        newChild.id = res.obj
                        data.children.push(newChild)
                    }
                    console.log(res)
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        _updatePerm(data) {
            this.editDialog = true
            this.editModelForm = data
            console.log(this.editModelForm)
        },
        editModelFunc(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let id = this.editModelForm.id
                    console.log('修改校验通过', id, this.currentModel)
                    updatePerm(id, this.currentModel)
                        .then((res) => {
                            if (res.code === 0) {
                                this.editDialog = false
                                this.$message.success('修改成功！')
                                this._getPageTab1(this.currentPage, this.pageSize)
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
        _remove(data) {
            this.$confirm('确定要删除该条记录吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    deletePerm(data.id)
                        .then((res) => {
                            if (res.code === 0) {
                                this._getPageTab1(this.currentPage, this.pageSize)
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
        },
    },
}
</script>

<style lang="scss">
#tree {
    width: 50%;
}
</style>
