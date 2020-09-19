<template>
	<div class='userForm'>
		<!-- model	表单数据对象 -->
		<el-form ref='userform' :inline='true' :model="form">
			<el-form-item v-for='item in formLabel' :key='item.model' :label='item.label'>
				<el-input v-model="form[item.model]" size='mini' :placeholder=' "请输入"+ item.label' v-if='!item.type'></el-input>
				<el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'">
					<el-option v-for="item in item.options" :key="item.label" :value="item.value" :label='item.label'></el-option>
				</el-select>
				<el-date-picker v-model="form[item.model]" type="date" placeholder="选择日期" v-if="item.type === 'date'">
				</el-date-picker>
				<el-switch v-model='item.model' v-if="item.type === 'switch'"></el-switch>
			</el-form-item>
			<el-form-item>
				<slot></slot>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'userForm',
		props: {
			form: Object,
			formLabel: Array,
			/* 这是传过来的多种属性 */
			inline: Boolean,
		}
	}
</script>

<style scoped="">
</style>
