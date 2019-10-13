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
    var directory = response.directory
   if (directory === "View Products for Sale") {
        viewProduct()
   } else if (directory === "View Low Inventory") {

   } else if (directory === "Add To Inventory") {

   } else if (directory === "Add New Product") {

   }
})

function viewProduct() {
    connection.query("SELECT * FROM Products", function(err,results){
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < results.length; i++) {
                console.log("ID:" + results[i].item_ID + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: " + results[i].price + " | Stock: "+ results[i].stock_quantity)
            }
        }
    })
}