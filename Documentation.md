#### 一、组件:

##### 	1. AppBar: 主页上方的导航栏

##### 	2. Comment: 回答页面下的选项，点赞收藏与评论

##### 	3. editor: 富文本编辑器

##### 	4. Pagination: 分页

##### 	5. questionDes: 

#### 二、路由: 页面跳转的逻辑

#### 三、store: 对于前端页面共享数据的储存以及相关的getters和setters的定义

#### 四、views: 页面的存储

##### 	1. Debug: 用于前端代码的测试

##### 	2. Login: 登录界面

##### 	3. MainPage: 主页

##### 	4. PersonalPage: 个人主页

##### 	5. QuestionDetail: 问题详情页

##### 	6. QuestionEdit: 问题编辑页

##### 	7. Register: 注册界面

##### 	8. searchPage:  搜索结果页面

#### 五、App.vue: 主页面，所有页面的开始

#### 六、main.js: 入口逻辑，初始化Vue、axios、store与相关库的引进

#### 七、插件

##### 	1. Axios: HTTP请求代理，用于向后端发送相关请求，其初始化在main.js里

##### 	2. Vuetify: 前端组件库，相关按钮导航栏等都来自于此

##### 	3. Router: 页面跳转使用的插件

##### 	4. Store: 前端数据的存储与传递

##### 	5. MavonEditor: 

#### 八、函数

##### 	1. Login: 

​	submitForm(): 提交表单同时使用返回数据为相应变量赋值，如auth-string、userinfo等，请求成功后跳转到个人主页。

##### 	2. MainPage: 

​	handleScroll(): 

​	requestQuestion(page_num): 向服务器请求新的问题，page_num 即为当前是第几页，在axios发送请求时要在其中加入headers这个参数，若未登录则会返回登录页面。

​	change_key_word(data): 

##### 	3. PersonalPage: 

​	getQA(): 

​	getUserInfo(): 设置用户信息，用sessionStorage里的userInfo来为相关用户信息赋值。

​	changeToPage(id): 在不同的tab间切换，id即为tab的索引。

##### 	4. QuestionDetail: 

​	requestQuestion(): 请求该问题的详情。

​	requestAnswer(page_num): 

​	nextAnswer(index): 

​	gotoHello(): 

​	handleScroll(): 

##### 	5. Register: 

​	submitForm(): 当验证码匹配时，向后端发送post请求，成功后跳转到登录页面。

​	sendCode(): 点击按钮后向相应邮箱发送验证码。

##### 	6. searchPage:  

​	handleScroll(): 

​	requestQuestion(page_num): 

​	change_key_word(data): 

##### 	7. AppBar: 

​	toMain(): 跳转到主页。

​	toPage(i): 

​	search(): 

##### 	8. Comment: 

​	all(): 库函数。

​	none(): 库函数。

​	thumb_up(): 完成点赞和取消点赞，同时给用户显示“已点赞”或“取消点赞”信息。

​	collection(): 完成收藏和取消收藏，同时给用户显示“已收藏”或“取消收藏”信息。

​	displayComment(): 

##### 	9. editor: 

​	\$imgAdd(pos, \$file): 

​	\$imgDel(pos):

​	changeText(value, render): 

​	submit()

##### 	11. questionDes: 

​	activateReadMore(): 

​	disableReadMore(): 

​	writeAnswer(): 
