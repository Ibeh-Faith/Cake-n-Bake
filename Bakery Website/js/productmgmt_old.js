//localStorage.clear();
var productlist = JSON.parse(localStorage.getItem("productlist"));
var shoppingcart = [];
var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
var productCompany = "all";
if (currentUser.role == "supplierAdmin" || currentUser.role == "supplierUser") {
    productCompany = currentUser.company;
}

function product(img, productid, name, description, price, inventory, supplier) {
    this.img = img;
    this.productid = productid;
    this.name = name;
    this.description = description;
    this.price = price;
    this.inventory = inventory;
    this.supplier = supplier;
}
function shoppingitem(productid, name, price, quantity, total) {
    this.productid = productid;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.total = total;
}
/*function createproductlist() {
    var product1 = new product("<img class=\"productimg\" src=\"img/chocolatecake.PNG\">","p1", "Chocolate cake", "dark chocolate buttercream cake", 59.00, 30, "Cake n Bake");
    var product2 = new product("<img class=\"productimg\" src=\"img/donuts.PNG\" >","p2", "Donuts", "Traditional scrumptious yeast donuts", 24.50, 100, "Three Brothers Bakery");
    var product3 = new product("<img class=\"productimg\" src=\"img/pastry.PNG\">", "p3" , "Pastry", "Special selection of golden scrumptious buttery crusts", 35.00, 50, "Macrina Bakery");
    var product4 = new product("<img class=\"productimg\" src=\"img/croissants.PNG\">","p4", "Croissants", "Gourmet handrolled croissants", 48.00, 100, "Pearl Bakery");
    var product5 = new product("<img class=\"productimg\" src=\"img/cookies.PNG\">","p5", "Cookies", "Assorted freshly baked cookies of classic flavors", 22.00, 80, "Arandas Bakery");
    var product6 = new product("<img class=\"productimg\" src=\"img/cupcake.PNG\" >","p6", "Cupcakes", "Earl grey English cupcakes with classic vanilla frostings", 70.00, 68, "Kroger Bakery");
    productlist = [product1, product2, product3, product4, product5, product6];
    var id = productlist.length + 1;
    for (i = id; i <= 100; i++) {
        var newproduct = new product("<img class=\"productimg\" src=\"img/cookies.PNG\">", "p" + id, "Auto name " + i, "Auto description " + i, i, i, "Supplier Bakery "+i);
        productlist.push(newproduct);
        id++;
    }
}*/
function deletebutton(index) {
    return "<td class=\"delete\"><button type=\"button\" id=\"" + index + "\" class=\"deletestyle\"  data-toggle=\"modal\" data-target='#deleteProducts" + index + "'>Delete</button>" +
        //< !--Delete Modal-- >
        "<div class=\"modal fade\" id='deleteProducts" + index + "' tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteProductLabel\" aria-hidden=\"true\">" +
        "<div class=\"modal-dialog\" role=\"document\">" +
        "<div class=\"modal-content\">" +
        "<div class=\"modal-header\">" +
        "<h5 class=\"modal-title\" id=\"deletetitle\">Delete " + productlist[index].name + "?</h5>" +
        "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">" +
        "<span aria-hidden=\"true\">&times;</span>" +
        "</button>" +
        " </div>" +
        " <div class=\"modal-footer\">" +
        "<input type=\"hidden\" id=\"deleteIndex\" />" +
        "<button id='" + index + "' type=\"button\" class=\"editstyle\" data-dismiss=\"modal\" onclick=\"deleteitem(this.id)\">Confirm</button>" +
        "<button type=\"button\" class=\"deletestyle\" data-dismiss=\"modal\">Cancel</button>" +
        "</div>" +
        "</div>" +
        " </div>" +
        "</div>" +
        "</td>";
}
var ind = 0;
function prefillproduct(index) {
    document.getElementById("edittitle").innerHTML = "Edit Product: " + productlist[index].name;
    document.getElementById("editpname").value = productlist[index].name;
    document.getElementById("editpsupplier").value = productlist[index].supplier;
    document.getElementById("editpdescrpt").value = productlist[index].description;
    document.getElementById("editpprice").value = productlist[index].price;
    document.getElementById("editpinvt").value = productlist[index].inventory;
    ind = index;
}

