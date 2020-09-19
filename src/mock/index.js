//引入mock
import Mock from 'mockjs'
import homeApi from './home.js'
import userApi from './user.js'

//设置200-2000的延时
Mock.setup({
	timeout:'200-2000'
})

//首页相关 /home/getData
Mock.mock(/\/home\/getData/,'get',homeApi.getHomeTableData)

// 用户相关 /user/....
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)