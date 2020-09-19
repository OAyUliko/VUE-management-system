<template>
	<div class="user">
		<el-dialog :title='operateType==="add" ? "新增":"编辑"' :visible="true" width="30%" v-if='isshow' :showClose='false'>
			<div class="dialofform">
				<userForm :formLabel='dialogLabel' :form='operateType==="add"? " ":currentEditData'></userForm>

			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="isshow = false">取 消</el-button>
				<el-button type="primary" @click="isshow = false">确 定</el-button>
			</span>


		</el-dialog>
		<div class="top">
			<el-button type='primary' size='mini' @click='addrow'>+ 新增</el-button>
			<userForm :formLabel='formLabel' :config='config' :form='formLabelData' >
				<el-button type='primary' size='mini'>搜索</el-button>
			</userForm>
		</div>

		<div class="bottom">
			<userTable :tableData='tableData' :tableForm='tableForm' :config='config' @pageChange='getTableList' @deletethisrow='Deletethisrow'
			 @editthisrow='Editthisrow'></userTable>
		</div>

	</div>
</template>

<script>
	import userForm from './ChildComp/userForm.vue'
	import userTable from './ChildComp/userTable.vue'
	export default {
		name: 'User',
		components: {
			userForm,
			userTable,
		},
		data() {
			return {
				isshow:false,
				operateType:'add',
				dialogLabel: [{
						model: 'name',
						label: '姓名'
					},
					{
						model: 'addr',
						label: '地址'
					},
					{
						model: 'age',
						label: '年龄'
					},
					{
						model: 'birth',
						label: '出生年月',
						type:'date'
					},
					{
						model: 'sex',
						label: '性别',
						type:'select',
						options: [{
								label: '男',
								value:0
							},
							{
								label: '女',
								value:1
							}
						] 
					}
				],
				formLabel: [{
					model:'name',
					label: '姓名',/* 是前面的中文提示，显示这个框是输什么的 ，这里的用法相当于placeholder */
					},
				],
				formLabelData:{
					name:''
				},
				inline: Boolean,
				tableData: [],
				tableForm: [

					{
						prop: 'name',
						label: '姓名',
					},
					{
						prop: 'addr',
						label: '地址',
						width: '300'
					},
					{
						prop: 'age',
						label: '年龄',
					},
					{
						prop: 'birth',
						label: '出生年月',
					},
					{
						prop: 'sex',
						label: '性别',
					},
				],
				config: {
					total: 30,
					page: 1,
					loading: false
				},
				currentEditData: {
					name: '',
					addr: '',
					age: '',
					birth: '',
					sex: ''
				},
			}
		},
		methods: {
			getTableList(val) {
				this.config.loading = true;
				this.$http.get('/user/getUser', {
					params: {
						page: val,
					}
				}).then(
					res => {
						console.log(res);
						this.tableData = res.data.list.map(item => {
							item.sex = item.sex == 0 ? '女' : '男';
							return item
						})
						this.config.total = res.data.count;
						this.config.loading = false;

					})
			},

			Deletethisrow(val) {
				this.$http.get('/user/del', {
					params: {
						id: val,
					}
				}).then(res => {
					console.log(res);
					alert('删除成功！')
					this.tableData.splice(val, 1); //删除选中的row

				})
			},
			Editthisrow(index, row) {
				this.isshow=true;
				this.operateType = 'edit';
				this.currentEditData = row;
				//this.currentEditData.sex= row.sex=='女'?1:0;
			
			},
			addrow(){
				this.operateType='add';
				this.isshow=true;
			}

		},
		mounted() {
			this.getTableList();
		},
		//对tableData进行实时监控，只能在当前页删，并且从别的页面跳过来后，会发现其实并没有删去
		watch: {
			tableData: {
				handler: function() {
					this.tableData = this.tableData;
				},
				deep: true,
			},
		}

	}
</script>

<style scoped="" lang="scss">
	@import '~@/assets/scss/user.scss'
</style>
