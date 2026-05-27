function addToCart(productName, price){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: productName,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(productName + " added to cart!");
}
function displayCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cart-items");

    let totalPrice = document.getElementById("total-price");

    if(cartItems){

        cartItems.innerHTML = "";

        let total = 0;

        cart.forEach((item,index)=>{

            total += item.price;

            cartItems.innerHTML += `

            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>€${item.price}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

            `;
        });

        totalPrice.innerHTML = "Total: €" + total;
    }
}

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

displayCart();
function placeOrder(event){

    event.preventDefault();

    let name = document.getElementById("name").value;

    let email = document.getElementById("email").value;

    let phone = document.getElementById("phone").value;

    // Name validation
    if(name.length < 3){

        alert("Name must contain at least 3 characters.");

        return;
    }

    // Email validation
    if(!email.includes("@") || !email.includes(".")){

        alert("Please enter a valid email address.");

        return;
    }

    // Phone validation
    if(phone.length < 8){

        alert("Please enter a valid phone number.");

        return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";

}
async function loadProducts(){

    let response = await fetch("/api/products");

    let products = await response.json();

    let container = document.getElementById("products-container");

    if(container){

        container.innerHTML = "";

        products.forEach(product => {

            let image = "images/default.png";

            if(product.name === "Whey Protein 400g"){
                image = "images/whey.png";
            }

            if(product.name === "Creatine 300g"){
                image = "images/creatine.png";
            }

            if(product.name === "Multivitamin 120 Capsules"){
                image = "images/multivitamin.png";
            }

            if(product.name === "Melatonin Tablets"){
                image = "images/melatonin.png";
            }

            if(product.name === "Pre-Workout Energy"){
                image = "images/preworkout.png";
            }

            if(product.name === "Shaker Bottle"){
                image = "images/shaker.png";
            }

            container.innerHTML += `

            <div class="product">
                <img src="${image}" alt="${product.name}">

                <h2>${product.name}</h2>

                <p>€${product.price}</p>

                <button onclick="addToCart('${product.name}', ${product.price})">
                    Add to Cart
                </button>
            </div>

            `;
        });
    }
}

loadProducts();