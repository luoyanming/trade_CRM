import Vue from 'vue'
import Router from 'vue-router'


/**=====================================================================================
 * 公共模板组件
 *======================================================================================*/
const Layout = () => import('./views/layout.vue')

/**=====================================================================================
 * 登录
 *======================================================================================*/
const Login = () => import('./views/login.vue')

/**=====================================================================================
 * 实盘交易
 *======================================================================================*/
const Trade = () => import(/* webpackChunckName: "group-trade" */ './views/trade/main.vue')

/**=====================================================================================
 * 历史回测
 *======================================================================================*/
const History = () => import(/* webpackChunckName: "group-history" */ './views/history/main.vue')


Vue.use(Router)

export default new Router({
    routes: [
        /**=====================================================================================
         * 登录
         *======================================================================================*/
        {
            path: '/login',
            name: '登录',
            component: Login,
            meta: {
                noAuth: true
            }
        },
        /**=====================================================================================
         * /
         *======================================================================================*/
        {
            path: '/',
            redirect: '/trade',
            name: '欢迎页',
            component: Trade,
            meta: {
                alias: 'trade'
            }
        },
        /**=====================================================================================
         * 实盘交易
         *======================================================================================*/
        {
            path: '/trade',
            name: '实盘',
            component: Layout,
            meta: {
                alias: 'trade'
            },
            children: [
                {
                    path: '/trade',
                    name: '实盘交易',
                    component: Trade,
                    meta: {
                        
                    }
                }
            ]
        },
        /**=====================================================================================
         * 历史回测
         *======================================================================================*/
        {
            path: '/history',
            name: '历史',
            component: Layout,
            meta: {
                alias: 'trade'
            },
            children: [
                {
                    path: '/history',
                    name: '历史回测',
                    component: History,
                    meta: {
                        
                    }
                }
            ]
        }
    ]
})