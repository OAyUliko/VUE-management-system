<template>
	<div class="home">
		<el-row :gutter="20">
			<el-col :span="8">
				<div class="grid-content bg-purple">
					<el-card shadow="hover" style='height: 240px;margin-bottom: 10px;'>
						<div class="top">
							<img :src="userImg">
							<div class="self">
								<p class="name">{{userName}}</p>
								<p>管理员</p>
							</div>
						</div>
						<div class="bottom">
							<p>上次登陆时间：<em>{{lastLoginTime}}</em></p>
							<p>上次登陆地点：<em>荆州</em></p>
						</div>

					</el-card>
					<el-card shadow="hover" style='height: calc( 100vh - 375px )' class='tabledata'>
						<el-table :data="tableData" style="width: 100% ; ">
							<!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来
							对应对象中的键名即可填入数据，
							用label属性来定义表格的列名。可以使用width属性来定义列宽 -->
							<el-table-column v-for='(key,val) in table' :prop="val" :label="key" width="95" :key='val'>
							</el-table-column>

						</el-table>
					</el-card>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="grid-content bg-purple">
					<div class="number">
						<el-card shadow="hover" v-for='(item,index) in sellinfo' :key='index'>
							<div class="left" :style='`background-color:${item.color} ;`'>
								<i :class="`el-icon-${item.icon}`"></i>
							</div>
							<div class="right">
								<p class="price">￥{{item.value}}</p>
								<p class="order">{{item.name}}</p>
							</div>
						</el-card>
					</div>

					<el-card shadow="hover" class='middle' style='margin-bottom: 10px;'>
						<ECharts style='height: 240px; width: 100%;' :charData='echartDate.order'></ECharts>
					</el-card>

					<div class="graph">
						<el-card shadow="hover">
							<ECharts style='height: 370px; height: 250px;' :charData='echartDate.user'></ECharts>
						</el-card>
						<el-card shadow="hover">
							<ECharts style='height: 240px; width: 100%;' :charData='echartDate.video' :hasAxis='false'></ECharts>
						</el-card>

					</div>
				</div>
			</el-col>

		</el-row>
	</div>
</template>

<script>
	import ECharts from '@/components/ECharts.vue'
	export default {
		name: 'Home',
		components: {
			ECharts,
		},
		data() {
			return {
				userImg: require('../../assets/img/user-default.png'),
				userName: 'Nick',
				lastLoginTime: '2020-09-16',
				sellinfo: [{
						icon: 'success',
						value: 123,
						name: '今日支付订单',
						color: '#2ec7c9'
					},
					{
						icon: 'star-on',
						value: 123,
						name: '今日收藏订单',
						color: '#ffb980'
					},
					{
						icon: 's-goods',
						value: 123,
						name: '今日未支付订单',
						color: '#5ab1ef'
					},
					{
						icon: 'success',
						value: 123,
						name: '本月支付订单',
						color: '#2ec7c9'
					},
					{
						icon: 'star-on',
						value: 123,
						name: '本月收藏订单',
						color: '#ffb980'
					},
					{
						icon: 's-goods',
						value: 123,
						name: '本月未支付订单',
						color: '#5ab1ef'
					},
				],
				table: {
					name: '课程',
					todayBuy: '今日购买',
					monthBuy: '本月购买',
					totalBuy: '总购买',
				},
				tableData: [],
				echartDate: {
					order: {
						xData: [],
						series: []
					},
					user: {
						xData: [],
						series: []
					},
					video: {
						series: []
					},

				}

			}


		},
		methods: {
			getTableData() {
				this.$http.get('/home/getData').then(
					res => {
						console.log(res);
						this.tableData = res.data.data.tableData;

						//订单折线图
						const order = res.data.data.orderData;
						this.echartDate.order.xData = order.date;
						//1.取出order.date中的所有键值
						let keys = Object.keys(order.data[0]);
						//2.取出键值对应的所有值 形成series
						keys.forEach(key => {
							this.echartDate.order.series.push({
								name: key === 'wechat' ? '小程序' : key,
								data: order.data.map(item => item[key]),
								type: 'line'
							})
						})

						//学员柱状图
						const user = res.data.data.userData;
						let keys2 = user.map(item => item.date);
						this.echartDate.user.xData = keys2;
						this.echartDate.user.series.push({
							type: 'bar',
							data: user.map(item => item.new),
							name: '新增用户'
						}, {
							type: 'bar',
							data: user.map(item => item.active),
							name: '活跃用户',
							barGap:0
						});

						//饼状图
						const video = res.data.data.videoData;
						this.echartDate.video.series.push({
							type: 'pie',
							data: video,
							name: '视频占比'
						});
					}
				)}
			},
			
			mounted() {
				this.getTableData();
			}
			


		}
</script>

<style lang="scss">
	@import '~@/assets/scss/home.scss'
</style>
