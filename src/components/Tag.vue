<template>
	<div class="tab">
		<el-tag v-for="(item,index) in tagList" :key="index" closable  
		:disable-transitions='false' @close="handleClose(item)" @click='changetab(item)'
		style='cursor: pointer;' :effect='seteffect(item)'>
			{{item.title}}
		</el-tag>
	</div>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex'

	export default {
		name: 'Tab',
		data() {
			return {
			
			}
		},
		computed: {
			...mapState({
				tagList: state => state.tag.tagList
			})
		},
		methods: {
			//这里就相当于this.$store.commit(...);
			...mapMutations({
				delete:'DeleteTagList'
				
			}),
			//在这里对this.tagList删除是错的 只是改了这里的值 VueX的值没变！！
			handleClose(item) {
				this.delete(item);
			},
			changetab(item){
				this.$router.push(item.path)
			},
			seteffect(item){
				console.log(this.$route.path)
				console.log(item.path )
				return  this.$route.path === item.path? 'dark':'plain'
			}
		}

	}
</script>

<style scoped="" lang="scss">
	.tab {
		background-color: #E9EEF3;
		padding: 10px;
		.el-tag {
			margin-right: 10px;
		}
	}
</style>
