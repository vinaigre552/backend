const express = require("express");
const router = express.Router();
const query = require("../sql.js");
const jwt = require("../utils/token.js")
router.get("/", function (req, res, next) {
  res.render("users");
});

router.post("/login", async function (req, res, next) {
  const val = req.body;
  const username = val.username;
  const password = val.password;

  const result = await query("select * from user where username = ?", [
    username,
  ]);
  if (result.length === 0) {
    res.send({
      code: 400,
      err: "用户不存在",
    });
    res.end();
  } else {
    if (result[0].password !== password) {
      res.send({
        code: 400,
        err: "密码错误",
      });
      res.end();
    } else {
      res.send({
        code: 200,
        data: {
          id: result[0].id,
          token: jwt.encrypt({ gadID: result[0].id }, "1d"),
        },
        msg: "登录成功",
      });
      res.end();
    }
  }
});

module.exports = router;
