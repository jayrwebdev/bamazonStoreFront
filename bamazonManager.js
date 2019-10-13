var mysql = require('mysql');
var inquirer = require('inquirer')
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"

})

inquirer.prompt([
    {
        type: "list",
        message: "Choose a directory",
        choices: ["View Products for Sale","View Low Inventory","Add To Inventory","Add New Product"],
        name: "directory"
    }

]).then(function(response){
   console.log(response.directory)
})