<template>
    <div class="container">
        <el-row style="margin: 20px; padding: 20px;">
            region:<el-input v-model="region" size="mini" style="width: 300px"></el-input> accessKeyId:<el-input
                v-model="accessKeyId"
                size="mini"
                style="width: 300px"
            ></el-input>
            accessKeySecret:<el-input v-model="accessKeySecret" size="mini" style="width: 300px"></el-input>
            bucket:<el-input v-model="bucket" size="mini" style="width: 300px"></el-input>
        </el-row>
        <el-row style="margin-bottom: 10px;margin-left: 20px;"
            ><el-button size="mini" type="primary" @click="startQuery">开始查询</el-button
            ><el-button size="mini" type="success" @click="getOssData">刷新文件</el-button
            ><el-button size="mini" type="danger" @click="getCheckedNodes">删除</el-button
            ><el-button size="mini" type="danger">下载</el-button>
        </el-row>
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
        <el-drawer
            :title="`资源上传`"
            :visible.sync="drawer"
            :direction="direction"
            :wrapperClosable="false"
            :close-on-press-escape="false"
        >
            <div>
                <h1 style="font-size: 20px;margin: 10px auto;width: 300px;">当前上传的目录为{{ currentOssPath }}</h1>
                <el-upload
                    drag
                    multiple
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-remove="beforeRemove"
                    :on-change="fileOnChange"
                    :file-list="fileList"
                    :auto-upload="false"
                >
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

                    <div slot="tip" class="el-upload__tip">待上传文件：</div>
                </el-upload>
                <el-button style="margin-left: 300px;" size="small" type="success" @click="submitUpload"
                    >开始上传</el-button
                >
                <el-button size="mini" type="danger" @click="drawer = false">关闭</el-button>
                <el-row> </el-row>
            </div>
        </el-drawer>
    </div>
</template>

<script>
let OSS = require('ali-oss')
export default {
    name: 'oss',
    data() {
        return {
            OssClient: '',
            CdnClient: '',
            treePage: [],
            fileList: [],
            currentOssPath: '',
            drawer: false,
            direction: 'rtl', //右边开
            loading1: false,
            region: 'oss-cn-shanghai',
            accessKeyId: '',
            accessKeySecret: '',
            bucket: 'wuhan-games-server',
        }
    },
    created() {},
    mounted() {},
    methods: {
        startQuery() {
            this.OssClient = new OSS({
                region: this.region,
                accessKeyId: this.accessKeyId,
                accessKeySecret: this.accessKeySecret,
                bucket: this.bucket,
            })
            this.getOssData()
        },
        getCheckedNodes() {
            let fileListName = []
            this.$refs.tree.getCheckedNodes().forEach((item) => {
                if (item.item && !item.item.name.endsWith('/')) {
                    fileListName.push(item.item.name)
                    console.log('要删除的文件为', item.item.name)
                }
            })
            if (fileListName.length <= 0) {
                this.$message.error('选中的文件不能空')
                return
            }
            this.deleteMulti(fileListName)
        },
        deleteMulti(fileListName) {
            this.OssClient.deleteMulti(fileListName, {
                quiet: true, //返回上传失败的文件
            })
                .then((res) => {
                    if (res.res.status === 200) {
                        this.$message.info(`删除成功`)
                    } else {
                        this.$message.error(`删除失败`)
                    }
                })
                .catch(() => {
                    this.$message.error(`删除失败`)
                })
        },
        submitUpload() {
            this.putObject(this.fileList)
        },
        fileOnChange(file, fileList) {
            this.fileList = fileList
        },

        beforeRemove(file, fileList) {
            this.$message.info(`移除了${file.name}`)
            this.fileList = fileList
        },
        // eslint-disable-next-line no-unused-vars
        renderContent(h, { node, data, store }) {
            let domHtml
            if (node.label.endsWith('/')) {
                domHtml = (
                    <div>
                        <span>{node.label}</span>
                        <span>
                            <el-button size="mini" type="text" on-click={() => this.appendFile(data)}>
                                上传
                            </el-button>
                        </span>
                    </div>
                )
            } else {
                let labelCss = {
                    display: 'flex',
                    width: '960px',
                    justifyContent: 'center',
                }
                let width_1 = {
                    width: '50%',
                }
                let width_2 = {
                    width: '25%',
                }
                domHtml = (
                    <div style={labelCss}>
                        <span style={width_1}>{node.label}</span>
                        <span style={width_2}>{(data.item ? data.item.size / 1024 : 0).toFixed(2)}kb</span>
                        <span style={width_2}>{data.item ? data.item.lastModified : '------'}</span>
                    </div>
                )
            }
            return (
                <div>
                    <div className="custom-tree-node">{domHtml}</div>
                </div>
            )
        },
        putObject(fileList) {
            if (!this.currentOssPath) {
                return
            }
            console.log('当前上传到的目录为', this.currentOssPath)

            fileList.forEach((item) => {
                this.OssClient.put(this.currentOssPath + item.name, item.raw)
                    .then((res) => {
                        if (res.res.status === 200) {
                            //上传成功
                            this.fileList.splice(
                                this.fileList.findIndex((file) => file.name === item.name),
                                1
                            )
                            this.$message.info('上传成功' + item.name)
                        } else {
                            this.$message.error('上传失败')
                        }
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
        },
        handleNodeClick(data) {
            console.log(data)
        },
        appendFile(data) {
            this.currentOssPath = data.label
            this.drawer = true
        },
        convertData(val) {
            this.treePage = []
            let father = []
            val.forEach((item) => {
                let fileName = item.name
                let headName = fileName.substring(0, fileName.lastIndexOf('/') + 1)
                // console.log(headName)
                if (father.indexOf(headName) < 0) {
                    father.push(headName)
                    this.treePage.push({ label: headName, children: [] })
                }
            })
            val.forEach((item) => {
                let fileName = item.name
                this.treePage.forEach((tree) => {
                    let childrenFileName = fileName.replace(tree.label, '')
                    if (childrenFileName.indexOf('/') < 0) {
                        // let label = `${childrenFileName} ${'. '.repeat(12)} ${(item.size / 1024).toFixed(
                        //     2
                        // )}kb ${'. '.repeat(12)}  ${item.lastModified}`
                        let label = childrenFileName
                        if (label) {
                            tree.children.push({ label: label, item: item, children: [] })
                        }
                    }
                })
                this.loading
            })
            this.loading1 = false
        },
        getOssData() {
            this.loading1 = true
            this.OssClient.listV2({ prefix: 'games/', 'max-keys': 999 })
                .then((res) => {
                    console.log(JSON.stringify(res.objects))
                    this.convertData(res.objects)
                })
                .catch((error) => {
                    this.$message.error('加载数据异常！' + error)
                    this.loading1 = false
                })
        },
    },
}
</script>

<style scoped>
.upload-demo {
    margin-left: 70px;
}
.children-item {
    width: 500px;
    display: flex;
    justify-content: space-between;
}
.el-drawer__header {
    margin-bottom: 1px !important;
}
</style>
