// Function to add a selected product to the shopping cart
function addToCart(productName, price){
    // Get existing cart from localStorage or create an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add selected product name and price to the cart array
    cart.push({
        name: productName,
        price: price
    });
    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Show confirmation message to user
    alert(productName + " added to cart!");
}

// Function to display cart items on cart.html page
function displayCart(){
    // Get cart items from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Get HTML elements where cart items and total price will be displayed
    let cartItems = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");
    // Check if cart section exists on the current page
    if(cartItems){
        // Clear previous cart content
        cartItems.innerHTML = "";
        // Create a variable to calculate the total cart price
        let total = 0;
        // Loop through each item in the cart
        cart.forEach((item,index)=>{
            // Add item price to total
            total += item.price;
            // Display each cart item with remove button
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
        // Display total price
        totalPrice.innerHTML = "Total: €" + total.toFixed(2);
    }
}

// Function to remove item from shopping cart
function removeItem(index){
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Remove selected item using its index
    cart.splice(index,1);
    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Refresh cart display
    displayCart();
}

// Automatically display cart contents when the page loads
displayCart();

// Function to validate checkout form fields and place order
function placeOrder(event){
    // Prevent page from refreshing when form is submitted
    event.preventDefault();
    // Get form field values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();
    // Regular expression to allow only letters and spaces in name
    let namePattern = /^[A-Za-zÀ-ÿ\s]+$/;
    // Regular expression for email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regular expression for phone number validation
    // Phone must contain only 8 or 9 digits
    let phonePattern = /^[0-9]{8,9}$/;
    // Validate name field
    if(name.length < 3 || !namePattern.test(name)){
        alert("Name must contain only letters and at least 3 characters.");
        return false;
    }
    // Validate email field
    if(!emailPattern.test(email)){
        alert("Please enter a valid email address.");
        return false;
    }
    // Validate phone field
    if(!phonePattern.test(phone)){
        alert("Phone number must contain only 8 or 9 numbers.");
        return false;
    }
    // Validate address field
    if(address.length < 5){
    alert("Please enter a valid delivery address.");
    return false;
    }

    // Show successful order message
    alert("Order placed successfully!");
    // Clear cart after successful order
    localStorage.removeItem("cart");
    // Redirect user to home page
    window.location.href = "index.html";
    return true;
}

// Function to load products dynamically from server API
async function loadProducts(){
    // Fetch product data from Express API connected to MySQL database
    let response = await fetch("/api/products");
    // Convert API response into JSON format
    let products = await response.json();
    // Get products container from products.html
    let container = document.getElementById("products-container");
    // Check if products container exists on the current page
    if(container){
        // Clear existing product content
        container.innerHTML = "";
        // Loop through all products from database
        products.forEach(product => {
            // Default image if no specific image is found
            let image = "images/default.png";
            // Select image according to product name
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
            // Display product card dynamically on the page
            container.innerHTML += `

            <div class="product">
                <img src="${image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>€${Number(product.price).toFixed(2)}</p>
                <button onclick="addToCart('${product.name}', ${product.price})">
                    Add to Cart
                </button>
            </div>
            `;
        });
    }
}

// Automatically load products from the database when the page is opened
loadProducts();