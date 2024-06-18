const express = require('express')
const router = express.Router()
const isExpire = require('../utils/common')
const query = require('../sql')
const moment = require('moment')
// 获取日程列表
router.post('/', async (req, res, next) => {
  if (!isExpire(req, res)) {
    const pageInfo = req.body
    const {pageNum, pageSize} = pageInfo
  
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
      data: {
        data: result,
        total: count[0].count
      }
    }
    res.send(pageData)
    res.end()
  }
})

// 添加新日程信息
router.post('/info', async(req, res, next) => {
  if (!isExpire(req, res)) {
    const schedule = req.body
    let {name, start_time, end_time, remark, status} = schedule
    start_time = moment(start_time).format('YYYY-MM-DD HH:DD:MM')
    end_time = moment(end_time).format('YYYY-MM-DD HH:DD:MM')

    const result = await query('insert into schedule(name, start_time, end_time, remark, status) values(?, ?, ?, ?, ?)', [name, start_time, end_time, remark, status])
    
    if (result) {
      res.send({
        code: 200,
        data: '',
        msg: '添加成功'
      })
      res.end()
    } else {
      res.send({
        code: 300,
        data: '',
        msg: '发生错误'
      })
      res.end()
    }
  } 
})

// 更新日程信息
router.post('/info/update', async(req, res, next) => {
  if (!isExpire(req, res)) {
    const schedule = req.body
    let {id, name, start_time, end_time, remark, status} = schedule
    start_time = moment(start_time).format('YYYY-MM-DD HH:DD:MM')
    end_time = moment(end_time).format('YYYY-MM-DD HH:DD:MM')

    const result = await query('update schedule set name=?, start_time=?, end_time=? , remark=?, status=? where id = ?', [name, start_time, end_time, remark, status, id])

    if (result) {
      res.send({
        code: 200,
        msg: '更新成功'
      })
      res.end()
    } else {
      res.send({
        code: 300,
        err: '未知错误'
      })
      res.end()
    }
  }
}) 
// 查看单个日程
router.post('/info/:id', async(req, res, next) => {
  if (!isExpire(req, res)) {
    const id = req.params.id

    const result = await query('select * from schedule where id = ?', [id])

    if (result.length !== 0) {
      res.send({
        code: 200,
        data: result[0],
        msg: '成功'
      })
      res.end()
    } else {
      res.send({
        code: 300,
        err: '未找到对应日程'
      })
      res.end()
    }
  }
})

module.exports = router