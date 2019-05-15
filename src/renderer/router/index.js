import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/view/main/index'
import HomeMenu from '@/components/menu/home';
import ListMenu from '@/components/menu/list';
import ListShare from '@/components/menu/share';
import ListEmpty from '@/components/menu/empty';

import login from '@/view/login/login'
import ListOther from '@/components/menu/other';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/main', component: Main,
            children: [
                {
                    path: '/index',
                    name: 'index',
                    components: { menu: HomeMenu, main: () => import('@/view/index') }
                }
            ],
            props: { sidebar: true, role: ['admin', 'user'] }
        },
        {
            path: '/home', name: '/home', component: Main,
            children: [
                {
                    path: '/home/images',
                    name: 'images',
                    components: { menu: HomeMenu, main: () => import('@/view/home/images') }
                },
                {
                    path: '/home/documents',
                    name: 'documents',
                    components: { menu: HomeMenu, main: () => import('@/view/home/documents') }
                },
                {
                    path: '/home/videos',
                    name: 'videos',
                    components: { menu: HomeMenu, main: () => import('@/view/home/videos') }
                },
                {
                    path: '/home/musics',
                    name: 'musics',
                    components: { menu: HomeMenu, main: () => import('@/view/home/musics') }
                },
                {
                    path: '/home/seeds',
                    name: 'seeds',
                    components: { menu: HomeMenu, main: () => import('@/view/home/seeds') }
                },
                {
                    path: '/home/other',
                    name: 'other',
                    components: { menu: HomeMenu, main: () => import('@/view/home/other') }
                },
                {
                    path: '/home/share',
                    name: 'share',
                    components: {menu: HomeMenu, main: () => import('@/view/home/share')}, 
                    meta:{requireAuth:true}

                },
            ],
            props: { sidebar: true, role: ['admin', 'user'] }
        },
        {
            path: '/list', component: Main,
            children: [
                { path: '/list/index', name: 'listIndex', components: { menu: ListMenu, main: () => import('@/view/list/index') } },
                { path: '/list/uploads', name: 'listUploads', components: { menu: ListMenu, main: () => import('@/view/list/uploads') } },
                { path: '/list/complete', name: 'listComplete', components: { menu: ListMenu, main: () => import('@/view/list/complete') } },
            ],
            props: { sidebar: true, role: ['admin', 'user'] }
        },
        {
            path: '/share', component: Main,
            children:[
                {path: '/share/index', name: 'shareSession', components: {menu: ListShare, main: () => import('@/view/share/index')}},
                {path: '/share/friend', name: 'shareFriend', components: {menu: ListShare, main: () => import('@/view/share/friend')}, meta:{requireAuth:true}},
                {path: '/share/group', name: 'shareGroup', components: {menu: ListShare, main: () => import('@/view/share/group')}},
            ],
            props: { sidebar: true, role: ['admin', 'user'] }
        },
        {
            path: '/func', component: Main,
            children: [
                { path: '/func/index', name: 'functionList', components: { menu: ListEmpty, main: () => import('@/view/function/index') } },
            ],
            props: { sidebar: false }
        },
        {
            path: '/other', component: Main,
            children: [
                { path: '/other/film', name: 'otherFilm', components: { menu: ListOther, main: () => import('@/view/other/film') } },
                { path: '/other/app', name: 'otherApp', components: { menu: ListOther, main: () => import('@/view/other/app') } },
                { path: '/other/novel', name: 'otherNovel', components: { menu: ListOther, main: () => import('@/view/other/novel') } }
            ],
            props: { sidebar: true, role: ['admin', 'user'] }
        },
        {
            path: '/wenjian',
            component: Main,
            children: [
                {
                    path: '/wenjian/fs',
                    name: 'fs',
                    components: {
                        menu :ListEmpty,
                        main: ()=>import('@/view/wenjian/fs')
                    },
                    meta:{requireAuth:true}
                },
                {
                    path: '/wenjian/fs/:id',
                    name: 'folder',
                    components: {
                        menu: ListEmpty,
                        main: () => import('@/view/contextmenu/folder')
                    }
                }
            ],
            props: { sidebar: false, role: 'admin' }
        },
        {
            path: '*', component: Main,
            children: [{ path: '_', component: () => import('@/view/index') },],
            props: { sidebar: true }
        }]
})
