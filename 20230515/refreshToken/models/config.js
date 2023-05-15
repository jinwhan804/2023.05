const mysql2 = require('mysql2/promise');

const mysql = mysql2.createPool({
    user:"root",
    password:"kjw204024!@$",
    database:"test4",
    multipleStatements:true
})

module.exports = mysql;