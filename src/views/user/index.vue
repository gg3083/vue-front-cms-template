<template>
    <div>
        <el-card class="mtop30 anoCard">
            <div slot="header">
                <span>后台用户管理</span>
                <div style="float: right">
                    <el-button size="mini" type="primary" @click="showUserModel('add')">添加</el-button>
                </div>
            </div>
            <el-table :data="tablePage" border stripe style="width: 100%;">
                <el-table-column align="center" prop="id" label="ID"></el-table-column>
                <el-table-column align="center" prop="loginName" label="登录账户"></el-table-column>
                <el-table-column align="center" prop="realName" label="昵称"></el-table-column>
                <el-table-column align="center" prop="realName" label="权限"> </el-table-column>
                <el-table-column align="center" prop="gender" label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status | activeStatusFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="jobNo" label="工号"> </el-table-column>
                <el-table-column align="center" prop="createTime" label="注册时间"> </el-table-column>
                <el-table-column align="center" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <div>
                            <span v-if="$store.getters.userName !== scope.row.user_name">
                                <el-button
                                    v-if="scope.row.status === 2"
                                    type="danger"
                                    size="small"
                                    @click="disable(scope.row)"
                                    >禁用</el-button
                                >
                                <el-button
                                    v-else-if="scope.row.status === 1"
                                    type="warning"
                                    size="small"
                                    @click="disable(scope.row)"
                                    >启用</el-button
                                ><el-button type="success" plain size="small" @click="showTimePicker(scope.row)"
                                    >修改</el-button
                                >
                            </span>
                        </div>
                        <div style="margin-top: 10px;">
                            <el-button type="warning" plain size="small" @click="showSetting(scope.row)"
                                >重置密码</el-button
                            >
                        </div>
                    </template>
                </el-table-column>
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
        <div>
            <el-dialog :title="currentModel === 'add' ? '添加' : '修改'" :visible.sync="dialogVisible" width="30%">
                <!-- :before-close="handleClose" -->
                <div>
                    <el-form ref="form" :rules="rules" :model="userModel" label-width="80px">
                        <el-form-item label="ID" v-if="currentModel === 'update'">
                            <el-input v-model="userModel.id" disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="登录名" prop="loginName">
                            <el-input v-model="userModel.loginName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass_word">
                            <el-input v-model="userModel.pass_word" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="pass_word_confirm">
                            <el-input v-model="userModel.pass_word_confirm" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="权限" prop="part">
                            <el-select v-model="userModel.part" placeholder="请选择权限" style="width: 100%;">
                                <el-option label="管理员" value="1"></el-option>
                                <el-option label="用户" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="submitForm('form')">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog title="设置到期时间" :visible.sync="dialogVisible2" width="30%">
                <div class="block" style="height: 300px;">
                    <span>当前用户到期时间:</span><span>{{ checkModel.member_expiration_time | unixTimeFilter }}</span
                    ><br />
                    <span class="demonstration">设置会员使用天数：</span>

                    <el-date-picker v-model="addDay" type="date" placeholder="选择日期"> </el-date-picker>

                    <br />
                    <div style="float: right;margin-top: 30px;">
                        <el-button size="mini" @click="dialogVisible2 = false">取消</el-button>
                        <el-button size="mini" type="primary" @click="addExpirationDay(checkModel.pk_id)"
                            >保存</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <el-dialog title="设置备注" :visible.sync="dialogVisible3" width="30%">
                <div class="block" style="height: 300px;">
                    <span>设置备注:</span
                    ><span><el-input v-model="checkModel.nickname" size="mini" style="width: 200px;"> </el-input></span
                    ><br />

                    <div style="float: right;margin-top: 30px;">
                        <el-button size="mini" @click="dialogVisible3 = false">取消</el-button>
                        <el-button size="mini" type="primary" @click="setExpirationDay(checkModel.pk_id)"
                            >保存</el-button
                        >
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { listUser, addUser, forbiddenUser, normalUser, upgradeUser, setNickname } from '@/api/login'

