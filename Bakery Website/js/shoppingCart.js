var fadeTime = 300;

$(document).ready(function () {
    loadshoppinglist();
    updateSumItems();
    $(document).on("change", ".quantity input", function () {
        updateQuantity(this);
    });
});


$(document).on("click", ".remove button", function () {

    removeItem(this, this.id);
});
$(document).on("click", ".button_clear button", function () {
    clearCart(this);
});


function removeItem(removeButton, index) {
    var productRow = $(removeButton).parent().parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        updateSumItems();
        deleteItem(index);
    });
}
function deleteItem(index) {
    var shoppingstr = localStorage.getItem("shoppingcart");
    var shoppingcart = JSON.parse(shoppingstr);
    shoppingcart.splice(index, 1);
      //alert(shoppingcart.length);
    localStorage.setItem("shoppingcart", JSON.stringify(shoppingcart));
}

/* Remove item from cart */
function clearCart() {
    var clearCart = $('.cart_items');
    clearCart.slideUp(fadeTime, function () {
        clearCart.remove();
        clearItem();
        updateSumItems();
        
    });
}
function clearItem() {    
    var shoppingstr = localStorage.getItem("shoppingcart");
    var shoppingcart = JSON.parse(shoppingstr);    
    localStorage.setItem("shoppingcart", "");
}

function updateQuantity(quantityInput) {
    var productitems = JSON.parse(localStorage.getItem("productlist"));
    let productId = $(quantityInput).attr('productId');
    var quantity = $(quantityInput).val();
    var outOfStockCheck = false;
    for (var i = 0; i < productitems.length; i++) {
        if (productitems[i].productid == productId && productitems[i].inventory == 0 && productitems[i].inventory < quantity) {
            outOfStockCheck = true;
            break;
        }
    }
    if (outOfStockCheck) {
        alert("Item out of stock");
        var shoppingcart = JSPN.parse(localStorage.getItem("shoppingcart"));
        let index = shoppingcart.findIndex(p => p.productid.toString() === productId.toString());
        if (index != -1) {
            shoppingcart[index].quantity = quantity;
            shoppingcart[index].total = linePrice.toFixed(2);
            localStorage.setItem("shoppingcart", JSON.stringify(shoppingcart))
        }
        rendershoppinglist();
    }
    else {
        var productRow = $(quantityInput).parent().parent().parent();
        var price = parseFloat(productRow.children('.product_price').text().replace('$', ''));
        
        var linePrice = price * quantity;
        productRow.children('.product_total').text('$' + linePrice.toFixed(2));
        updateSumItems();
        var shoppingstr = localStorage.getItem("shoppingcart");
        var shoppingcart = JSON.parse(shoppingstr);
        let index = shoppingcart.findIndex(p => p.productid.toString() === productId.toString());
        if (index != -1) {
           shoppingcart[index].quantity = quantity;
           shoppingcart[index].total = linePrice.toFixed(2);
          localStorage.setItem("shoppingcart", JSON.stringify(shoppingcart))
        }
    }
}

function updateSumItems() {

    var sumItems = 0;
    $('.product_total').each(function () {
        sumItems += parseFloat($(this).text().replace('$', ''));
    });   
    $('.subtotal').text('$' + sumItems.toFixed(2));
    $('.total').text('$' + sumItems.toFixed(2));
  
}

function rendershoppinglist() {
    var shoppingrow = "";
    shoppingrow = '<div class="cart_bar">';
    shoppingrow += '<ul class="cart_bar_list item_list d-flex flex-row align-items-center justify-content-end" >';
    shoppingrow += '<li class="mr-auto">Product ID</li>';
    //shoppingrow += '<li class="name">Name</li>';
    shoppingrow += '<li class="price">Price</li>';
    shoppingrow += '<li>Quantity</li>';
    shoppingrow += '<li>Total</li>';
    shoppingrow += '</ul>';
    shoppingrow += '</div>';
    shoppingrow += '<div class="cart_items">';

    for (i = 0; i <= shoppingcart.length - 1; i++) {
        shoppingrow += '<div class="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-end justify-content-start">';
        shoppingrow += '<div class="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start mr-auto">';
        shoppingrow += '<div><div class="product_number">' + shoppingcart[i].productid + '</div></div>';
        shoppingrow += '<div><div class="product_image"><img src="images/cart_item_1.jpg" alt=""></div></div>';
        shoppingrow += '<div class="product_name_container">';
        shoppingrow += '<div class="product_name">' + shoppingcart[i].name + '</div></div></div>';
        shoppingrow += '<div class="product_price product_text">'+"$" + shoppingcart[i].price + '</div>';
        shoppingrow += '<div class="product_quantity_container"><div class="quantity"><input type="number" productId="' + shoppingcart[i].productid +  '"value="' + shoppingcart[i].quantity + '" min="1" class="quantity-field" id="quantity-field" /></div>';
        shoppingrow += '<br /><br /><div class="remove"><button id="' + i + '">Remove</button></div></div>';
        shoppingrow += '<div class="product_total product_text">'+"$" + shoppingcart[i].total + '</div>';
        shoppingrow += '</div>';
    }
    shoppingrow += '</div>';
    console.log(shoppingrow);
    document.getElementById("shoppinglisttable").innerHTML = '<div class="cart_items">' + shoppingrow + '</div>';
}

function loadshoppinglist() {
    var shoppingstr = localStorage.getItem("shoppingcart");
       if (shoppingstr != "") {
        shoppingcart = JSON.parse(shoppingstr);
        rendershoppinglist();
    }
    else {
        shoppingcart = ""
    }
}

function proceedToCheckout() {
    var shoppingstr = localStorage.getItem("shoppingcart");
    var tot = 0;
    for (var i = 0; i < shoppingstr.length; i++) {
        tot += shoppingstr[i].total;
    }
    if (tot == 0) {
        alert("Cannot Proceed. No items in the cart.");
    } else {
        window.location.href = "purchaseOrder.html";
    }
}
