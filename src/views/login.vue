<template>
    <div class="login-region">
        <div class="wrap">
            <div class="title">ATLAS</div>

            <div class="input-wrap">
                <el-input type="text" v-model="account" placeholder="请输入用户名" autocomplete="off"></el-input>
                <div class="errMsg-box" v-if="accountError">{{ accountError}}</div>
            </div>

            <div class="input-wrap">
                <el-input type="password" v-model="password" placeholder="请输入密码" autocomplete="new-password"></el-input>
                <div class="errMsg-box" v-if="passwordError">{{ passwordError }}</div>
            </div>
            <el-button type="primary" @click.native="login" :loading="loading">{{ loading ? '正在登录' : '登录' }}</el-button>
        </div>

    </div>
</template>

<script>
    import { API } from '@/common/api';
    import Vue from 'vue';

    export default {
        name: 'login',
        data() {
            return {
                loading: false, // 登录loading

                account: '', // 手机号
                password: '', // 用户名

                accountError: false, // 控制用户名报错
                passwordError: false, // 控制密码报错
            } 
        },
        methods: {
            /**
             * [login description] 登录
             * @param  {[type]} val [description]
             * @return {[type]}     [description]
             */
            login(){
                if(this.account == ''){
                    this.accountError = '*请输入用户名';
                    return false;
                }else{
                    this.accountError = false;
                }
                if(this.password == ''){
                    this.passwordError = '*请输入密码';
                    return false;
                }else{
                    this.passwordError = false;
                }

                var params = {
                    method: 'login',
                    userID: this.account,
                    password: this.password
                };

                this.loading = true;

                API(params).then(res => {
                    this.loading = false;

                    console.log(res)

                    let { error_code, error_msg, token } = res;

                    if(error_code == 0){
                        this.$message({ message: '登录成功', type: "success" });

                        localStorage.setItem('user', this.account);
                        localStorage.setItem('token', token);
                        this.$router.push({ path: '/' });
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    console.log(error)
                    this.loading = false;
                    this.$message.error('服务器异常');
                })
            }
        
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../common/styles/base/mixin-common";

    .login-region{
        @include position(fixed, 100, 0, 0, 0, 0);
        background-color: rgb(234, 234, 234);

        .wrap{
            @include position(absolute, 1001, 50%, none, none, 50%);
            @include translate(-50%, -50%, 0);
            background-color: #FFF;
            padding: 50px 145px;
            border-radius: 12px;

            .title{
                padding-bottom: 40px;
                font-size: 50px;
                color: #409EFF;
                font-weight: bolder;
                text-align: center;
            }

            .input-wrap{
                position: relative;
                margin-bottom: 30px;

                /deep/ .el-input{
                    display: block;
                    width: 460px;

                    .el-input__inner{
                        height: 60px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }
                }

                .errMsg-box{
                    @include position(absolute, 3, 0, none, none, 475px);
                    white-space: nowrap;
                    font-size: 12px;
                    color: #FF614C;
                    line-height: 60px;
                }
            }

            .el-button{
                width: 460px;
                height: 60px;
                font-size: 18px;
            }
        }
    }  
</style>