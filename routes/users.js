const router = require('koa-router')()
const userService = require('../controllers/mysqlConfig');
const { resultFormat } = require('../utils')
router.prefix('/users')

//获取所有用户(GET请求)
router.get('/getuserlist', async (ctx, next) => {
	ctx.body = await userService.findUserData(ctx.query);
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
	try {
		await userService.addUserData(ctx.request.body)
		ctx.body = resultFormat(true)
	} catch (err) {
		ctx.body = resultFormat(false)
	}

})

// 修改用户(POST请求)
router.post('/update', async (ctx, next) => {
	try {
		 await userService.updateData(ctx.request.body)
		ctx.body = resultFormat(true)
	} catch (err) {
		ctx.body = resultFormat(false)
	}
})

//删除
router.get('/delete', async (ctx, next) => {
	console.log(ctx.request)
	try {
		 await userService.deleteData(ctx.request.query)
		ctx.body = resultFormat(true)
	} catch (err) {
		ctx.body = resultFormat(false)
		console.log(err)
	}
})



module.exports = router
