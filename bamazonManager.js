const mysql = require('mysql');
const inquirer = require('inquirer')
const connection = mysql.createConnection({
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
]).then(response => {
    let directory = response.directory

    switch (directory) {
        case "View Products for Sale":
            viewProduct()
            break;
        case "View Low Inventory":
            lowInventory()
            break;
        case "Add To Inventory":
            addInventory()
            break;
        case "Add New Product":
            newProduct()
            break;
        default:
    }
})

function viewProduct() {
    connection.query("SELECT * FROM Products",  (err, results) => {
        if (err) {
            console.log(err)
        } else {
            for (let i = 0; i < results.length; i++) {
                console.log("ID:" + results[i].item_ID + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: " + results[i].price + " | Stock: " + results[i].stock_quantity)
            }
        }
        inquirer.prompt([
            {
                type: "list",
                message: "would you like to back to the main menu",
                choices: ["Yes", "No"],
                name: "exit"
            }
        ]).then(data => {
            let exit = data.exit;
            if (exit === "Yes") {
                mainMenu()
            } else {
                return
            }
        })
    })
}
function lowInventory() {
    connection.query("SELECT * FROM Products WHERE stock_quantity <= 100",  (err, results) => {
        if (err) {
            console.log(err)
        } else {
            for (let i = 0; i < results.length; i++) {
                console.log("ID:" + results[i].item_ID + " | Product: " + results[i].product_name + " | Department: " + results[i].department_name + " | Price: " + results[i].price + " | Stock: " + results[i].stock_quantity)
            }
        }
        inquirer.prompt([
            {
                type: "list",
                message: "would you like to back to the main menu",
                choices: ["Yes", "No"],
                name: "exit"
            }
        ]).then(data => {
            let exit = data.exit;
            if (exit === "Yes") {
                mainMenu()
            } else {
                return
            }
        })
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
    ]).then(response => {
        let id = response.id;
        let amount = response.amount
        connection.query("UPDATE Products SET stock_quantity = stock_quantity + ? WHERE item_ID = ?", [amount, id],  (err, results) =>{
            if (err) {
                console.log(err)
            } else {
                console.log("You have updated the inventory of item " + id + "You have succesfully added" + amount + "to the inventory.")
            }
        }).then(()=> {
            
        })
    })
}
function newProduct() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select a department",
            choices: ["Gaming", "Furniture", "Accessories", "Entertainment"],
            name: "department"
        },
        {
            type: "text",
            message: "Enter name of new product",
            name: "product"
        },
        {
            type: "text",
            message: "Enter price",
            name: "price",
        },
        {
            type: "list",
            message: "Select the initial stock amount",
            choices: [25, 50, 75, 100, 125, 150],
            name: "stock"
        }
    ]).then(response => {
        let department = response.department;
        let product = response.product;
        let price = response.price;
        let stock = response.stock;
        connection.query("INSERT INTO Products (product_name,department_name,price,stock_quantity) VALUES(?,?,?,?)", [product, department, price, stock],  (err, results) => {
            if (err) {
                console.log("There was an error", err)
            } else {
                console.log("The product was suceesfully added to the database")
            }
        })
    })
}
function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose a directory",
            choices: ["View Products for Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
            name: "directory"
        }
    ]).then(response => {
        let directory = response.directory
    
        switch (directory) {
            case "View Products for Sale":
                viewProduct()
                break;
            case "View Low Inventory":
                lowInventory()
                break;
            case "Add To Inventory":
                addInventory()
                break;
            case "Add New Product":
                newProduct()
                break;
            default:
        }
    })
}