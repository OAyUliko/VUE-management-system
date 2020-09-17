<template>
	<div class="header">
		<div class="header_left">
			<el-button icon="el-icon-menu" style='background-color: #ffd04b; border: none;' size='mini' @click='collapse'></el-button>
			<el-breadcrumb separator='/' style='margin-left: 20px; '>
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-if='current.path!="/"' :to="current.path">{{current.title}}</a></el-breadcrumb-item>

			</el-breadcrumb>
		</div>
		<div class="header_right">
			<el-dropdown>
				<span class="el-dropdown-link">
					<img :src="userImg" alt="">
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'Header',
		data() {
			return {
				userImg: require('@/assets/img/user.png')
			}
		},
		computed: {
			...mapState({
				current: state => state.tab.currentMunu
			})
		},
		methods: {
			isShowSeparator() {
				if (current.title == "首页")
					return " "
				else
					return "/"
			},
			collapse(){
				this.$store.commit('collapse');
				
			}
		},



	}
</script>

<style scoped="">
	.header {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	img {
		height: 41px;
		border-radius: 50%;
		vertical-align: middle;
	}

	.header_left {
		display: flex;
		align-items: center;

	}
</style>
<!-- 为什么再创一个style，因为上一个是scope的，像这种组件里组件的改变css要单独搞一个style 不写scope -->
<style>
	span .el-breadcrumb__separator {
		color: #ffd04b;
	}

	.el-breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner {
		font-weight: 700;
		text-decoration: none;
		color: #555555;
	}

	span .el-breadcrumb__inner.is-link {
		font-weight: 700;
		text-decoration: none;
		transition: color .2s cubic-bezier(.645, .045, .355, 1);
		color: #7698c5;
		}
</style>
