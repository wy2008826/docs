const prefix = '/api'

module.exports = {
	example: `${prefix}/example`, //样表
	getVersion: `${prefix}/system/findCurrentSystem`, //获取系统版本信息
	// getContactNumber:`${prefix}/client/system/getContactNumber`,//获取公司联系方式

	//公共部分
	commonAPI: {
		getImageCode: `${prefix}/customer/getImageCode`, //图形验证码
		getPhoneMsgCode: `${prefix}/customer/getVerificationCode`, //根据手机号和图形码获取短信码
		validateImgAndMsg: `${prefix}/customer/forgetPassword` //验证图形码、短信码
	},

	//登录相关
	getLoginToken: `${prefix}/login/getClientToken`, //登陆token
	login: `${prefix}/login`, //登录
	loginOut: `${prefix}/login/logout`, //退出登录
	changePass: `${prefix}/customer/changPersonPass`, //更改密码
	resetPass: `${prefix}/customer/resetPassword`, //重置密码
	changePhoneValidatePwd: `${prefix}/customer/verifyPassword`, //更换手机号密码确认
	changePhone: `${prefix}/customer/customerPhone`, //更换手机号
	findByMobile: `${prefix}/customer/findByMobile`, //通过手机号查询客户
	findCurrentCus: `${prefix}/customer/findCurrentCus`, //查询当前客户的信息
	updateCurrentCus: `${prefix}/customer/update`, //更新客户信息
	modifyPersonInfo: `${prefix}/customer/modifyPersonInfo`, //修改性别

	//钉钉登录校验
	getDingConfig: `${prefix}/login/getDingConfig`, //获取钉钉配置参数
	// validateDDLogin:`${prefix}/client/login/validateLogin`,//钉钉免密登陆校验接口
	getLatestDeliveryTime: `${prefix}/getLatestDeliveryTime`, //获取当前店铺的最近送货日期

	// 三方数据关联
	clearBindDingDing: `${prefix}/thrbind/custom/clearDing`, //客户端解绑钉钉
	bindDingDing: `${prefix}/thrbind/custom/dingBind`, // 客户端绑定钉钉

	//获取店铺和模板列表
	getShops: `${prefix}/shop/findCurrentUserShops`, //获取当前用户拥有的店铺列表
	getTemplates: `${prefix}/recommend/findByShop`, //获取当前店铺所拥有的订单模板列表

	updateCustomerAuth: `${prefix}/assembly/updateCustomerAuth`, //更新店铺的用户权限配置

	//购买流程
	checkCart: `${prefix}/order/checkCart`, //判断该订单模板是否可以订货
	getTemplateGoods: `${prefix}/products/findProductsWhatShopAvailable`, //获取推荐商品 加isRecommend=true 以及 isPage=false字段   该接口和查询所有商品的接口地址一致
	updateCartProductAmount: `${prefix}/shoppingCart/updateCartProductAmount`, //更新购物车商品数量接口

	//所有商品页面
	getGoodClassifyLists: `${prefix}/productClassify/getProductsClassifyList`, //获取商品分类列表
	getAllGoodsCanBuy: `${prefix}/products/findProductsWhatShopAvailable`, //获取所有的商品列表
	getGoodDetail: `${prefix}/products/view`, //获取商品详情
	getGoodRelate: `${prefix}/products/findRelatedProducts`, //获取商品详情
	getProductPreTimeSaleDetail: `${prefix}/productPreSellLimit/findProductPreSellLimitUnderShop`, //获取商品预售截至时间详情

	recentSearchRecord: `${prefix}/queryLog/getQueryLog`, //获取最近的搜索记录
	clearSearhRecord: `${prefix}/queryLog/deleteQueryLog`, //清除最近的搜索记录
	updateSearchHistory: `${prefix}/queryLog/addQueryLog`, //更新商品搜索历史记录

	isCollection: `${prefix}/productCollect/detail`, //是否已经收藏
	addCollection: `${prefix}/productCollect/add`, //添加到收藏
	removeCollection: `${prefix}/productCollect/delete`, //取消收藏

	loadRecommendTempToShoppingCart: `${prefix}/shoppingCart/loadRecommendTempToShoppingCart`, //加载推荐模板商品数据到购物车

	findCartProductNum: `${prefix}/shoppingCart/findCartProductNum`, //获取购物车中某个商品的数量

	//商品首页
	getBannerLink: `${prefix}/banner/findPicture`, //获取banner图片
	getNewGoodsAndHotGoods: `${prefix}/products/findProductsWhatShopAvailable`, //获取新品上架列表和热销商品
	getMyCollection: `${prefix}/homePage/findProductCollection`, //获取我的收藏
	getRecentOrder: `${prefix}/homePage/recentOrder`, //获取最近订购
	getHotGoods: `${prefix}/products/findProductsWithHotWhatShopAvailable`, //查询热门商品
	addClickNum: `${prefix}/banner/recordAddNumber`, //增加点击次数
	getRecommendGoods: `${prefix}/products/findRecommendRelatedProduct`, //急速下单模板商品
	getLimitTimePreSale: `${prefix}/getLimitTimePreSale`, //获取预售的商品列表

	//消息通知
	findCurrentUserNotReadNotices: `${prefix}/notice/findCurrentUserNotReadNotices`, //查询当前用户未读取的消息列表
	updateNoticeRead: `${prefix}/notice/signNoticeRead`, //更新除订单消息以外的信息的读取状态
	getNoticeReadStatus: `${prefix}/notice/findCurrentUserHasNotReadNotices`, //获取用户的消息读取状态
	findAllNotice: `${prefix}/noticeClassify/getNoticeClassifyListWithIsRead`, //获取所有公告(一级菜单)
	findNoticeByPage: `${prefix}/notice/findByPage`, //查询除订单消息以外的分页数据(二级菜单)
	findNoticeById: `${prefix}/notice/detail`, //查询除订单消息以外的单条通知消息
	findMessage: `${prefix}/orderSendMessage/findWithUserRead`, //查询订单消息列表
	findHasteMessage: `${prefix}/orderReminder/findOrderReminder`, //查询催单消息列表
	findHasteDetail: `${prefix}/orderReminder/orderReminderDetail`, //查询催单消息详情
	findMessageDetail: `${prefix}/orderSendMessage/detail`, //查询订单消息详情
	updateMessage: `${prefix}/orderSendMessage/signOrderSendMessageRead`, //更新订单消息的读取状态

	//购物车相关
	getCartAmount: `${prefix}/shoppingCart/findCartProductAmount`, //获取购物车商品数量
	getOrderCart: `${prefix}/shoppingCart/find`, //获取购物车数据
	deleteCartProducts: `${prefix}/shoppingCart/clearCartAppointProduct`, //删除购物车中的商品

	queryReceiveAddress: `${prefix}/shop/getRecipientShop`, //查询当前店铺的可用收货地址
	orderSubmit: `${prefix}/order/orderSubmit`, //提交订单

	//订单列表及相关
	getOrderNavs: `${prefix}/order/getOrderFlowList`, //获取订单列表nav
	findUserOrderByPage: `${prefix}/order/findUserOrderByPage`, //获取订单列表
	queryOrderDetail: `${prefix}/order/detail`, //根据id获取订单详情
	revokeOrder: `${prefix}/order/revokeOrder`, //撤销订单
	findLogisticsUnderShopAfterTime: `${prefix}/arrangement/findLogisticsUnderShopAfterTime`, //获取当前订单的配送信息
	buyAgainOrder: `${prefix}/order/againToBuy`, //再次购买订单中的商品

	getArrangement: `${prefix}/arrangement/findByShop`, //送货安排

	logisticsType: `${prefix}/line/logisticsType`, //配送类型
	getDeliveryDate: `${prefix}/arrangement/findLineByToDay`, //配送安排
	getShopLine: `${prefix}/line/findProductsWhatShopAvailable`, //店铺所属路线

	//收货地址相关
	getDeliveryAddress: `${prefix}/receivingInfo/findByShop`, //收货地址列表
	deleteDeliveryAddress: `${prefix}/receivingInfo/delete`, //删除收货地址
	addDeliveryAddress: `${prefix}/receivingInfo/add`, //新增收货地址
	updateDeliveryAddress: `${prefix}/receivingInfo/update`, //编辑收货地址
	detailDeliveryAddress: `${prefix}/receivingInfo/view`, //查看收货地址详情

	//店铺详情
	shopDetail: `${prefix}/shop/detail`, //店铺详情
	userDetail: `${prefix}/user/getCurrentUser`, //用户详情

	//账号管理
	accountList: `${prefix}/customer/findCustomerUnderShop`, //该商铺下的账号列表
	accountDetail: `${prefix}/customer/detail`, //账号详情
	getLimitTemplate: `${prefix}/menu/findCurrentSystemMenuTree`, //获取权限模板
	getRoleTemplate: `${prefix}/customer/role/findAll`, //获取角色模板
	addAccount: `${prefix}/customer/add`, //新增账号
	delAccount: `${prefix}/customer/clearRelation`, //删除账号
	updateAccount: `${prefix}/customer/update`, //更新账号

	//意见反馈
	feedbackImg: `${prefix}/feedBack/feedBackPictureUpload`, //意见反馈图片上传
	feedBackSubmit: `${prefix}/feedBack/feedBackSubmit`, //意见反馈提交

	//学院相关
	addNum: `${prefix}/progess/addNumber`, //增加点击数
	getQuestionDirectory: `${prefix}/progess/view`, //顶级目录及进度
	getSecondaryDirectory: `${prefix}/progess/skip`, //获取二级目录
	getQuestion: `${prefix}/progess/brushing`, //得到题目
	getProgress: `${prefix}/progess/answerSituation`, //查看进度
	submitAnswer: `${prefix}/progess/add`, //提交答案
	getExamPaper: `${prefix}/exam/createExamPaper`, //获取试卷
	getExamResult: `${prefix}/exam/saveAndLook`, //保存后进行查看试卷
	getQuestionDetail: `${prefix}/progess/stickQuestion`, //获取问题详情
	last: `${prefix}/progess/last`, //上一题
	next: `${prefix}/progess/next`, //下一题

	//在线考试
	getExamEntryLists: `${prefix}/test/find`, //获取考试列表入口
	getOnlineExamDetail: `${prefix}/test/view`, //进入考试 查询试卷
	onlineExamSubmit: `${prefix}/test/submit`, //在线考试提交试卷
	getOnlineExamResultDetail: `${prefix}/test/viewReportCard`, //在线考试结果

	//banner权限查询
	joinAccount: `${prefix}/assistAuth/joinAccount`, //账号管理权限
	joinOrder: `${prefix}/assistAuth/joinOrderProduct`, //订货管理权限

	getMenuTree: `${prefix}/menu/findUserMenuAuthTree`, //权限树

	// 巡店报告
	getPatrolList: `${prefix}/report/getReportList`, //获取巡店报告单列表
	getReportDetail: `${prefix}/report/getReportDetail`, //查看报告单详情

	// 帮助中心
	helpFindVideoByPage: `${prefix}/help/helpFindVideoByPage`, //分页查询视频设置中心
	helpDetailVideo: `${prefix}/help/helpDetailVideo`, //查看详细的视频设置
	helpFindProblemByPage: `${prefix}/help/helpFindProblemByPage`, //分页常见问题设置中心
	helpDetailProblem: `${prefix}/help/helpDetailProblem`, //查看详细的常见问题
	helpFindManualByPage: `${prefix}/help/helpManualByPage`, //分页查询用户手册设置中心
	helpDetailManual: `${prefix}/help/helpDetailManual`, //查看详细的用户手册设置

	//活动中心
	findActivityByPage: `${prefix}/activity/findByPage`, //分页查询
	activityApply: `${prefix}/activity/activityApply`, //活动报名
	viewActivity: `${prefix}/activity/view`, //查询单个
	findHaveApplyActivity: `${prefix}/activity/findHaveApplyActivity`, //查询已经报名的活动
	cancelApply: `${prefix}/activity/cancelApply`, //取消活动报名
	findLatest: `${prefix}/activity/findLatest`, //C端查询最近的活动
	uploadImg: `${prefix}/feedBack/feedBackPictureUpload`, //活动模块图片上传

	//商品借用
	canBorrowGoodLists: `${prefix}/broGood/find`, //可借用商品列表
	canBorrowGoodDetail: `${prefix}/broGood/detail`, //可借用商品详情
	canBorrowGoodAdd: `${prefix}/broGoodRecord/add`, //新增借用
	borrowGoodRecordLists: `${prefix}/broGoodRecord/find`, //借用商品记录列表
	borrowGoodRecordDetail: `${prefix}/broGoodRecord/detail`, //借用商品记录详情

	// 学习资料
	learnType: `${prefix}/learningMaterials/menu`,
	recommendLearn: `${prefix}/learningMaterials/find`,
	viewLearnDetail:`${prefix}/learningMaterials/view`,//查看单个学习资料
	lowMenu: `${prefix}/learningMaterials/lowestMenu`,
	searchLearn: `${prefix}/learningMaterials/classifyMaterials`, // 分类下的各个分类数据
	searchLearnHistoryAdd: `${prefix}/academeLog/add`, // 分类下的各个分类数据
	searchLearnHistoryDel: `${prefix}/academeLog/delete`, // 分类下的各个分类数据
	searchLearnHistoryQuery: `${prefix}/academeLog/query`, // 分类下的各个分类数据
	searchLearnHistoryList: `${prefix}/academeLog/find`, // 分类下的各个分类数据
}
