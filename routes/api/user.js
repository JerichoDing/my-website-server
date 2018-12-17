const Router = require('koa-router')
const router = new Router()

router.get("/test",index);
  async function index(ctx){ 
   ctx.status = 200;
    ctx.body = {msg:'users works!'}
  }




module.exports = router.routes()