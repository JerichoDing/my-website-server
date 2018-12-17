const Router = require('koa-router')
const router = new Router()


router.get("/test",async (ctx)=>{ 
  ctx.status = 200;
   ctx.body = {msg:'users works!'}
});
  
// 注册接口
router.post("/register",async (ctx)=>{ 
  ctx.status = 200;
  console.log(ctx.request.body)
  // ctx.body = {msg:'users works!'}
})



module.exports = router.routes()