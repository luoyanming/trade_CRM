<template>
    <aside :class="subIndex !== '' ? 'app-aside with-sub-nav' : 'app-aside'">

        <!-- 二级 -->
        <transition name="fade">
            <nav role="sub" class="sub-nav" v-if="subIndex !== ''">
                <div class="main-name">{{ route.meta.parent }}</div>

                <ul class="sub-list">
                    <li class="list-item" v-for="(item, index) in subRoutes">
                        <router-link :to="item.path" :class="subIndex == index ? 'link router-link-exact-active' : 'link'">
                            <span class="name">{{ item.name }}</span>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </transition>
        <!-- 一级 -->
        <nav role="main" class="main-nav">
            <router-link to="/" class="logo">
                <img class="thumb" src="../../assets/icon_home@2x.png">
            </router-link>

            <ul class="nav-list">
                <li class="list-item" v-for="(item, index) in routes" v-on:mouseover="showSubNav(item, index)" v-on:mouseleave="hideSubNav(item, index)" v-if="item.meta.alias">
                    <router-link :to="item.path" :class="mainIndex == index ? 'main-link router-link-exact-active' : 'main-link'">
                        <i :class="'icon icon-' + item.meta.alias"></i>
                        <span class="main-name">{{ item.name }}</span>
                    </router-link>

                    <!-- 鼠标移到一级菜单上显示的二级菜单列表 -->
                    <!-- <transition name="fade"> -->
                        <nav role="hover-sub" class="sub-nav hover-sub-nav" v-if="mouseOverIndex === index">
                            <div class="main-name">{{ mouseOverParent }}</div>

                            <ul class="sub-list">
                                <li class="list-item" v-for="(mouseOverItem, mouseOverIndex) in mouseOverRoutes">
                                    <router-link :to="mouseOverItem.path" class="link">
                                        <span class="name">{{ mouseOverItem.name }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                    <!-- </transition> -->
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>

export default {
    data() {
        return {
            route: {},  //当前路由
            routes: [],  //路由列表
            mainIndex: '',  //一级列表下标
            subIndex: '',  //二级列表下标
            subRoutes: [],  //二级路由

            mouseOverIndex: '', //鼠标移上去后一级列表下标
            mouseOverRoutes: [], //鼠标移上去之后显示的二级路由
            mouseOverParent: '' //鼠标移上去的二级目录父标题

        }
    },
    watch: {
        /**
         * [description] 监听路由变化
         * @param  {[type]} val [description] 当前路由
         * @return {[type]}     [description]
         */
        '$route': function(val) {
            this.route = this.$route;
            // this.routes = this.$router.options.routes;
            this.routes = localStorage.getItem('routes') ? JSON.parse(localStorage.getItem('routes')) : this.$router.options.routes;

            this.mainIndex = '';
            this.subIndex = '';
            this.subRoutes = [];

            for(let i = 0; i < this.routes.length; i++) {
                let routeItem = this.routes[i];

                // if(routeItem.name == this.route.name && routeItem.path == this.route.path) {
                if(routeItem.name == this.route.name) {
                    this.mainIndex = i;
                    this.$emit('subNavShow', false);
                    break;
                }

                if(routeItem.children && routeItem.children.length > 0) {
                    for(let j = 0; j < routeItem.children.length; j++) {
                        let subRouteItem = routeItem.children[j];

                        // if(subRouteItem.name == this.route.name && subRouteItem.path == this.route.path) {
                        if(subRouteItem.name == this.route.name) {
                            this.mainIndex = i;
                            this.subIndex = j;
                            this.subRoutes = routeItem.children;
                            this.$emit('subNavShow', true);
                            break;
                        }
                    }
                }
            }
        }
    },
    methods: {
        /**
         * [showSubNav description]  鼠标移入，显示二级菜单
         * @param  {[type]} item  [description]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        showSubNav: function(item, index) {
            if(this.mouseOverIndex == index || this.mainIndex == index) {
                return false;
            }

            if(this.routes[index].children && this.routes[index].children.length > 0) {
                this.mouseOverRoutes = this.routes[index].children;
                this.mouseOverParent = this.routes[index].children[0].meta.parent;
                this.mouseOverIndex = index;                
            }
        },
        /**
         * [hideSubNav description]  鼠标移出，隐藏二级菜单
         * @return {[type]} [description]
         */
        hideSubNav: function() {
            this.mouseOverIndex = '';
        }
    }
}
</script>
