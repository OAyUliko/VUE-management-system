import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Main',
		component: () => import('@/views/Main.vue'),
		redirect:'/home',
		children: [
			 {
					path: '/home',
					name: 'Home',
					component: () => import('@/views/Home/home.vue'),
				},
				{
				path: '/vedio',
				name: 'Vedio',
				component: () => import('@/views/Vedio/vedio.vue'),
			},
			{
				path: '/user',
				name: 'User',
				component: () => import('@/views/User/user.vue'),
			}, {
				path: '/other',
				name: 'Other',
				component: () => import('@/views/Other/other.vue'),
				children:[
					{
						path: '/other1',
						name: 'Other1',
						component: () => import('@/views/Other/other1.vue'),
					},
					{
						path: '/other2',
						name: 'Other2',
						component: () => import('@/views/Other/other2.vue'),
					},
					
				]
			},

		]
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
