const Router = require('koa-router');

const { checkToken } = require('./middleware/token');
const UserController = require('./controller/user');

// 父路由
const router = new Router();

// 注册
const registerRouter = new Router();
registerRouter.post('/register', UserController.Reg);

// 登录
const loginRouter = new Router();
loginRouter.post('/login', UserController.Login);

// 获取所有用户
const userRouter = new Router();
userRouter.get('/user', UserController.GetAllUsers);

// 删除某个用户
const delUserRouter = new Router();
delUserRouter.post('/delUser', checkToken, UserController.DelUser);

// 装载上面四个子路由
router.use('/api', registerRouter.routes(), registerRouter.allowedMethods());
router.use('/api', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/api', userRouter.routes(), userRouter.allowedMethods());
router.use('/api', delUserRouter.routes(), delUserRouter.allowedMethods());

module.exports = router;
