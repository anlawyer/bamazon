var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

var productIDs = [];

var start = function () {
  console.log('\nHere are all products in the store:\n');
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + ' | ' + res[i].product_name + ' | ' +
        res[i].department_name + ' | $' + res[i].price);
      var idString = res[i].item_id.toString();
      productIDs.push(idString);
    }
    productToBuy();
  });
};

var productToBuy = function () {
  inquirer.prompt([
    {
      name: 'item',
      message: 'Which prodcut would you like to buy?',
      type: 'list',
      choices: productIDs
    },
    {
      name: 'quantity',
      type: 'input',
      message: 'How many would you like?'
    }
  ]).then(function (answers) {
    completePurchase(answers.item, answers.quantity);
  });
};

var completePurchase = function (item, amount) {
  connection.query(
    'SELECT * FROM products WHERE ?',
    {
      item_id: item
    },
    function (err, res) {
      if (err) throw err;

      var purchaseAmount = res[0].price * amount;

      if (amount > res[0].stock_quantity) {
        console.log('Sorry, there is not enough stock to complete your purchase.');
        console.log('Please choose another item.');
        productToBuy();
      } else {
        var newStock = res[0].stock_quantity - amount;
        connection.query('UPDATE products SET ? WHERE ?',
          [
            {
              stock_quantity: newStock
            },
            {
              item_id: item
            }
          ],
          function (err, res) {
            if (err) throw err;
            console.log('Thanks for your purchase!');
            console.log('Your total is: $' + purchaseAmount);
            connection.end();
          }
        );
      }
    }
  );
};
