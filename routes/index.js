var express = require("express");
var router = express.Router();
var db = require("../sql.js");
/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index");
  res.send('2')
});
router.post("/main", function (req, res, next) {
  const val = req.body;
  const username = val.username;
  const password = val.password;
  db.query(
    "select * from user where username = ? and password = ?",
    [username, password],
    (err, result, fields) => {
      if (err) throw err

      if (result.length > 0) {
        res.render("main")
      } else {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'})
        res.end('登录失败')
      }
    }
  );
});
module.exports = router;
