console.clear();

let shopCartArr = [];

// retrieves previous session data from local storage if exists
if (JSON.parse(localStorage.getItem("dj-cartList")) !== null) {
  shopCartArr = JSON.parse(localStorage.getItem("dj-cartList"));
}


//sets up intial totals and quantities
changeAmount();

//creates the cart
initCart(shopCartArr);


class shopItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.quantity = 1;
  }
  keepQuantity(quantity) {
    this.quantity = quantity;
  }
  get Subtotal() {
    return this.quantity * this.price;
  }
}


// event listeners for click on "add to cart" or "remove" and change on specific item quantity
document.addEventListener("click", clickHandler);
document.addEventListener("change", updateValue);


// gets the id for the item once the item quantity is changed and passes it to the update function
function updateValue(e) {
  shopItem.quantity = e.target.value;

  shopCartArr.forEach((x) => {
    if (x.name === e.target.dataset.id) {
      x.quantity = e.target.value;
    }
  });

  updatesubtotal(e.target.dataset.id);
}


// event listener handler, than controls if the click was an add or remove click
function clickHandler(e) {
  const tar = e.target;
  if (tar.matches("button")) {
    if (tar.innerText === "Add to cart") {
      // add to cart is clicked


      addItemCart(tar.dataset.id, tar.dataset.price);
      
    } else if (tar.innerText === "Remove") {
      //remove is clicked
      remove(tar.dataset.id);
    }
  }
}


//helper function to check if item is in the cart
function inCart(name) {
  let state = false;
  shopCartArr.forEach((e) => {
    if (e.name === name) {
      state = true;
    }
  });

  return state;
}


// add a item to the cart if item is not present once "add to cart" is pressed
function addItemCart(id, price) {

  if (!inCart(id)) {
    let temp = new shopItem(id, price);

    createHtml(temp);

    shopCartArr.push(temp);
  } 
  changeAmount();
}


// remove JS element once remove button is clicked
function remove(id) {
  let tempCart = [];
  shopCartArr.forEach((e) => {
    if (e.name !== id) {
      tempCart.push(e);
    }
  });
  shopCartArr = tempCart;

  document.querySelector(`.cartItem[data-id="${id}"]`).remove();
  changeAmount();
}


// dynamically create each JS item
function createHtml(shopItem) {
// create each component of the element and append them to each other to create a completed JS element

  const baseEle = document.querySelector(".details"); 

  let makeDiv = document.createElement("div");
  makeDiv.classList.add("cartItem");
  makeDiv.dataset.id = shopItem.name;

  let makeName = document.createElement("p");
  makeName.innerText = shopItem.name;
  makeDiv.appendChild(makeName);

  let makePrice = document.createElement("p");
  makePrice.innerText = shopItem.price;
  makeDiv.appendChild(makePrice);

  let makeInput = document.createElement("input");
  makeInput.type = "number";
  makeInput.min = "1";
  makeInput.dataset.id = shopItem.name;
  makeInput.value = shopItem.quantity;
  makeDiv.appendChild(makeInput);

  let makeSub = document.createElement("p");
  makeSub.classList.add("Subtotal");
  makeSub.dataset.id = shopItem.name;
  makeSub.innerText = shopItem.price * shopItem.quantity;
  makeDiv.appendChild(makeSub);

  let makeButton = document.createElement("button");
  makeButton.innerText = "Remove";
  makeButton.dataset.id = shopItem.name;
  makeDiv.appendChild(makeButton);

  baseEle.appendChild(makeDiv); // main element
}


//calculates subtotals for each item based on id passed
function updatesubtotal(id) {

  document.getElementById("");
  let tempItem = document.querySelector(`.cartItem[data-id="${id}"]`);
  let tempPrice = 0;

  shopCartArr.forEach((e) => {
    if (e.name === id) {
      tempPrice = e.price;
    }
  });

  tempItem.querySelector(".Subtotal").innerText = tempPrice * shopItem.quantity;

  changeAmount();
}


//iterates through the cart and keep track of quantities and prices, overall total
function changeAmount() {

  let numItems = 0; 
  let totalBal = 0;

  shopCartArr.forEach((e) => {
    numItems += parseFloat(e.quantity);
    totalBal += parseFloat(e.quantity) * parseFloat(e.price);
  });

  document.querySelector(
    ".totalItems"
  ).innerText = `${numItems} item(s) in your cart`;
  document.querySelector(".total").innerText = `Total: ${totalBal}`;
  saveCart();
}


// turns cart in to a json and saves it to local storage
function saveCart() {

  let localCart = JSON.stringify(shopCartArr);
  localStorage.setItem("dj-cartList", localCart);
}


// initates cart by passing local storage
function initCart(arr) {

  arr.forEach((e) => {
    createHtml(e);
    console.log(e.name);
  });
}
