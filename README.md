# bamazonStoreFront

Technologies Used:
_________________________
* Node
* NPM Inquirer
* MySQL

Coding Languages
_________________________
* Javascript

Information
_________________________
* This node application use the node package inquirer to pull the item they wanted by selecting an ID and how many the user would like to buy. Then the application makes a query to the database and selects the information(name,price,department,stock_quantity)from the database where the ID number is located. I used a for loop to go through the results and console.log() the results. Also if the stock quantity <= 0 the program is terminated. If the stock is not empty the item is logged and returns information and total price of the item.
