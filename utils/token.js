const jwt = require('jsonwebtoken')

// 设置token
const encrypt = (data, time) => {
  return jwt.sign(data, 'token', {expiresIn: time})
}

// 验证token
const decrypt = (token) => {
  try {
    const data = jwt.verify(token, "token")
    return {
      gadID: data.gadID,
      token: true
    }
  } catch (err) {
    return {
      gadID: err,
      token: false
    }
  }
}

module.exports = {
  encrypt,
  decrypt
}