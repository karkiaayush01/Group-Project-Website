var printers = []; //creating an empty array that stores printer details 
var cartCounter = document.getElementById("noOfCartElements"); //div that displays no of items in cart
var cart = document.getElementById("cart-div"); //div that contains all cart contents
updateCartElementCounter(); //function call


function updateCartElementCounter(){ //function for displaying the number of items in cart
    cartCounter.textContent = printers.length; //updates based on items in printers array
}

function toggleCartDisplay(){ //toggles the display of cart when pressed the cart icon
    if(cart.style.display == "none") cart.style.display = "block"; 
    else cart.style.display = "none";
    showCartItems(cart); //function call
}


function addToCart(names, imgSrc, prices, buyLinks){ //function that triggers after clicking "add to cart" button on html and takes 4 parameters
    var canAdd = true; //to check if the printer is already added to cart
    for(var i = 0; i < printers.length; i++){
        if(printers[i].name == names){ //checking if the name of added printer matches with any printer in the cart
            canAdd = false;
        }
    }
    if(canAdd){ //if the printer doesn't match with added items
        //pushing the parameters into array 'printers' as an object for easier update of counter and for keeping all properties of 1 printer in 1 index
        printers.push({name: names, link: imgSrc, price: prices, buyLink: buyLinks}); 
        updateCartElementCounter(); //updating the number of items in cart
        showCartItems(cart); //showing cart items (if the visibility is toggled to off, it will not show)
    }
    else{
        alert("Item already in cart"); //if the printer is already in cart
    }
}

function removeCartItem(index){ //function triggered when clicking "remove item" in cart. Receives the index of the printer that needs to be removed
    for(let i = index; i < printers.length-1; i++){ //running a loop from received index to the end of array
        printers[i] = printers[i+1]; //updating each array index with data of 1 index ahead to remove the data of the parameter index
    }
    printers.pop(); //the last element is not needed as all data is moved forward 1 step
    updateCartElementCounter(); //updating the number once again
    showCartItems(cart); //showing cart items (if the visibility is toggled to off, it will not show)
}

function showCartItems(cart){ //function to show cart items
    cart.innerHTML = ""; //removing all html stored in previous session of cart-div
    if(printers.length == 0){ //if no items in printers array
        const newDiv = document.createElement("div"); //creating a new div
        newDiv.className = "emptyList"; //adding class name in the div so it can be styled through css
        newDiv.textContent = "No items in the cart"; 
        cart.appendChild(newDiv); //appending the created div into the cart-div because all cart elements should be stored in that div
    } 
    else{ //if the cart contains items
        cart.style.height = (printers.length*100) + 'px'; //dynamic height that provides 100px of height for each item in the cart
        if(printers.length > 5) { //brings a scrollbar if more than 5 products in cart
            cart.style.overflowY = "scroll";
        }
        for(let i = 0; i < printers.length; i++){ //running loop for all printer array items
            const newDiv = document.createElement("div"); //div that contains all the details for 1 cart item
            newDiv.className = "cartList"; //class name for css styling
            cart.appendChild(newDiv); //appending into cart-div
            const imgContainer = document.createElement("figure"); //creating a container to display the printer image
            imgContainer.className = "cartProductImg" //class name for css styling
            newDiv.appendChild(imgContainer); //appending the container inside newDiv created previously
            const img = document.createElement('img'); //creating image element
            img.className = "cartProducts" //class name for css styling
            img.src = "../Images/" + printers[i].link; //only the name of image file was passed so adding the source path manually
            imgContainer.appendChild(img); //appending to imgContainer created previously
            const detailsDiv = document.createElement("div"); //div for displaying other details of printers
            detailsDiv.className = "cartProductDetails"; //class name for css styling
            detailsDiv.innerHTML =  printers[i].name + "<br/>" + "$" + printers[i].price + "<br/><br/>"; //displaying name and price of printer item
            newDiv.appendChild(detailsDiv); //appending into newDiv created previously
            const productLink = document.createElement('a'); //creating a hyperlink element
            productLink.className = "cartProductLink"; //class name for css styling
            productLink.href = "./products/" + printers[i].buyLink; //hyperlink for productpage
            productLink.textContent = "Buy Now >"; //text of link
            productLink.target = "_blank"; //for external link
            detailsDiv.appendChild(productLink); //appending into detailsDiv created previously
            const removeElement = document.createElement('a'); //creating another hyperlink element
            removeElement.className = "removeProductLink"; //class name for css styling
            removeElement.onclick = function(){removeCartItem(i)}; //runs function removeCartItem created previously on click
            removeElement.textContent = "Remove From Cart >"; //text of link
            detailsDiv.appendChild(removeElement); //appending into detailsDiv created previously
        }
    }
}