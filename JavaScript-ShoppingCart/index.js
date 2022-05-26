console.clear();
let shopCartArr = [];
//localStorage.removeItem("dj-cartList");
if (JSON.parse(localStorage.getItem("dj-cartList")) !== null) {
  shopCartArr = JSON.parse(localStorage.getItem("dj-cartList"));
}

changeAmount();
//console.log("test complete");
initCart(shopCartArr);
//console.log("test");
//console.log(shopCartArr);

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

document.addEventListener("click", clickHandler);
document.addEventListener("change", updateValue);

function updateValue(e) {
  shopItem.quantity = e.target.value;

  shopCartArr.forEach((x) => {
    if (x.name === e.target.dataset.id) {
      x.quantity = e.target.value;
    }
  });

  updatesubtotal(e.target.dataset.id);
}

function clickHandler(e) {
  const tar = e.target;
  if (tar.matches("button")) {
    if (tar.innerText === "Add to cart") {
      //console.log(tar.dataset.id);
      addItemCart(tar.dataset.id, tar.dataset.price);
      // add
    } else if (tar.innerText === "Remove") {
      //remove
      remove(tar.dataset.id);
    }
  }
}

function inCart(name) {
  let state = false;
  shopCartArr.forEach((e) => {
    if (e.name === name) {
      state = true;
    }
  });

  return state;
}

function addItemCart(id, price) {
  if (!inCart(id)) {
    let temp = new shopItem(id, price);

    createHtml(temp);

    shopCartArr.push(temp);
  } else {
    // make add for add cart
  }
  changeAmount();
}

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

function createHtml(shopItem) {
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

  baseEle.appendChild(makeDiv);
}

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

function changeAmount() {
  let numItems = 0; //works
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

function saveCart() {
  /// push to local storage

  let localCart = JSON.stringify(shopCartArr);
  //console.log(localCart);
  localStorage.setItem("dj-cartList", localCart);
}

function initCart(arr) {
  arr.forEach((e) => {
    createHtml(e);
    console.log(e.name);

    //let tempItem = document.querySelector(`.cartItem[data-id="${e.name}"]`);

    //tempItem.input.setAttribute("value", parseInt(e.quantity, 0));

    //console.log(parseInt(e.quantity));
    //console.log(tempItem);
  });
}
