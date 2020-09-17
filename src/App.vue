<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	import Main from '@/views/Main.vue'
	export default {
	  name: 'app',
		components:{
			Main
		}
	  
	}
</script>

<style lang="scss">
	#app {
		color: $theme-color;
		height: 100vh;
	}

</style>
