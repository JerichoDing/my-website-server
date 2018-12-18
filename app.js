const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
//router
const Router = require('koa-router');

//父路由
const router = new Router();

//bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(cors());


//引入数据库操作方法
const UserController = require('./controller/user.js');

//checkToken作为中间件存在
const checkToken = require('./token/checkToken.js');

//登录
const loginRouter = new Router();
loginRouter.post('/login', UserController.Login);
//注册
const registerRouter = new Router();
registerRouter.post('/register', UserController.Reg);

//获取所有用户
const userRouter = new Router();
userRouter.get('/user', UserController.GetAllUsers);
//删除某个用户
const delUserRouter = new Router();
delUserRouter.post('/delUser', checkToken, UserController.DelUser);

//装载上面四个子路由
router.use('/api',loginRouter.routes(),loginRouter.allowedMethods());
router.use('/api',registerRouter.routes(),registerRouter.allowedMethods());
router.use('/api',userRouter.routes(),userRouter.allowedMethods());
router.use('/api',delUserRouter.routes(),delUserRouter.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('The server is running at http://localhost:' + port);
});