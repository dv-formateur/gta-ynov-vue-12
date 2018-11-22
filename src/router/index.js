import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/HomeComponent'
import Login from './../components/LoginComponent'
import Dashboard from '../components/DashboardComponent'
import Admin from '../components/admin/AdminComponent'
import AddUser from "../components/AddUserComponent"
Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/add_user',
            name: 'Add User',
            component: AddUser,
            meta: {
                requiresAuth: true,
                role: ['drh', 'responsable']
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                requiresAuth: true,
                role : ["drh"]
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.meta.role != undefined) {
                let rolefound = null
                to.meta.role.forEach((role)=>{
                    if(user.role === role){
                        rolefound = true
                    }
                })
                if(rolefound){
                    next()
                }
                else{
                    next({ name: 'Dashboard'})
                }
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'Dashboard'})
        }
    }else {
        next()
    }
})

export default router
