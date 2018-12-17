// 引包
const Koa = require('koa')
const json = require('koa-json')
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
// const ejsLint = require('ejs-lint');
// 使用
const router = new KoaRouter()
const app = new Koa()
app.use(json())  // json pretty
// 实际代码
  // 配置模板引擎
  render(app,{
    root:path.join(__dirname,'views'),
    layout:'layout',
    viewExt:'html',
    cache:false,
    debug:false,
    async:true
  })
  // 路由渲染页面
  router.get("/",index)
  async function index(ctx){ 
      await ctx.render('index',{
        title:'I love you',
        hi:'Do you know me?',
        things:things,
      })
    }

  router.get("/add",showAdd)
  async function showAdd(ctx){ 
      await ctx.render('add')
    }

  // DB
  const things = [{name:'111'},{name:'444'},{name:'333'}]


  // router.get("/about",ctx=>{ ctx.body = {abx:'hello router'} })
  // app.use(async ctx=>{ //   ctx.body = {msg:"hello Koa"} // })

//配置路由模块
app.use(router.routes()).use(router.allowedMethods()) //





//监听
const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`port start on ${port}`)
})
