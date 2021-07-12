<template>
    <div class="login">
        <div class="content ">
            <div class="logo_container fr">
                <div class="title clearfix">
                    <p class="fl m-1"><a href="">快速登录</a></p>
                    <p class="fl m-2"><a href="">帐号密码登录</a></p>
                </div>
                <div class="form">
                    <el-form ref="loginForm" :rules="rules" :model="ruleForm">
                        <el-form-item prop="username">
                            <el-input
                                placeholder="请输入账号"
                                prefix-icon="el-icon-user"
                                v-model="ruleForm.username"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                placeholder="请输入密码"
                                prefix-icon="el-icon-lock"
                                v-model="ruleForm.password"
                                show-password
                            ></el-input>
                        </el-form-item>
                        <el-button type="primary" class="loginBtn" @click="loginYz('loginForm')">登录</el-button>
                    </el-form>
                </div>
                <div class="bottom">
                    <div>
                        <a
                            href="https://aq.qq.com/v2/uv_aq/html/reset_pwd/pc_reset_pwd_input_account.html?v=3.0&old_ver_account="
                            target="_blank"
                            >忘了密码?</a
                        >&nbsp;|&nbsp; <a href="#" target="_blank">注册新账号</a>&nbsp;|&nbsp;
                        <a href="#" target="_blank">意见反馈</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                username: 'admin',
                password: '123456',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' },
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        }
    },
    mounted() {},
    methods: {
        loginYz(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this._login()
                } else {
                    return
                }
            })
        },
        _login() {
            this.$store
                .dispatch('user/_login', this.ruleForm)
                .then(() => {
                    this.$message.success('登录成功！')
                    console.log(this.$router.currentRoute.fullPath)
                    this.$router.push('/')
                })
                .catch((error) => {
                    this.$message.error(error)
                })
        },
    },
}
</script>
<style scoped lang="scss">
.login {
    height: 100%;
    width: 100%;
    background: url(../../assets/pageBg/bg.jpeg) no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
}

.loginBtn {
    width: 100%;
    background: #19b9e7;
    margin-top: 20px;
}

.content {
    width: 1280px;
    margin: 370px auto 60px;
    position: relative;

    .logo_container {
        width: 334px;
        height: 334px;
        visibility: visible;
        background-color: #fff;
        border: 1px solid #a0b1c4;
        position: relative;
        z-index: 12;
        padding: 0;
        border-radius: 5px;
        overflow: hidden;
    }
    .fr {
        float: right;

        .title {
            height: 50px;
            border-bottom: 1px solid #c0cdd9;
            background-color: #f9fbfe;
            font-size: 16px;
            line-height: 50px;
        }

        p.m-1 {
            margin: 0 61px 0 53px;
        }

        p.m-1 a {
            color: #999;
        }

        p a:hover {
            color: #000;
        }
        .fl {
            float: left;
        }
    }

    .clearfix:after {
        content: '';
        display: block;
        clear: both;
    }
}

.form {
    margin: 36px 26px;
}

.bottom {
    position: absolute;
    bottom: 20px;
    right: 25px;
    color: #bfbfbf;
    a {
        color: #225592;
    }
}
@media screen and (max-width: 768px) {
    .content {
        width: 334px;
        margin: 170px auto;
    }
}
</style>
