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

    alert("Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}