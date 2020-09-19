2020.09.17 
 完成了整体：基本布局，路由跳转，tab联动，
      首页：mock模拟后台数据，封装ECharts组件
      
![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/0.png)

#### 一、 引入scss elementUI

##### 1. 引入scss

* 手动安装node-sass, sass-loader时一直说找不到全局变量，后面通过脚手架安装，发现他这个的版本要低一点（所以之前是版本太高了吗？）
* scss就可以一键修改所有的相关的样式了
![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/1.png)

##### 2. 完整引入elementUI
```
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
```


####  二、完成左侧NavMenu导航栏

##### 1. 使用Container布局，对<el-aside>和<el-main>再进行内部封装
##### 2. 在<el-aside>中放入NavMenu侧边导航栏
* 设置导航栏数据
* 在NavBar中有条信息：关于跳转路由：index里面放的是路由路径
```
router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
```
* 有些标题有子路径，有些没有 => 计算属性来filter
* 利用v-for来遍历对应要求的数组
![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/2.png)


####  三、头部导航栏中的面包屑导航 及其与navmenu的导航联动


##### 1. 面包屑导航从VueX中获得当前选项数据
* 在这里，VueX主要是保存当前的导航路由选择，在面包屑导航中显示出来。这样在Header.vue中就有当前选择的导航的相关信息。面包屑导航是通过mapState拿到VueX中的getters，然后把当前路由信息保存在面包屑导航中的自定义变量current中

![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/3.png)


##### 2. NavMenu怎么把数据传给VueX
* NavMenu中通过点击事件，将被点击的导航的相关信息通过$store来发送给VueX，将信息保存在VueX的currentMunu中，在面包屑导航中，拿到VuexX中的currentMunu，保存在自己的变量current中，通过读取属性title获得当前点击的导航

![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/4.png)

##### 3. 小问题：因为一开始还没有点击，current是空的对象，所以“首页”后面会跟一个/，直到点击了标题，才会判断显不显示/。怎么能一开始就默认点击了首页，并且不显示/

* NavMenu中通过点击事件，将被点击的导航的相关信息通过$store来发送给VueX，将信息保存在VueX的currentMunu中，在面包屑导航中，拿到VuexX中的currentMunu，保存在自己的变量current中，通过读取属性title获得当前点击的导航

![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/5.png)


####  四、mock.js axios

##### 1. 模拟后台数据

* 因为这个demo没有后台，所以用mock.js来拦截axios中发出的消息，来随机生成符合的数据返还给前
##### 2. axios
* 这里对服务器返回来的响应做了处理，只要status和data，其他的不用。我们一般情况下可以对返回来的状态码status进行判断来响应不同的界面

![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/6.png)


##### 3. mock.js
* 可以按照我们规定的格式来返回随机数据
```
npm install mockjs //安装

Mock.mock( rurl, rtype, function( options ) )
//记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回

Random.float( min, max, dmin, dmax )
//dmin：可选。小数部分位数的最小值。默认值为 0。   dmax：可选。小数部分位数的最大值。默认值为 17


```

![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/7.png)
![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/8.png)


####  五、ECharts的使用和封装
##### 1. 组件封装的步骤

1. 观察给出的实例，找出组件的基本参数/分类
2. 参数的分类，分为需要父组件传来的 / 组件自身的数据
3. 完善细节：查看文档，优化下组件的配置项
4. 考虑适配：考虑多环境下，图标的自适应


##### 2. ECharts图形的分类
* 因为要封装，我们发现ECharts分为两类：有x坐标的/没有x坐标的（即类目轴）。常见的ECharts的数据属性：

![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/9.png)


##### 3. 封装的ECharts的折线图：父组件怎么从一大串的res中取出数据
![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/10.png)

##### 4. 封装的ECharts的折线图：怎么封装ECharts组件
* 对表进行大致的分类，分为有轴的和没有轴的，对从父组件来的props进行监听，如果props中的数据发生变化了，就要更新图表。怎么更新呢？先接收从父组件来的props数据，父组件会告诉我这个图标需不需要轴，子组件就根据这个条件来找到对应的框（顺便把数据也填进去）；有了框之后，子组件开始创建ECharts实例，如果是第一次画表格，就要init一个表格，如果之前有表格，就只要setOption就可以了；在setOptions的时候，子组件就会再看一次这个表格需要的是什么框，取出刚刚创建的对应的框给我的表格。就完成了一次表格的绘制。

![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/11.png)
![image](https://github.com/OAyUliko/VUE-management-system/blob/master/ReadmePic/12.png)
