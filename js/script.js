// define UI elements

let form = document.querySelector("#cart_form");
let shoppinCart = document.querySelector('#shopping_cart');
let code = document.querySelector("#code");


// Shopping Product Class 

class Product {
    constructor(title, code, color, price, quantity, total){
        this.title = title;
        this.code = code;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
        this.total = total;

    }

}

// Add to cart UI class

class Cart {
    constructor() {

    }

    addToCart(item){

        let list = document.querySelector("#shopping_cart");
        let row = document.createElement('tr');
        row.innerHTML = `
        <td></td>
        <td>${item.title}</td>
        <td>${item.code}</td>
        <td>${item.color}</td>
        <td>${item.price}/-</td>
        <td>${item.quantity}</td>
        <td>${item.total}</td>
        <td><a href = "#" class = "delete">Cansel</a></td>`;

        list.appendChild(row);

    }



    clearFields(){
         document.querySelector("#name").value = '';
         document.querySelector("#code").value = '';
         document.querySelector("#color").value = '';
         document.querySelector("#price").value = '';
         document.querySelector("#quantity").value = '';

    }

    showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.container');
        let form = document.querySelector("#cart_form");

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
        
        
    }

    removeItem(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();

            let store = new Store();
            store.deleteItems(target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.
                               previousElementSibling.previousElementSibling.textContent.trim());

            let cart = new Cart();
            cart.showAlert('Item removed from the cart!', 'success');
        }

    }



    
}


// Storing data in Local Storage

class Store {
    constructor(){

    }

     getItems() {
        let items;
        if(localStorage.getItem('items') === null){
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('items'));
        }

        return items;
    }

     addItems(item){
        let store = new Store();
        let items = store.getItems();
        items.push(item);

        localStorage.setItem('items', JSON.stringify(items));
    }

    displayItems(){
        let store = new Store;
        let items = store.getItems();

        items.forEach(item => {
            let cart = new Cart();
            cart.addToCart(item);
        });
    }

    deleteItems(code){
        let store = new Store;
        let items = store.getItems();

        items.forEach((item, index) => {
            if(item.code === code){
                items.splice(index, 1);
            }
        })

        localStorage.setItem('items', JSON.stringify(items));

    }
}

// define event listener 

form.addEventListener('submit', shoppingItem);
shoppinCart.addEventListener('click', removefromDom);
let store = new Store;
document.addEventListener('DOMContentLoaded', store.displayItems());



// define function


function shoppingItem(e) {

    let title = document.querySelector("#name").value,
    code = document.querySelector("#code").value,
    color = document.querySelector("#color").value,
    price = document.querySelector("#price").value,
    quantity = document.querySelector("#quantity").value,
    total = price * quantity;

    let cart = new Cart();
    
    let store = new Store();

    if (title === '' || code === '' || color === '' || price === '' || quantity === ''){
        cart.showAlert('Please fill all the section!', 'error');
    } else {


        let item = new Product (title, code, color, price, quantity, total);
      
    
        cart.addToCart(item);
    
        cart.clearFields();

        cart.showAlert('Added to the cart!', 'success');

        store.addItems(item);


    }


    e.preventDefault();
}


function removefromDom(e){

    let cart = new Cart();

    cart.removeItem(e.target);

    e.preventDefault();
}

