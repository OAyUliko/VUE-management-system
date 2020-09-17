//引入mock
import Mock from 'mockjs'
import homeApi from './home.js'

//设置200-2000的延时
Mock.setup({
	timeout:'200-2000'
})

//首页相关 /home/getData
Mock.mock(/\/home\/getData/,'get',homeApi.getHomeTableData)

