<template>
    <div class="container">
        <el-card class="anoCard">
            <div slot="header">
                <span>{{ title }}</span>
            </div>
            <div class="main-data">
                <ul
                    class="role-list box-shadow"
                    v-infinite-scroll="loadData"
                    infinite-scroll-disabled="disabled"
                    style="overflow:auto"
                >
                    <li
                        :key="key"
                        v-for="(data, key) in tableData"
                        :class="{ 'role-item-active': currentModel.id === data.id }"
                        @click="clickCurrent(data)"
                    >
                        {{ data.roleName }} : {{ data.roleAlias }}
                    </li>
                    <p v-if="loading" style="width: 180px; text-align: center">加载中...</p>
                    <p
                        v-if="noMore && tableData.length > pageSize"
                        style="width: 180px; text-align: center; font-size: 8px;color: #99a9bf;"
                    >
                        _____到底了_____
                    </p>
                </ul>
                <div style="width: 30%" class="tree-content box-shadow">
                    <el-tree
                        :data="treePage"
                        ref="tree"
                        :default-expand-all="true"
                        :highlight-current="true"
                        :expand-on-click-node="false"
                        node-key="id"
                        :render-content="renderContent"
                        show-checkbox
                    >
                    </el-tree>
                    <div class="save-btn">
                        <el-button type="primary" size="mini" @click="savePerm()">保存</el-button>
                    </div>
                </div>
                <div class="role-show box-shadow" style="height: 100%;width: 30%;">
                    {{ currentModel }}
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { listRole, addRole, updateRole, deleteRole, saveRolePerm, selectAllRolePerm } from '@/api/role'
import { listPerm } from '@/api/permission'

export default {
    name: 'role_set',
    data() {
        return {
            title: '角色管理',
            fetchFunc: listRole,
            editFunc: updateRole,
            delFunc: deleteRole,
            addFunc: addRole,
            searchForm: {},
            tableData: [],
            currentModel: {},
            checkLi: false,
            currentPage: 1,
            pageSize: 25,
            loading: false,
            totals: 0,
            treePage: [],
            rolePermMap: '',
        }
    },
    created() {
        this._selectAllRolePerm()
        this._getPerm()
    },
    mounted() {},
    computed: {
        noMore() {
            return this.tableData.length >= this.totals
        },
        disabled() {
            return this.loading || this.noMore
        },
    },
    methods: {
        _getPageTab1(current, size, isFirst) {
            listRole({ pageNo: current, pageSize: size })
                .then((res) => {
                    let data = res.obj.data
                    if (isFirst) {
                        this.clickCurrent(data[0])
                    }
                    this.tableData = this.tableData.concat(data)
                    this.totals = res.obj.totals
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
        },
        clickCurrent(data) {
            this.currentModel = data
            this.checkLi = true
            let checkPerm = this.rolePermMap.get(data.id)
            this.$refs.tree.setCheckedKeys([])
            if (checkPerm && checkPerm.length > 0) {
                console.log(checkPerm.length)
                this.$nextTick(() => {
                    checkPerm.forEach((id) => {
                        this.$refs.tree.setChecked(id, true, false)
                    })
                })
            }
        },
        loadData() {
            this.loading = true
            setTimeout(() => {
                if (this.tableData.length / this.pageSize + 1 < this.currentPage) {
                    console.log('没有啦！！！')
                    return
                } else {
                    this.currentPage++
                    this._getPageTab1(this.currentPage, this.pageSize)
                }
                this.loading = false
            }, 2000)
        },
        _getPerm() {
            listPerm()
                .then((res) => {
                    let data = res.obj.data
                    // console.log(JSON.stringify(data))
                    this.treePage = this.loadDataByRecursive(data, 0)
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
        },
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
        renderContent(h, { node, data, store }) {
            console.log({ node, data, store })
            return (
                <div>
                    <div className="custom-tree-node">
                        <div>
                            <span>
                                {data.permName}_{data.permAlias}
                            </span>
                        </div>
                    </div>
                </div>
            )
        },
        _selectAllRolePerm() {
            selectAllRolePerm()
                .then((res) => {
                    if (res.code === 0) {
                        let data = new Map()
                        res.obj.forEach((item) => {
                            data.set(item.roleId, item.premId)
                        })
                        this.rolePermMap = data
                        this._getPageTab1(this.currentPage, this.pageSize, true)
                    }
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
        },
        savePerm() {
            if (!this.$refs.tree.getCheckedNodes(false, true)) {
                this.$message.error('未选择数据!')
                return
            }
            let idList = this.$refs.tree.getCheckedNodes(false, true).map((item) => {
                return item.id
            })
            if (idList.length === 0) {
                this.$message.error('未选择数据2!')
                return
            }
            console.log('---', idList)
            saveRolePerm(this.currentModel.id, { permIdList: idList })
                .then((res) => {
                    if (res.code === 0) {
                        this.$message.success('保存成功！')
                        this.rolePermMap.set(this.currentModel.id, res.obj)
                    }
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
        },
    },
}
</script>

<style lang="scss">
.main-data {
    display: flex;
    justify-content: space-between;

    .role-list {
        margin-top: 10px;
        width: 200px;
        min-height: calc(100vh - 200px);
        margin-bottom: 10px;
        li {
            width: 180px;
            /*background: #8c939d;*/
            margin-bottom: 10px;
            text-align: center;
            height: 30px;
            font-size: 14px;
        }
        li:hover {
            color: #409eff !important;
        }
        .role-item-active {
            color: #409eff !important;
        }
        /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
        &::-webkit-scrollbar {
            width: 5px; /*对垂直滚动条有效*/
            height: 1px; /*对水平滚动条有效*/
            /*display: none;*/
        }
        /*定义滚动条的轨道颜色、内阴影及圆角*/
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px #ececec;
            background-color: #ececec;
            display: none;
            border-radius: 3px;
        }

        /*定义滑块颜色、内阴影及圆角*/
        &::-webkit-scrollbar-thumb {
            border-radius: 7px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: rgba(0, 0, 0, 0.1);
            display: none;
        }

        /* 光标移到滚动滑块上样式颜色变深 */
        &::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }

        /*定义两端按钮的样式*/
        /*::-webkit-scrollbar-button {*/
        /*    background-color: cyan;*/
        /*}*/

        /*定义右下角汇合处的样式*/
        &::-webkit-scrollbar-corner {
            background: khaki;
        }
    }
    .tree-content {
        width: 33%;
        padding: 10px;
        margin: 10px;
        position: relative;

        .save-btn {
            position: absolute !important;
            bottom: 10px;
            right: 10px;
        }
    }
}
</style>
