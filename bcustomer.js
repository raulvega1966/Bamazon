/*References used for this Homework: greatBayBasics and topSongCode*/

/* Declaring variables - require mysql and inquirer.
Also, cli-table is for creating a table.
Then, I create connection to localhost.
*/

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table")



/* Your password - this is the connection to the database*/
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,


    // Your username, password and database
    user: "root",
    password: "mysql82011",
    database: "bamazon_db"
});


/*Establish connection, throw error if it does not work*/
connection.connect(function(err) {
    if (err) throw err;
    console.log("You are connected " + connection.threadId);
    inventory();
});

//This is a table so that the data (product, price, etc) from mysql is placed
var productsAvailable = [];
var table = new Table({
    head: ['Item', 'Product', 'Price'],
    colAligns: ['center', 'center', 'center']
});

/*
Table.push(
    ['Item', 'Product', 'Price'], ['Item[0]', 'Product[0]', 'Price[0]']
);
*/

//console.log(table.toString());

var inventory = function() {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM bamazonitems", function(err, res) {
        //var query = "SELECT item_id, product_name, department_name, price, stock_quanity FROM bamazonitems";
        if (err) throw err;
        console.log("Welcome to Bamazon.com, a very cool shopping site.");
        console.log("Please look at our wonderful selection of items.");
        //console.log("Please enter ID of item that you would like to buy.");

        //This is a loop for all items in mysql database and it pushes the data into a new 
        //row in the table that is detailed above

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price.toFixed(2), res[i].stock_quantity])

            if (res[i].stock_quantity < 1) {
                res[i].stock_quantity = "Item Out of Stock";
                //console.log("Item selected is out of stock.  Please select a different item");
            }

        }

        console.log(table.toString());
        shopping();

    });
};


function shopping() {
    inquirer.prompt([{
        name: "item_id",
        type: "input",
        message: "Please enter ID of item that you would like to buy.",

        /*Validate input from user.  This is from npm inquirer website (thanks to Jorge Wong for providing tip on using this function).  greatbaybasic reference code uses validate but,
        it only returns a false.  Using npm inquirer instructions, we can present the user with a response "You need to provide a number" which, we have changed to sound more polite.
        
        validate: (Function) Receive the user input and should return true if the value is valid, and an error message 
        (String) otherwise. If false is returned, a default error message is provided.
         */

        //Legacy way: with this.async//
        validate: function(input) {
            // Declare function as asynchronous, and save the done callback
            var done = this.async();
            // Do async stuff
            setTimeout(function() {
                // checking if user input for item_id is found in availableItems item_id array
                if (typeof input !== 'number') {
                    // Pass the return value in the done callback
                    done('Please enter a valid product id number.');
                    return;
                }
                done(null, true);
            }, 3000);
        }
},
{
        name: 'item_quantity',
        type: "input",
        message: "How many items would you like to purchase?",
        // This function validates the input from customer (same as above)
        validate: function(input) {
            var done = this.async();
            // Do async stuff
            setTimeout(function() {
                // checking if input from user is a valid number
                if (isNaN(input) || input < 0) {
                    done('Please enter a valid product quantity');
                    return;
                }
                done(null, true);
            }, 3000);
        }
}
    ]).then(function(answer) {
    	confirmInventory(answer.item_id, answer.stock_quantity);
    });
}


function confirmInventory(item_id, stock_quantity) {
var query = "SELECT item_id, stock_quantity FROM bamazonitems WHERE ?";
connection.query(query, [item_id.start, item_id.end], function(err, res) {

//This is a check to see if quantity of items selected is less than the quantity of items in stock (so user can purchase)
if (res[0].stock_quantity < parseInt(item_quantity)) {
	console.log("We do not have enough items on stock.");
	connection.end();
}

if (res[0].stock_quanity > parseInt(item_quantity)) {
console.log("");
console.log("You have selected item number: " + res[0].item_id);
console.log("This item is: " + res[0].product_name);
console.log("This item is from the " + res[0].department_name + "department");
console.log("The quantity you have selected is: " + item_quantity);
console.log("The price of the item selected is $ " + res[0].price);
console.log("The tocal cost of your purchase is $ " + res[0].price * item_quantity);
console.log("Bamazon appreciates your order.  Have a nice day");
console.log("");

}
});
    }