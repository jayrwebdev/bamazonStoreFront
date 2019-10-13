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
    if (error) {
        console.log(error)
    } else {
        connection.query("SELECT item_ID,product_name,department_name,price FROM Products", function (error, results) {
            if (error) {
                console.log(error)
            } else {
                for (var i = 0; i < results.length; i++) {
                    console.log("ID:" + results[i].item_ID + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: " + results[i].price + " | ")
                }

            }
        })
    }
})
inquirer.prompt([
    {
        type: "list",
        message: "Select the ID of the item you want to purchase",
        choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        name: "choose",
    },
    {
        type: "text",
        message: "How many would you like to buy",
        name: "quantity",
    }
]).then(function (response) {

    var choose = response.choose;
    var quantity = response.quantity
    console.log(choose)
    console.log(quantity)
    connection.query("Select stock_quantity FROM Products WHERE item_id = ?", [choose], function (err, results) {
        if (err) {
            console.log(err)
            return
        } else if (results.stock_quantity <= 0) {
            console.log("Pick another item, this item is cyrrently out of stock")
            return
        } else {

        }
    });
});