function edititem() {
    toggleValidation();
    var modal = document.getElementById("editProducts");
    var pdtname = document.getElementById("editpname").value;
    var pdtsupplier = document.getElementById("editpsupplier").value;
    var pdtdes = document.getElementById("editpdescrpt").value;
    var pdtprice = document.getElementById("editpprice").value;
    var pdtinventory = document.getElementById("editpinvt").value;

    productlist[ind].name = pdtname;
    productlist[ind].description = pdtdes;
    productlist[ind].price = pdtprice;
    productlist[ind].inventory = pdtinventory;
    productlist[ind].supplier = pdtsupplier;

    var foundError = editValidate(pdtname, pdtdes, pdtprice, pdtinventory, pdtsupplier);

    if (foundError) { return false; }

    localStorage.setItem("productlist", JSON.stringify(productlist));
    window.alert("product updated");
    modal.style.display = "none";

    renderproductlist();
    location.reload();
}

function addcartbutton(index) {
    if (productlist[index].inventory == 0) {
        return "<td class=\"cartrow\"><div> OUT OF STOCK</div></td>";
    } else {
        //return "<td class=\"cartrow\" ><div class=\"text-center container-card-button\"><button id=\"addcartinven" + index + "\" type=\"button\" class=\"btn btn-default\" onclick=\"addcart(this.id)\">Add to Cart</button><i id=\"addcartinven" + index + "\" class=\"fa fa-shopping-cart icon-card\"></i></div></td>";
        return "<td class=\"cartrow\" id=\"addcartinven" + index + "\"><div class=\"text-center container-card-button\"><button id=\"" + index + "\" type=\"button\" class=\"btn btn-default\" onclick=\"addcart(this.id)\">Add to Cart</button><i id=\"" + index + "\" class=\"fa fa-shopping-cart icon-card\"></i></div></td>";
    }

}
function userrole_display() {
    //var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
	document.getElementById("currentusr").innerHTML = currentUser.firstName;
    if (currentUser.role == "superAdmin" || currentUser.role == "supplierAdmin" || currentUser.role == "supplierUser") {
        $("#cart").hide(); //shopping cart button
        $('.container-card-button').hide(); //shopping cart button
        $('.btn').hide(); //shopping cart button
        $('#cartheader').hide();
        $('.cartrow').hide();
    }
    if (currentUser.role == "buyerUser" || currentUser.role == "buyerAdmin") {
        $("#addproduct").hide(); //add product
        $(".edit").hide(); //edit product
        $(".delete").hide(); //delete product
    }
}

function renderproductlist() {
    var productrow = "";
    productrow = "<tr class=\"tableizer-firstrow\"><th>Image</th><th>Name</th><th>Description</th><th>Price</th><th>Inventory</th><th>Supplier</th><th class=\"edit\">Edit</th><th class=\"delete\">Delete</th><th id=\"cartheader\">Add to Cart</th></tr>";

    for (i = 0; i < productlist.length; i++) {
        //not admin, not supplier company 
        if (productlist[i].supplier != productCompany && productCompany != "all") continue;
        productrow += "<tr>";
        productrow += "<td>" + productlist[i].img + "</td>";
        productrow += "<td>" + productlist[i].name + "</td>";
        productrow += "<td>" + productlist[i].description + "</td>";
        productrow += "<td>$" + productlist[i].price + "</td>";
        productrow += "<td>" + productlist[i].inventory + "</td>";
        productrow += "<td>" + productlist[i].supplier + "</td>";
        //EDIT BUTTON
        productrow += "<td class=\"edit\">" + "<button type=\"button\" id=\"" + i + "\" class=\"editstyle\" data-toggle=\"modal\" data-target='#editProducts' onclick = \"prefillproduct(" + i + ")\";>Edit</button></td>";
        if (productlist[i].supplier == productCompany) {
            document.getElementById("psupplier").innerHTML = "<option value=\"" + productCompany + "\" selected>" + productCompany + "</option>";
            document.getElementById("editpsupplier").innerHTML = "<option value=\"" + productCompany + "\" selected>" + productCompany + "</option>";
        }
        //DELETE BUTTON
        productrow += deletebutton(i);
        //ADD TO CART BUTTON
        productrow += addcartbutton(i);
        productrow += "</tr>";
    }
    document.getElementById("pdiv").innerHTML = "<table id=\"ptable\">" + productrow + "</table>";


}
function loadproductlist() {
    var productstr = localStorage.getItem("productlist");
    if (productstr == null) {
        createproductlist();
        localStorage.setItem("productlist", JSON.stringify(productlist));
    }
    else {
        productlist = JSON.parse(productstr);
    }
    renderproductlist();
}

initPage();

function initPage() {
    //loadproductlist();
    renderproductlist();
    loadshoppingcart();
    updateTotalCount();
    userrole_display();
}

function loadshoppingcart() {
    var shoppingstr = localStorage.getItem("shoppingcart");
    if (shoppingstr != null)
        shoppingcart = JSON.parse(shoppingstr);
    else
        shoppingcart = [];
}


