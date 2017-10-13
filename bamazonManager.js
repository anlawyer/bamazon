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

var start = function () {
  inquirer.prompt([
    {
      name: 'option',
      message: 'What would you like to do?',
      type: 'list',
      choices: ['View Products for Sale', 'View Low Inventory',
        'Add to Inventory', 'Add New Product', 'Exit']
    }
  ]).then(function (answers) {
    if (answers.option === 'View Products for Sale') {
      viewAllProducts();
    } else if (answers.option === 'View Low Inventory') {
      viewLowInv();
    } else if (answers.option === 'Add to Inventory') {
      addToInv();
    } else if (answers.option === 'Add New Product') {
      addNewProduct();
    } else {
      connection.end();
    }
  });
};

var viewAllProducts = function () {
  console.log('\nHere are all products in the store:\n');
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + ' | ' + res[i].product_name + ' | ' +
        res[i].department_name + ' | $' + res[i].price);
    }
    console.log('\nWhat would you like to do next?\n');
    start();
  });
};

var viewLowInv = function () {
  console.log('\nHere are all products with less than 5 items in inventory:\n');
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 5) {
        console.log(res[i].item_id + ': Low quantity: ' + res[i].stock_quantity);
      } else {
        console.log(res[i].item_id + ': This product is well stocked.');
      }
    }
    console.log('\nWhat would you like to do next?\n');
    start();
  });
};

var addToInv = function () {
  var productNames = [];
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      productNames.push(res[i].product_name);
    }

    inquirer.prompt([
      {
        name: 'productChoice',
        message: 'What product would you like to update?',
        type: 'list',
        choices: productNames
      }, {
        name: 'quantity',
        message: 'How many would you like to add to the stock?',
        type: 'input'
      }
    ]).then(function (answers) {
      connection.query('UPDATE products SET ? WHERE ?',
        [{
          stock_quantity: answers.quantity
        }, {
          product_name: answers.productChoice
        }],
        function (err, res) {
          if (err) throw err;
          console.log(answers.productChoice + ' has been updated.');
        });
      console.log('\nWhat would you like to do next?\n');
      start();
    });
  });
};

var addNewProduct = function () {
  inquirer.prompt([
    {
      name: 'newProdName',
      message: 'What product would you like to input?',
      type: 'input'
    }, {
      name: 'newProdPrice',
      message: 'How much does each product cost?',
      type: 'input'
    }, {
      name: 'newProdDep',
      message: 'What department is the product in?',
      type: 'input'
    }, {
      name: 'newProdQuant',
      message: 'How many would you like to add to the stock?',
      type: 'input'
    }
  ]).then(function (answers) {
    connection.query('INSERT INTO products SET ?',
      [{
        product_name: answers.newProdName,
        price: parseFloat(answers.newProdPrice),
        department_name: answers.newProdDep,
        stock_quantity: parseInt(answers.newProdQuant)
      }],
      function (err, res) {
        if (err) throw err;
        console.log(answers.newProdName);
        console.log(parseFloat(answers.newProdPrice));
        console.log(answers.newProdDep);
        console.log(parseInt(answers.newProdQuant));
        console.log('New product has been added with ID: ' + res.insertId);
        console.log('\nWhat would you like to do next?\n');
        start();
      });
  });
};
