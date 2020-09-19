<template>
	<div class="aside">
		<el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
		 default-active='/' :collapse="iscollapse()">
			<h3 v-show="!iscollapse()">VUE+Element-UI</h3>
			<h3 v-show="iscollapse()">Lyao</h3>
			<el-menu-item :index='item.path' v-for='item in noChild' :key='item.title' @click='clickMenu(item)'>
				<i :class="'el-icon-' + item.icon"></i>
				<span slot="title">{{item.title}}</span>
			</el-menu-item>

			<el-submenu :index='item.path' v-for='(item,index) in hasChild' :key='index' @click='clickMenu(subitem)'>
				<template slot="title">
					<i :class="'el-icon-' + item.icon"></i>
					<span>{{item.title}}</span>
				</template>
				<el-menu-item-group>
					<el-menu-item :index='subitem.path' v-for='(subitem,subindex) in item.children' :key='subindex' @click='clickMenu(subitem)'>
						{{subitem.title}}</el-menu-item>
				</el-menu-item-group>
			</el-submenu>


		</el-menu>
	</div>
</template>

<script>
	// @ is an alias to /src
	export default {
		name: 'Aside',
		data() {
			return {
				asidemenu: [{
						title: '首页',
						path: '/',
						icon: 's-home'
					},
					{
						title: '视频管理',
						path: '/vedio',
						icon: 'video-camera-solid'
					},
					{
						title: '用户管理',
						path: '/user',
						icon: 'user-solid',
					},
					{
						title: '其他',
						path: '/other',
						icon: 'more',
						children: [{
								title: '2-1',
								path: '/other1',
								icon: 'service'
							},
							{
								title: '2-2',
								path: '/other2',
								icon: 'service'
							}
						]
					},

				]
			}
		},
		computed: {
			hasChild() {
				return this.asidemenu.filter(item => {
					return item.children
				})
			},
			noChild() {
				return this.asidemenu.filter(item => {
					return !item.children
				})
			},
			collapse() {
			
				return this.$store.state.tab.collapse;
			}

		},
		methods: {
			clickMenu(item) {
				//像这里 写进一个函数 进行commit也是可以的！

				console.log(item.path)
				this.$router.push(item.path)
				this.$store.commit('selectMenu', item);
				this.$store.commit('InsertTagList', item);
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			iscollapse() {
				
				return this.$store.state.tab.collapse
			}
		}

	}
</script>

<style scoped="">
	h3 {
		line-height: 20px;
		color: white;
		margin: 20px 0 20px 0;
	}

	.el-menu-vertical-demo {
		height: 100vh;
	}

	.el-menu {
		border-right: none;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