export default {
    name: 'SystemUser_setting',

    data() {
        const validatePasswordConfirm = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'))
            } else if (value !== this.userModel.pass_word) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            pageSizes: [10, 20, 30, 40],
            tablePage: [],
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            currentModel: 'add',
            userModel: {
                id: '',
                loginName: '',
                pass_word: '',
                pass_word_confirm: '',
                member_expiration_time: '',
                part: '',
                nickname: '',
            },
            checkModel: {},
            rules: {
                loginName: [
                    { required: true, message: '请输入真实姓名', trigger: ['blur'] },
                    { min: 2, max: 18, message: '长度在2到18个字符', trigger: 'blur' },
                ],
                pass_word: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        pattern: '^.{6,20}',
                        message: '密码长度6到20位',
                        trigger: 'blur',
                    },
                ],
                password_confirm: {
                    required: true,
                    validator: validatePasswordConfirm,
                    trigger: 'blur',
                },
                part: [{ required: true, message: '请选择权限', trigger: ['blur', 'change'] }],
            },
            addDay: '',
        }
    },
    created() {
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
            listUser({ pageNo: current, pageSize: size })
                .then((res) => {
                    console.log(res)
                    this.total = res.obj === null ? 0 : res.obj.totals
                    this.tablePage = res.obj === null ? [] : res.obj.data
                })
                .catch((error) => {
                    this.$message.error(error.message)
                })
        },
        // eslint-disable-next-line no-unused-vars
        showUserModel(type, row) {
            this.dialogVisible = true
            this.currentModel = type
            if (type === 'add') {
                this.userModel = {
                    id: '',
                    user_name: '',
                    pass_word: '',
                    pass_word_confirm: '',
                    part: '',
                    member_expiration_time: '',
                    nickname: '',
                }
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(this.userModel)
                this.userModel.part = Number(this.userModel.part)
                if (valid) {
                    if (this.currentModel === 'add') {
                        addUser(this.userModel)
                            .then((res) => {
                                if (res.code === 0) {
                                    this.$message.success('添加成功')
                                    this._getPageTab1(this.currentPage, this.pageSize)
                                    this.userModel = {
                                        id: '',
                                        user_name: '',
                                        pass_word: '',
                                        pass_word_confirm: '',
                                        part: '',
                                        member_expiration_time: '',
                                        nickname: '',
                                    }
                                    //清空上传图片的缓存
                                    this.$refs[formName].clearValidate()
                                    this.$refs[formName].resetFields()
                                    this.dialogVisible = false
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                            .catch(() => {
                                this.$message.error('添加失败')
                            })
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        disable(row) {
            console.log(row)
            let tips = row.status === 2 ? '禁用' : '启用'
            this.$confirm(`确定要${tips}该用户吗`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    if (row.status === 2) {
                        forbiddenUser(row.pk_id)
                            .then((res) => {
                                if (res.code === 0) {
                                    row.status = 1
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                            .catch(() => {
                                this.$message.error('禁用失败')
                            })
                    } else if (row.status === 1) {
                        normalUser(row.pk_id)
                            .then((res) => {
                                if (res.code === 0) {
                                    row.status = 2
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                            .catch(() => {
                                this.$message.error('启用失败')
                            })
                    }
                })
                .catch(() => {
                    this.$message.info(`取消${tips}`)
                })
        },
        showTimePicker(row) {
            this.dialogVisible2 = true
            this.checkModel = row
            console.log(row)
        },
        showSetting(row) {
            this.dialogVisible3 = true
            this.checkModel = row
            console.log(row)
        },
        addExpirationDay(id) {
            if (!id) {
                return
            }
            if (!this.addDay) {
                this.$message.error('增加天数为空！')
                return
            }
            let data = {
                add_day: (new Date(this.addDay).getTime() / 1000).toFixed(),
            }
            upgradeUser(id, data)
                .then(() => {
                    this.dialogVisible2 = false
                    this.checkModel = {}
                    // this.$message.success('续费成功')
                    this._getPageTab1(1, 10)
                })
                .catch(() => {
                    this.$message.error('续费失败')
                })
            console.log(data)
        },
        setExpirationDay(id) {
            if (!id) {
                return
            }
            setNickname(id, this.checkModel.nickname)
                .then(() => {
                    this.dialogVisible3 = false
                    this.checkModel = {}
                    this.$message.success('设置成功')
                    this._getPageTab1(1, 10)
                    this.addDay = 30
                })
                .catch(() => {
                    this.$message.error('续费失败')
                })
        },
    },
}
</script>

<style lang="scss"></style>
