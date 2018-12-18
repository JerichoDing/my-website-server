const jwt = require('jsonwebtoken');
module.exports = (user_id)=>{
    const token = jwt.sign({user_id: user_id}, 'Jericho', {expiresIn: '60m'
    });
    return token;
};