function addnewproduct() {
    toggleValidation();

    var pname = document.getElementById("pname").value;
    var pdescrpt = document.getElementById("pdescrpt").value;
    var psupplier = document.getElementById("psupplier").value;
    var pprice = document.getElementById("pprice").value;
    var pinvt = document.getElementById("pinvt").value;

    var indexp = productlist.length + 1;
    var newproduct = new product("<img class=\"productimg\" src=\"img/chocolatecake.PNG\">", "p" + indexp, pname, pdescrpt, pprice, pinvt, psupplier);

    var foundError = validation(pname, pdescrpt, pprice, pinvt, psupplier);

    if (foundError) { return false; }

    productlist.push(newproduct);
    localStorage.setItem("productlist", JSON.stringify(productlist));
    renderproductlist();
    userrole_display();
    clearvalue();
    $('#addProducts').modal('toggle');

}
function clearvalue() {
    
    document.getElementById("pname").value = "";
    document.getElementById("pdescrpt").value = "";
    document.getElementById("pprice").value = "";
    document.getElementById("pinvt").value = "";
    document.getElementById("psupplier").value = "";
    
    
}

//ADD TO CART, DELETE, EDIT FUNCTIONS
function addcart(buttonId) {
    var product = productlist[buttonId];
    var checkOutOfStock = false;
    productlist[buttonId].inventory = productlist[buttonId].inventory - 1;
    if (productlist[buttonId].inventory < 1) {
        checkOutOfStock = true;
        alert(productlist[buttonId].name + " is out of stock");
        //return;
    }
    var item1 = new shoppingitem(product.productid, product.name, product.price, 1, product.price);
    var inCart = false;

    for (var i = 0; i < shoppingcart.length; i++) {
        //check if item1 is already in shoppingCart
        if (item1.productid == shoppingcart[i].productid) {
            shoppingcart[i].quantity++;
            shoppingcart[i].total = shoppingcart[i].quantity * shoppingcart[i].price;
            inCart = true;
            break;
        }
    }
    if (inCart == false)
        shoppingcart.push(item1);
    localStorage.setItem("productlist", JSON.stringify(productlist));
    localStorage.setItem("shoppingcart", JSON.stringify(shoppingcart));

    renderproductlist();
    userrole_display();
    updateTotalCount();
    if (checkOutOfStock) {
        //$("#addcartinven" + buttonId).hide();
        $("#addcartinven" + buttonId).html("<div>OUT OF STOCK</div>");
    }
}
// item count in cart 
function updateTotalCount() {
    var totalunit = 0;
    if (shoppingcart.length == 0) {
        document.getElementById("cartTotal").innerHTML = 0;
    }
    else {
        for (i = 0; i < shoppingcart.length; i++) {
            totalunit += shoppingcart[i].quantity;
        }
        document.getElementById("cartTotal").innerHTML = totalunit;
    }

}
function deleteitem(id) {
    productlist.splice(id, 1);
    localStorage.setItem("productlist", JSON.stringify(productlist));
    renderproductlist();
    userrole_display();

}

function validation(pname, pdescrpt, pprice, pinvt, psupplier) {

    var currenterrors = "";
    var validationErrorAdds = "";
    hasErrors = 0;
    if (!pname) {
        $("#validationErrorAdd").show();
        $("#validationErrorAdd").html("Product name required");
        hasErrors = 1;
    }
    if (psupplier == "Choose Supplier...") {
        $("#validationErrorAdd").show();
        currenterrors = document.getElementById("validationErrorAdd").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Supplier Name required";
            $("#validationErrorAdd").html(currenterrors);
        } else {
            $("#validationErrorAdd").html("Supplier Name required");
        }
        hasErrors = 1;
    }
    if (!pdescrpt) {
        $("#validationErrorAdd").show();
        currenterrors = document.getElementById("validationErrorAdd").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Description required";
            $("#validationErrorAdd").html(currenterrors);
        } else {
            $("#validationErrorAdd").html("Description required");
        }

        hasErrors = 1;
    }
    if (!pprice) {
        $("#validationErrorAdd").show();
        currenterrors = document.getElementById("validationErrorAdd").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Price required";
            $("#validationErrorAdd").html(currenterrors);
        } else {
            $("#validationErrorAdd").html("Price required");
        }

        hasErrors = 1;
    }
    if (!pinvt) {
        $("#validationErrorAdd").show();
        currenterrors = document.getElementById("validationErrorAdd").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Inventory required";
            $("#validationErrorAdd").html(currenterrors);
        } else {
            $("#validationErrorAdd").html("Inventory required");
        }

        hasErrors = 1;
    }
    if (!psupplier) {
        $("#validationErrorAdd").show();
        currenterrors = document.getElementById("validationErrorAdd").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Supplier name required";
            $("#validationErrorAdd").html(currenterrors);
        } else {
            $("#validationErrorAdd").html("Supplier name required");
        }
        hasErrors = 1;
    }
    return hasErrors;
}

