const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '212liu',
  database: 'cms'
})

db.connect()

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = query
