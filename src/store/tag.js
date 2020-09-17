export default {
	state: {
		tagList: [],


	},
	mutations: {
		//添加进来的检测是:判断是不是首页 判断现有的list里面有没有重复的
		InsertTagList(state, item) {
			if (state.tagList.indexOf(item) == -1 && item.title!='首页') {
				state.tagList.push(item);
			}
			//indexOf是判断数组中某个元素是否存在,不存在则返回-1
			//findIndex是用来查找索引的,返回的查找到的符合项的索引.

			//findOf是传入一个值.找到了也是返回索引,没有找到也是返回-1
			//findIndex是传入一个测试条件,也就是函数,找到了返回当前项索引,没有找到返回-1.
		},
		DeleteTagList(state, item) {
			state.tagList.splice(state.tagList.indexOf(item), 1);
			
		}
	},
	actions: {}

}