function editValidate(pname, pdescrpt, pprice, pinvt, psupplier) {

    var currenterrors = "";
    hasErrors = 0;
    if (!pname || pname == null) {
        $("#validationErrorEdit").show();
        $("#validationErrorEdit").html("Product name required");
        hasErrors = 1;
    }
    if (psupplier == "Choose Supplier...") {
        $("#validationErrorEdit").show();
        currenterrors = document.getElementById("validationErrorEdit").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Supplier Name required";
            $("#validationErrorEdit").html(currenterrors);
        } else {
            $("#validationErrorEdit").html("Supplier Name required");
        }
        hasErrors = 1;
    }
    if (!psupplier || psupplier == null) {
        $("#validationErrorEdit").show();
        currenterrors = document.getElementById("validationErrorEdit").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Supplier name required";
            $("#validationErrorEdit").html(currenterrors);
        } else {
            $("#validationErrorEdit").html("Supplier name required");
        }
        hasErrors = 1;
    }
    if (!pdescrpt || pdescrpt == null) {
        $("#validationErrorEdit").show();
        currenterrors = document.getElementById("validationErrorEdit").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Description required";
            $("#validationErrorEdit").html(currenterrors);
        } else {
            $("#validationErrorEdit").html("Description required");
        }

        hasErrors = 1;
    }
    if (!pprice || pprice == null) {
        $("#validationErrorEdit").show();
        currenterrors = document.getElementById("validationErrorEdit").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Price required";
            $("#validationErrorEdit").html(currenterrors);
        } else {
            $("#validationErrorEdit").html("Price required");
        }

        hasErrors = 1;
    }
    if (!pinvt || pinvt == null) {
        $("#validationErrorEdit").show();
        currenterrors = document.getElementById("validationErrorEdit").innerHTML;
        if (currenterrors) {
            currenterrors = currenterrors + ", Inventory required";
            $("#validationErrorEdit").html(currenterrors);
        } else {
            $("#validationErrorEdit").html("Inventory required");
        }

        hasErrors = 1;
    }

    return hasErrors;
}

function toggleValidation() {
    $("#validationErrorAdd, #validationErrorEdit").html('');
    $("#validationErrorAdd, #validationErrorEdit").hide();
    hasErrors = 0;
}

/*function edititem(id) {
    toggleValidation();
    newname = document.getElementById("editpname"+id).value;
    newdescrpt = document.getElementById("editpdescrpt" + id).value;
    newprice = document.getElementById("editpprice" + id).value;
    newinvt = document.getElementById("editpinvt" + id).value;
    newsupplier = document.getElementById("editpsupplier" + id).value;

    var founderror = validation(newname, newdescrpt, newprice, newinvt, newsupplier);
    if (founderror) return false;

    productlist[id].name = newname;
    productlist[id].description = newdescrpt;
    productlist[id].price = newprice;
    productlist[id].inventory = newinvt;
    productlist[id].supplier = newsupplier;
    
    localStorage.setItem("productlist", JSON.stringify(productlist));
    renderproductlist();
    //clearvalue(edit,id);
    $('#editProducts').modal('toggle');

}*/


