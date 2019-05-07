const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')

const router = require('./router')

app.use(bodyParser())
app.use(cors())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port, () =>
  console.log('The server is running at http://localhost:' + port)
)
