<template>
	<div class="main">
		<el-container style='height: 100%;'>
			<el-aside width="auto">
				<Aside></Aside>
			</el-aside>
			<el-container>
				<el-header>
					<Header></Header>
				</el-header>
				<Tag></Tag>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import Aside from '@/components/Aside.vue'
	import Header from '@/components/Header.vue'
	import Tag from '@/components/Tag.vue'

	export default {
		name: 'Main',
		components: {
			Aside,
			Header,
			Tag
		}

	}
</script>

<style>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.main .el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;

		padding: 0px 20px;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
