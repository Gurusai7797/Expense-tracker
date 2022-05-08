// const balance = document.getElementById('balance');
// const money_plus = document.getElementById('money-plus');
// const money_minus = document.getElementById('money-minus');
// const list = document.getElementById('list');
// const form = document.getElementById('form');
// const text = document.getElementById('text');
// const amount = document.getElementById('amount');

// // const dummyTransactions = [
// //   { id: 1, text: 'Flower', amount: -20 },
// //   { id: 2, text: 'Salary', amount: 300 },
// //   { id: 3, text: 'Book', amount: -10 },
// //   { id: 4, text: 'Camera', amount: -150 },
// // ];

// // let transactions = dummyTransactions;

// // Add transactions to DOM list

// function addTransactionDOM(e) {
//   e.preventDefault();
//   // Get sign
//   const sign = amount.value < 0 ? '-' : '+';

//   const item = document.createElement('li');

//   // Add class based on value
//   item.classList.add(amount.value < 0 ? 'minus' : 'plus');

//   item.innerHTML = `
//     ${text.value} <span>${sign}${Math.abs(
//     amount.value
//   )}</span> <button class="delete-btn">x</button>
//   `;

//   list.appendChild(item);
// }

// // // Init app
// // function init() {
// //   list.innerHTML = '';

// //   transactions.forEach(addTransactionDOM);
// // }

// // init();

// // function updateLi(e) {
// //   e.preventDefault();
// //   // console.log(text.value);
// //   // console.log(amount.value);

// // }

// form.addEventListener('submit', addTransactionDOM);

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: -150 },
// ];
// let transactions = dummyTransactions;

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
vgg;
// Add Transaction

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('please add a text & amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate Id

function generateId() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income  & expense

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed();

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();
  init();
}

// Update local storage transaction

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
