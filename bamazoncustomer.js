var mysql = require('mysql');
var inquirer = require('inquirer')
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"

})

connection.connect(function (error) {

})

connection.query("SELECT * FROM Products", function (error, results) {
    if (error){
        console.log(error)
    } else {
        console.log(results)
    }
})



