
export default {
  state: {
		menu:[],
		currentMunu:{
			path:"/",
		},
		collapse: false,
		
  },
  mutations: {
		selectMenu(state,item){
			state.currentMunu=item;
		},
		collapse(state){
			state.collapse = !state.collapse;
			console.log(state.collapse)
		}
  },
  actions: {
  }
 
}
