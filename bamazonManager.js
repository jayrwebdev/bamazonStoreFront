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
        choices: ["View Products for Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
        name: "directory"
    }

]).then(function (response) {
    var directory = response.directory
    if (directory === "View Products for Sale") {
        viewProduct()
    } else if (directory === "View Low Inventory") {
        lowInventory()
    } else if (directory === "Add To Inventory") {
        addInventory()
    } else if (directory === "Add New Product") {

    }
})

function viewProduct() {
    connection.query("SELECT * FROM Products", function (err, results) {
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < results.length; i++) {
                console.log("ID:" + results[i].item_ID + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: " + results[i].price + " | Stock: " + results[i].stock_quantity)
            }
        }
    })
}
function lowInventory() {
    connection.query("SELECT * FROM Products WHERE stock_quantity <= 100", function (err, results) {
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < results.length; i++) {
                console.log("ID:" + results[i].item_ID + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: " + results[i].price + " | Stock: " + results[i].stock_quantity)
            }
        }
    })
}
function addInventory() {
    inquirer.prompt([
        {
            type: "list",
            message: "Pick an item to update",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            name: "id"
        },
        {
            type: "list",
            message: "Add amount to inventory",
            choices: [25, 50, 75, 100, 125, 150],
            name: "amount"
        }
    ]).then(function (response) {
        var id = response.id;
        var amount = response.amount
        connection.query("UPDATE Products SET stock_quantity = stock_quantity + ? WHERE item_ID = ?", [amount, id], function (err, results) {
            if (err) {
                console.log(err)
            } else {
                console.log("You have updated the inventory of item " + id)
            }
        })
    })
}