// SEARCH HIGHLIGHT FUNCTION
function Hilitor(id, tag) {

    // private variables
    var targetNode = document.getElementById(id) || document.body;
    var hiliteTag = tag || "MARK";
    var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
    var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    var wordColor = [];
    var colorIdx = 0;
    var matchRegExp = "";
    var openLeft = false;
    var openRight = false;

    // characters to strip from start and end of the input string
    var endRegExp = new RegExp('^[^\\w]+|[^\\w]+$', "g");

    // characters used to break up the input string into words
    var breakRegExp = new RegExp('[^\\w\'-]+', "g");

    this.setEndRegExp = function (regex) {
        endRegExp = regex;
        return endRegExp;
    };

    this.setBreakRegExp = function (regex) {
        breakRegExp = regex;
        return breakRegExp;
    };

    this.setMatchType = function (type) {
        switch (type) {
            case "left":
                this.openLeft = false;
                this.openRight = true;
                break;

            case "right":
                this.openLeft = true;
                this.openRight = false;
                break;

            case "open":
                this.openLeft = this.openRight = true;
                break;

            default:
                this.openLeft = this.openRight = false;

        }
    };

    this.setRegex = function (input) {
        input = input.replace(endRegExp, "");
        input = input.replace(breakRegExp, "|");
        input = input.replace(/^\||\|$/g, "");
        if (input) {
            var re = "(" + input + ")";
            if (!this.openLeft) re = "\\b" + re;
            if (!this.openRight) re = re + "\\b";
            matchRegExp = new RegExp(re, "i");
            return matchRegExp;
        }
        return false;
    };

    this.getRegex = function () {
        var retval = matchRegExp.toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
        retval = retval.replace(/\|/g, " ");
        return retval;
    };

    // recursively apply word highlighting
    this.hiliteWords = function (node) {
        if (node === undefined || !node) return;
        if (!matchRegExp) return;
        if (skipTags.test(node.nodeName)) return;

        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++)
                this.hiliteWords(node.childNodes[i]);
        }
        if (node.nodeType == 3) { // NODE_TEXT
            if ((nv = node.nodeValue) && (regs = matchRegExp.exec(nv))) {
                if (!wordColor[regs[0].toLowerCase()]) {
                    wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
                }

                var match = document.createElement(hiliteTag);
                match.appendChild(document.createTextNode(regs[0]));
                match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
                match.style.color = "#000";

                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        };
    };

    // remove highlighting
    this.remove = function () {
        var arr = document.getElementsByTagName(hiliteTag);
        while (arr.length && (el = arr[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };

    // start highlighting at target node
    this.apply = function (input) {
        this.remove();
        if (input === undefined || !input) return;
        if (this.setRegex(input)) {
            this.hiliteWords(targetNode);
        }
        return matchRegExp;
    };

}
window.addEventListener("DOMContentLoaded", function (e) {
    var myHilitor2 = new Hilitor("ptable");
    myHilitor2.setMatchType("left");
    document.getElementById("searchbar").addEventListener("keyup", function (e) {
        myHilitor2.apply(this.value);
    }, false);
}, false);

// SEARCH RESULT
function searchkey() {
    var key = document.getElementById("searchbar").value;
    var searchresultlist = [];
    check = false;
    // var productrow = "";
    for (i = 0; i < productlist.length; i++) {
        if (productlist[i].name.includes(key) || productlist[i].description.includes(key) || productlist[i].supplier.includes(key))
        {
            check = true;
            searchresultlist.push(productlist[i]);

        }
    }
    sessionStorage.setItem("searchresultlist", JSON.stringify(searchresultlist));
    if (sessionStorage.searchresultlist) {
        productrow = "<tr class=\"tableizer-firstrow\"><th>Image</th><th>Name</th><th>Description</th><th>Price</th><th>Inventory</th><th>Supplier</th><th class=\"edit\">Edit</th><th class=\"delete\">Delete</th><th id=\"cartheader\">Add to Cart</th></tr>";
        for (j = 0; j < searchresultlist.length; j++) {
            if (searchresultlist[i].supplier != productCompany && productCompany != "all") continue;
            productrow += "<tr>";
            productrow += "<td>" + searchresultlist[j].img + "</td>";
            productrow += "<td>" + searchresultlist[j].name + "</td>";
            productrow += "<td>" + searchresultlist[j].description + "</td>";
            productrow += "<td>$" + searchresultlist[j].price + "</td>";
            productrow += "<td>" + searchresultlist[j].inventory + "</td>";
            productrow += "<td>" + searchresultlist[j].supplier + "</td>";
            productrow += "<td class=\"edit\">" + "<button type=\"button\" id=\"" + i + "\" class=\"editstyle\" data-toggle=\"modal\" data-target='#editProducts' onclick = \"prefillproduct(" + i + ")\";>Edit</button></td>";
            if (searchresultlist[i].supplier == productCompany) {
                document.getElementById("psupplier").innerHTML = "<option value=\"" + productCompany + "\" selected>" + productCompany + "</option>";
                document.getElementById("editpsupplier").innerHTML = "<option value=\"" + productCompany + "\" selected>" + productCompany + "</option>";
            }
            productrow += deletebutton(j);
            productrow += addcartbutton(j);
            productrow += "</tr>";
        }
        document.getElementById("pdiv").innerHTML = "<table id=\"ptable\">" + productrow + "</table>";
        sessionStorage.removeItem("searchresultlist");
        userrole_display();
    }
    if (key == "") {
        if (sessionStorage.searchresultlist) {
            sessionStorage.removeItem("searchresultlist");
        }
        loadproductlist();
    }
    if (check==false) document.getElementById("pdiv").innerHTML = "No results found";

}