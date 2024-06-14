const express = require('express')
const router = express.Router()
const jwt = require('../utils/token')
var query = require('../sql')

router.post('/', async (req, res, next) => {
  const ifValue = jwt.decrypt(req.headers.authorization)
  if (!ifValue.token) {
    res.status(401).json({
      code: 401,
      msg: '登录过期'
    })
    res.end()
  } else {
    const pageInfo = req.body
    const pageNum = pageInfo.pageNum
    const pageSize = pageInfo.pageSize
  
    // 判断数据有效性
    if (parseInt(pageNum) < 1 || isNaN(parseInt(pageNum)) || parseInt(pageSize) < 1 || isNaN(parseInt(pageSize))) {
      res.send('无效的分页参数')
      res.end()
    }
    // 获取查询开始索引
    const startIndex = (parseInt(pageNum) - 1) * parseInt(pageSize)
    const result = await query('select * from schedule limit ?, ?', [startIndex, pageSize])
    const count = await query('select count(*) count from  schedule')
    const pageData = {
      total: count[0].count,
      data: result
    }
    res.send(pageData)
    res.end()
  }
})

module.exports = router