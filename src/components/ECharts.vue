<template>
	<div class="echarts" style="height: 100%;" ref='echarts'>

	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'ECharts',
		/* 我们的数据是从父组件传过来的 用prop */
		props: {
			charData: {
				type: Object,
				default () {
					return {
						xData: [],
						series: [],
					}
				}
			},
			/* 是否是有轴的表格 有的话就创建axisOptions对象*/
			hasAxis: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				echarts: null,
				/* 有坐标轴的echarts对象 */
				axisOptions: {
					legend: {
					  textStyle: {
					    color: '#333'
					  }
					},
					// 设置悬浮气泡框
					tooltip: {
					  trigger: 'axis'
					},
					grid:{
						top: '20%'
					},
					xAxis: {
						type: 'category',
						/* x坐标轴的类目轴 */
						data: [],
						axisLine: {
							lineStyle: {
								color: '#17b3a3'
							},
						},
						axisLabel: { color: '#333' },
						// 设置顶部圆点
					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#17b3a3'
							}
						} /* y坐标轴的类目轴 */
					},
					series: [],
					color: [
						'#2ec7c9',
						'#b6a2de',
						'#5ab1ef',
						'#ffb980',
						'#d87a80',
						'#8d98b3',
						'#e5cf0d',
						'#97b552',
						'#95706d',
						'#dc69aa',
						'#07a2a4',
						'#9a7fd1',
						'#588dd5',
						'#f5994e',
						'#c05050',
						'#59678c',
						'#c9ab00',
						'#7eb00a',
						'#6f5553',
						'#c14089'
					],
				},
				/* 没有坐标轴的echarts对象 */
				noaxisOptions: {
					series: [],
					tooltip: {
					  trigger: 'item'
					},
					color: [
					  '#0f78f4',
					  '#dd536b',
					  '#9462e5',
					  '#a6a6a6',
					  '#e1bb22',
					  '#39c362',
					  '#3ed1cf'
					],
				},
			}
		},
		computed: {
			options() {
				return this.hasAxis ? this.axisOptions : this.noaxisOptions;
			},
			iscollapse(){
				return this.$store.state.tab.collapse;
			}
		},
		/* 当prop传进来的charData发生变化时进行监听 */
		watch: {
			charData: {
				handler: function() {
					this.initChart();
				},
				deep: true,
			},
			iscollapse(){
				setTimeout(() => {
					this.tableresize();
				},300)
				
			}
			
		},
		methods: {
			initChart() {
				this.initchartData();
				if (this.echarts) {
					this.echarts.setOption(this.options);
				} else {
					this.echarts = echarts.init(this.$refs.echarts);
					this.echarts.setOption(this.options);
				}
			},
			initchartData() {
				if (this.hasAxis) {
					this.axisOptions.xAxis.data = this.charData.xData;
					this.axisOptions.series = this.charData.series;
				} else {
					this.noaxisOptions.series = this.charData.series;
				}
			},
			tableresize(){
				this.echarts?this.echarts.resize():'';
				
			},
			
		},
		mounted() {
		  window.addEventListener('resize', this.tableresize)
		},
		destroyed() {
		  // 组件销毁时同步销毁该事件，防止内存泄漏
		  window.removeEventListener('resize', this.tableresize)
		}


	}
</script>

<style scoped="" lang="scss">

</style>
