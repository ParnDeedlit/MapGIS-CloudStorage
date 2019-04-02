import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/view/main/index'
import HomeMenu from '@/components/menu/home';
import ListMenu from '@/components/menu/list';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/list', component: Main,
            children:[
                {path: '/list/index', name: 'listIndex', components: {menu: ListMenu, main: () => import('@/view/list/index')}},
                {path: '/list/uploads', name: 'listUploads', components: {menu: ListMenu, main: () => import('@/view/list/uploads')}},
                {path: '/list/complete', name: 'listComplete', components: {menu: ListMenu, main: () => import('@/view/list/complete')}},
            ]
        },
        {
            path: '/', component: Main,
            children: [
                {
                    path: '/',
                    name: 'index',
                    components: {menu: HomeMenu, main: () => import('@/view/index')}
                }
            ]
        },
        {
            path: '/home', name: '/home', component: Main,
            children: [
                {
                    path: '/home/images',
                    name: 'images',
                    components: {menu: HomeMenu, main: () => import('@/view/home/images')}
                },
                {
                    path: '/home/documents',
                    name: 'documents',
                    components: {menu: HomeMenu, main: () => import('@/view/home/documents')}
                },
                {
                    path: '/home/videos',
                    name: 'videos',
                    components: {menu: HomeMenu, main: () => import('@/view/home/videos')}
                },
                {
                    path: '/home/musics',
                    name: 'musics',
                    components: {menu: HomeMenu, main: () => import('@/view/home/musics')}
                },
                {
                    path: '/home/seeds',
                    name: 'seeds',
                    components: {menu: HomeMenu, main: () => import('@/view/home/seeds')}
                },
                {
                    path: '/home/other',
                    name: 'other',
                    components: {menu: HomeMenu, main: () => import('@/view/home/other')}
                },
                {
                    path: '/home/share',
                    name: 'share',
                    components: {menu: HomeMenu, main: () => import('@/view/home/share')}
                },
            ]
        },
        {
            path: '*', component: Main,
            children: [{path: '_', component: () => import('@/view/index')},]
        }
    ]
})
