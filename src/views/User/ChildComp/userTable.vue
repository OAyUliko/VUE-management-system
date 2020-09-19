<template>
	<div class='userTable'>
		<el-table :data="tableData" style="width: 100%; " max-height='620'  v-loading="config.loading">

			<el-table-column label="序号" width="120;height: 30px;">
				<template slot-scope='scope'>
					<span>{{(config.page-1) * 10 + scope.$index+1}}</span>
				</template>
			</el-table-column>
			<el-table-column stripe v-for='item in tableForm ' :prop='item.prop' :label="item.label" :key='item.label' :width="item.width?item.width :'180' ">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
				</template>
			</el-table-column>

		</el-table>
		<el-pagination v-if='config' layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change='pagechange'>
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'userTable',
		props: {
			tableData: Array,
			tableForm: Array,
			config: Object
		},
		methods: {
			handleEdit(index,row) {
				this.$emit('editthisrow',index,row);
				console.log(index,row);
			},
			handleDelete(index) {
				this.$emit('deletethisrow',index);		
			},
			pagechange(page){
				this.$emit('pageChange',page)
			}
		}


	}
</script>

<style>
	.userTable .el-table td,
	.el-table th.is-leaf {
		height: 30px;
	}
	.el-pagination {
		position: absolute;
		right: 30px;
	}
</style>
