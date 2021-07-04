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
                    path: '/home/recycle',
                    name: 'myRecycle',
                    components: { menu: HomeMenu, main: () => import('@/view/home/images') }
                },
                {
                    path: '/home/documents',
                    name: 'myDocument',
                    components: { menu: HomeMenu, main: () => import('@/view/home/documents') }
                },
                {
                    path: '/home/get',
                    name: 'myGet',
                    components: { menu: HomeMenu, main: () => import('@/view/home/share') },
                    meta: { requireAuth: true }

                },
                {
                    path: '/home/share',
                    name: 'myShare',
                    components: { menu: HomeMenu, main: () => import('@/view/home/share') },
                    meta: { requireAuth: true }

                }
            ],
            props: { sidebar: true, role: ['admin', 'user'] }
        },
        {
            path: '/list', component: Main,
            children: [
                {
                    path: '/list/index',
                    name: 'listIndex',
                    components: { menu: ListMenu, main: () => import('@/view/list/index') },
                    props: { main: { upload: false, download: true } }
                },
                {
                    path: '/list/uploads',
                    name: 'listUploads',
                    components: { menu: ListMenu, main: () => import('@/view/list/uploads') },
                    props: { main: { upload: true, download: false } }
                },
                { path: '/list/complete', name: 'listComplete', components: { menu: ListMenu, main: () => import('@/view/list/complete') } },
            ],
            props: { sidebar: true, role: ['admin', 'user'] }
        },
        {
            path: '/share', component: Main,
            children: [
                { path: '/share/index', name: 'shareSession', components: { menu: ListShare, main: () => import('@/view/share/index') } },
                { path: '/share/friend', name: 'shareFriend', components: { menu: ListShare, main: () => import('@/view/share/friend') }, meta: { requireAuth: true } },
                { path: '/share/group', name: 'shareGroup', components: { menu: ListShare, main: () => import('@/view/share/group') } },
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
                { path: '/other/film', name: 'otherFilm', components: { menu: ListOther, main: () => import('@/view/expolrer/index') } },
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
                        menu: ListEmpty,
                        main: () => import('@/view/wenjian/fs')
                    },
                    meta: { requireAuth: true }
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
