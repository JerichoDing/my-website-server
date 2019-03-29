const jwt = require('jsonwebtoken');

// 创建 token
const createToken = user_id => jwt.sign({ user_id: user_id }, 'Jericho', { expiresIn: '60m' });

// 校验 token
const checkToken = async (ctx, next) => {
  //拿到token
  const authorization = ctx.get('Authorization');
  // console.log(11,ctx)
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization');
  }
  const token = authorization;
  let tokenContent;
  try {
    tokenContent = await jwt.verify(token, 'Jericho'); //如果token过期或验证失败，将抛出错误
  } catch (err) {
    ctx.throw(401, 'invalid token');
  }
  await next();
};

module.exports = {
  createToken,
  checkToken,
};
