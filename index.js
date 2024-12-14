const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Function that will add a new item to the cart using the details provided in the query parameters
function addItemToTheCart(productId, name, price, quantity, cart) {
  cart.push({ productId, name, price, quantity });
  return cart;
}

// Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let cartItems = addItemToTheCart(productId, name, price, quantity, cart);
  res.json({ cartItems });
});

function editQuantity(productId, quantity, cart) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

// Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let cartItems = editQuantity(productId, quantity, cart);
  res.json({ cartItems });
});

function deleteCartItemByProductId(product, productId) {
  return product.productId !== productId;
}

// Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let cartItems = cart.filter((product) =>
    deleteCartItemByProductId(product, productId)
  );
  cart = cartItems;
  res.json({ cartItems: cart });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  let cartItems = cart;
  res.json({ cartItems });
});

function calculateTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}

// Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateTotalQuantity(cart);
  res.json({ totalQuantity });
});

function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice = totalPrice + cart[i].quantity * cart[i].price;
  }
  return totalPrice;
}

// Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
