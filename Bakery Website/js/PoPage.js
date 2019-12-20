/*user = localStorage.getItem('logged_in_user')
user = JSON.parse(user)
firstname = user.firstname
lastname = user.lastname*/


function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!$&-ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

function generate() {
    document.getElementById("po_num").value = randomPassword(myform.length.value);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    //alert(today);

    document.getElementById("date").innerHTML = today;
   initPo();   

  // loadshoppinglist();
}

function initPo() {
    //alert("hello");
    buyerAddress();
    var shoppingstr = localStorage.getItem("shoppingcart");
    shoppingcart = JSON.parse(shoppingstr);
    var finalTotal = 0;



 var shoppinglisttableRow = "";
    for (var i=0;i<shoppingcart.length;i++)
    {      
        finalTotal += parseFloat(shoppingcart[i].total);
     if (shoppingcart[i].quantity != 0) {
         shoppinglisttableRow += "<tr><td>" + shoppingcart[i].productid + "</td>";
         shoppinglisttableRow += "<td>" + shoppingcart[i].name+ "</td>";
         shoppinglisttableRow += "<td>" + shoppingcart[i].price + "</td>";
         shoppinglisttableRow += "<td>" + shoppingcart[i].quantity + "</td>";
         shoppinglisttableRow += "<td>" + shoppingcart[i].total + "</td></tr>";
     }
    
 }

 var tableHead = "<table class=\"product\"><thead><tr><th>ProductID</th><th>Name</th><th>Price</th>"
     + "<th>Quantity</th><th>Total</th></tr></thead><tbody>";

    var shoppinglisttable = tableHead + shoppinglisttableRow + "</tbody></table >";
    document.getElementById("poItems").innerHTML = shoppinglisttable;
    document.getElementById("total").innerHTML = "$" + finalTotal.toFixed(2);
    document.getElementById("amountPaid").innerHTML = "$" + finalTotal.toFixed(2);

}

function buyerAddress() {
    var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    var companydetails = JSON.parse(sessionStorage.getItem("companyArray"));
    var display = "";
    for (var i = 0; i < companydetails.length; i++) {
        //alert("First Name: "+currentUser.firstName + " Company Name: " +companydetails[i].companyOwner);
        if (currentUser.firstName == companydetails[i].companyOwner) {
            display = "<address contenteditable><div><strong>" + currentUser.firstName + " " + currentUser.lastName + "</strong></div>";
            display += "<div>" + companydetails[i].companyStreet + "<div>";
            display += "<div>" + companydetails[i].companyCity + ", " + companydetails[i].companyState + " " + companydetails[i].companyDUNS +"<div>";
            display += "<div>" + companydetails[i].companyCountry + "<div>";
            display += "<div>" + currentUser.phone + "</div>";
            display += "<div>" + currentUser.userName+"<div></address>";
        }
    }
    document.getElementById("buyerAddress").innerHTML = display;
}

var sumItems = 0;
function updateSumItems() {

   
    $('.product_total').each(function () {
        sumItems += parseFloat($(this).text().replace('$', ''));
    });
    $('.subtotal').text('$' + sumItems.toFixed(2));
    $('.total').text('$' + sumItems.toFixed(2));
   
}









