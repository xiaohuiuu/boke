import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/welcome'
  },
  {
    path:'/welcome',
    component: ()=> import('../views/welcome.vue')
  },
  //blog
  {
    path:'/blog',
    name:'blog',
    redirect:'/blog/blogbody',
    component:() => import('../views/blog/blog.vue'),
    children:[
      {
        path:'about',
        component:()=> import('../views/blog/child/about.vue')
      },
      {
        path:'blogbody',
        component:()=> import('../views/blog/child/blogbody.vue')
      },
      {
        path:'pic',
        component:()=> import('../views/blog/pic.vue')
      },
      {
        path:'share',
        component:()=> import('../views/blog/share.vue')
      },
      {
        path:'detail',
        name:'detail',
        component: ()=> import('../views/blog/detail.vue')
      }
    ]
  },
  //
  {
    path:'/test',
    component:()=> import('../views/admin/test.vue')
  },
  //

]

const router = new VueRouter({
  routes
})

export default router
