const moment = require('moment')
// const objectIdToTimestamp = require('objectid-to-timestamp')
const { User } = require('../config/db')
const { createToken } = require('../middleware/token')

// 用于密码加密
// const sha1 = require('sha1');

// 数据库的操作
// 根据用户名查找用户
const findUser = username => {
  console.log(11, username)
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
// 找到所有用户
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

// 注册
const Reg = async ctx => {
  // console.log(233,ctx.request.body)
  const user = new User({
    username: ctx.request.body.email,
    password: ctx.request.body.password, // 加密
    token: createToken(this.username), // 创建token并存入数据库
    create_time: moment().format('x'), // 用户创建时间
  })
  // 将objectid转换为用户创建时间(可以不用)
  // const timeID = moment().format('x')
  // console.log(233,timeID)
  // user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');

  const doc = await findUser(user.username)
  if (doc) {
    console.log('用户名已经存在')
    ctx.status = 200
    ctx.body = {
      success: false,
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save(err => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    console.log('注册成功')
    ctx.status = 200
    ctx.body = {
      success: true,
    }
  }
}

// 登录
const Login = async ctx => {
  // 拿到账号和密码
  const username = ctx.request.body.email
  const { password } = ctx.request.body // 解密
  const doc = await findUser(username)
  if (!doc) {
    console.log('检查到用户名不存在')
    ctx.status = 200
    ctx.body = {
      info: false,
    }
  } else if (doc.password === password) {
    console.log('密码一致!')

    // 生成一个新的token,并存到数据库
    const token = createToken(username)
    console.log(token)
    doc.token = token
    await new Promise((resolve, reject) => {
      doc.save(err => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      username,
      token, // 登录成功要创建一个新的token,应该存入数据库
      create_time: doc.create_time,
    }
  } else {
    console.log('密码错误!')
    ctx.status = 200
    ctx.body = {
      success: false,
    }
  }
}

// 获得所有用户信息
const GetAllUsers = async ctx => {
  // 查询所有用户信息
  const doc = await findAllUsers()
  ctx.status = 200
  ctx.body = {
    success: '成功',
    result: doc,
  }
}

// 删除某个用户
const DelUser = async ctx => {
  // 拿到要删除的用户id
  const { id } = ctx.request.body
  await new Promise((resolve, reject) => {
    User.findOneAndRemove({ _id: id }, err => {
      if (err) {
        reject(err)
      }
      console.log('删除用户成功')
      resolve()
    })
  })
  ctx.status = 200
  ctx.body = {
    success: '删除成功',
  }
}

module.exports = {
  Reg,
  Login,
  GetAllUsers,
  DelUser,
}
