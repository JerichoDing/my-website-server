// module.exports = {
//   mongoURI:'mongodb://dingxihu:d.1871341260@ds129454.mlab.com:29454/my-website'
// }

//db.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://dingxihu:d.1871341260@ds129454.mlab.com:29454/my-website',{ useNewUrlParser: true });

// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
let db = mongoose.connection;


db.on('error', function(){
    console.log('数据库连接出错！');
});
db.once('open', function(){
    console.log('数据库连接成功！');
});

//声明schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    password: String,
    token: String,
    create_time: Date
});
// 根据schema生成model
const User = mongoose.model('User', userSchema)

module.exports = {User};