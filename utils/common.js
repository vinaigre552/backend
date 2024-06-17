const jwt = require("../utils/token.js")

const isExpire = (req, res) => {
  const ifValue = jwt.decrypt(req.headers.authorization)
  if (!ifValue.token) {
    res.status(401).json({
      code: 401,
      msg: '登录过期'
    })
    res.end()
    return true
  } else {
    return false
  }
}

module.exports = isExpire