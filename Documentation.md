#### 一、组件:

##### 	1. AppBar: 主页上方的导航栏

##### 	2. Comment: 回答页面下的选项，点赞收藏与评论

##### 	3. editor: 富文本编辑器

##### 	4. Pagination: 分页

##### 	5. questionDes: 问题描述：包含问题标题，问题简介以及写回答编辑回答逻辑，

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

##### 	5. MavonEditor: 富文本编辑器

#### 八、函数

##### 	1. Login: 

​	submitForm(): 提交表单同时使用返回数据为相应变量赋值，如auth-string、userinfo等，请求成功后跳转到个人主页。

##### 	2. MainPage: 

​	handleScroll(): 监听滑轮滚动，当滑轮到达页面底部时向后端请求之后的问题，并将其显示出来。

​	requestQuestion(page_num): 向服务器请求新的问题，page_num 即为当前是第几页，在axios发送请求时要在其中加入headers这个参数，若未登录则会返回登录页面。

​	change_key_word(data): 向后端发送搜索请求。

##### 	3. PersonalPage: 

​	getUserInfo(): 设置用户信息，用sessionStorage里的userInfo来为相关用户信息赋值。

​	changeToPage(id): 在不同的tab间切换，id即为tab的索引。

##### 	4. QuestionDetail: 

​	requestQuestion(): 请求该问题的详情。

​	requestAnswer(page_num): page_num表示当前回答所在分页数，请求当前页面的回答，然后动态刷新，同时初始化新回答的相关属性。

​	nextAnswer(index): 跳转到下一个回答，index为跳转回答的索引，跳转到相应的回答。当目前是最后一个回答时，跳转到底部。

​	nextAnswer(index): 跳转到上一个回答，index为跳转回答的索引，跳转到相应的回答。当目前是第一个回答时，跳转到顶部。

​	handleScroll(): 监听滑轮滚动，当滑轮到达页面底部时向后端请求之后的问题，并将其显示出来。

​	initHeight(): 实现评论栏的吸底效果。当回答高度超过可视区高度时，将评论栏固定到底部。同时添加条件判断防止抖动。

##### 	5. Register: 

​	submitForm(): 当验证码匹配时，向后端发送post请求，成功后跳转到登录页面。

​	sendCode(): 点击按钮后向相应邮箱发送验证码。

##### 	6. searchPage:  

​	handleScroll(): 监听滑轮滚动，当滑轮到达页面底部时向后端请求之后的问题，并将其显示出来。

​	requestQuestion(page_num): page_num表示当前问题所在分页数，请求当前页面的问题，然后动态刷新，同时初始化新问题的相关属性。

​	change_key_word(data): 向后端发送搜索请求。

##### 	7. AppBar: 

​	toMain(): 跳转到主页。

​	toPage(i): 点击头像后跳出菜单按钮的页面跳转。

​	search(): 将搜索关键字的参数传递给父组件。

​	getAvatar(): 帮助函数，从sessionStorage里取出头像的地址。

​	submitQuestion(): 提出问题，编辑问题后的提交逻辑。

##### 	8. Comment: 

​	all(): 库函数。

​	none(): 库函数。

​	thumb_up(): 完成点赞和取消点赞，同时给用户显示“已点赞”或“取消点赞”信息。

​	collection(): 完成收藏和取消收藏，同时给用户显示“已收藏”或“取消收藏”信息。

​	displayComment(): 用两个数据结构存储一级评论与二级评论。

​	replyComment(comment_id, user_name): 回复输入框默认隐藏，点击回复显示评论输入框。

​	submitReply(): 添加评论。获取当前回答id，回复id，以及评论内容，然后以formdata的形式发送给后端，清空评论输入框，调用displayComment()展示最新回复。

##### 	9. editor: 

​	\$imgAdd(pos, \$file): 添加图片。

​	\$imgDel(pos): 删除图片。

​	changeText(value, render): 编辑。

​	submit(): 提交按钮,将目前编辑器的内容提交给后端。

##### 	11. questionDes: 

​	activateReadMore(): 问题简介折叠显示，展开全部按钮逻辑。

​	disableReadMore(): 问题折叠显示，收起按钮逻辑。

​	writeAnswer(): 写回答逻辑，跳转到回答编辑页面。

