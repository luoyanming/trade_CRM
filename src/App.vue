<template>
    <div id="app" class="flex-v">
        <!-- page header -->
        <template v-if="showHeader">
            <header class="page-header flex-h">
                <div class="logo">ATLAS</div>
                <nav class="nav-wrap flex-a-i">
                    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleMenuSelect" background-color="transparent" text-color="#FFF" active-text-color="#FFF" router>
                        <el-menu-item index="/trade" :disabled="$route.path == '/trade'">实盘交易</el-menu-item>
                        <el-menu-item index="/history" :disabled="$route.path == '/history'">历史回溯</el-menu-item>
                    </el-menu>
                </nav>
                <div class="message">
                    <i class="el-icon-s-promotion"></i>
                </div>
                <div class="userinfo">
                    <el-dropdown @command="handleDropdownChange">
                        <span class="el-dropdown-link">
                            {{ nickName }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </header>
        </template>
        <!-- page main -->
        <main class="page-main flex-a-i flex-v">
            <!-- route -->
            <keep-alive>
                <transition name="fade">
                    <router-view v-if="$route.meta.keepAlive" />
                </transition>
            </keep-alive>

            <transition name="fade">
                <router-view v-if="!$route.meta.keepAlive" />
            </transition>
        </main>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showHeader: false,
                nickName: localStorage.getItem('user')
            }
        },
        watch: {
            '$route': function () {
                if (this.$route.fullPath == '/login') {
                    this.showHeader = false;
                } else {
                    this.showHeader = true;
                }
            }
        },
        methods: {
            /**
             * [handleDropdownChange description] 下拉列表选择
             * @param  {[type]} command [description]
             * @return {[type]}         [description]
             */
            handleDropdownChange: function(command) {
                if(command == 'logout') {
                    // 退出登录
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');

                    this.$router.push({ path: '/login' });
                }
            },
            /**
             * [handleMenuSelect description] 切换导航菜单
             * @param  {[type]} key     [description]
             * @param  {[type]} keyPath [description]
             * @return {[type]}         [description]
             */
            handleMenuSelect(key, keyPath) {
                console.log(this.$route.path, key, keyPath)

            }
        },
        mounted() {}
    }

</script>
<style lang="scss" scoped>
    @import "./common/styles/base/mixin-common";

    /* page header */
    .page-header {
        background-color: #666;

        .logo {
            position: relative;
            padding: 10px 15px;
            font-size: 30px;
            line-height: 50px;
            font-weight: bolder;
            color: #FFF;
            user-select: none;

            &::after {
                content: "";
                @include position(absolute, 1, 25%, 0, none, none);
                height: 50%;
                width: 1px;
                background-color: rgba(#FFF, .6);
            }
        }

        .nav-wrap {
            margin-left: 30px;
            padding: 10px 0;

            .el-menu {
                border: none;

                .el-menu-item {
                    height: 50px;
                    line-height: 50px;
                    padding: 0;
                    margin: 0 20px;
                    border-width: 3px;
                    font-weight: bolder;
                    font-size: 18px;

                    &:hover {
                        opacity: .8;
                        background-color: transparent !important;
                    }

                    &.is-active,
                    &.is-disabled {
                        opacity: 1;
                        cursor: default;

                        &:hover {
                            cursor: default;
                            opacity: 1;
                        }
                    }
                }
            }
        }

        .message{
            i{
                margin-top: 20px;
                font-size: 30px;
                color: rgb(83, 213, 42);
            }
        }

        .userinfo {
            margin-left: 10px;

            .el-dropdown {
                margin: 20px 20px 0 0;

                .el-dropdown-link {
                    font-size: 18px;
                    font-weight: bolder;
                    color: #FFF;
                    line-height: 30px;
                    user-select: none;

                    .el-icon--right {
                        font-weight: bolder;
                    }
                }
            }
        }
    }

    /* page main*/
    .page-main{
        padding: 10px;
    }

</style>
