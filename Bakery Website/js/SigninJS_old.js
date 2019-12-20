$("#signup").click(function () {
    $("#first").fadeOut("fast", function () {
        $("#second").fadeIn("fast");
    });
});

$("#signin").click(function () {
    $("#second").fadeOut("fast", function () {
        $("#first").fadeIn("fast");
    });
});

var message = "";
var count = 0;
var userlist = [];
var companyArray = [];
var productlist = [];

$(function () {
    $("form[name='loginPopup']").validate({
        rules: {

            email: {
                required: true,
                email: true
            },
            password: {
                required: true,

            }
        },
        messages: {
            email: "Please enter a valid email address",

            password: {
                required: "Please enter password",

            }

        },
        submitHandler: function () {
            var display = "";
            display = navigateUsers();
            if (display == "Invalid username or password")
                alert(display);
            else if (display == "User is locked")
                alert(display);
            else
                window.location.href = display;
        }
    });

    function navigateUsers() {
        var username = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var page = "";
        var flag = false;
        
        for (var i = 0; i < userlist.length; i++) {
            //var newUser = sessionStorage.getItem(userlist);
            //alert(newUser[i].newSignin);

            if (username == userlist[i].userName) {
                sessionStorage.removeItem("currentUser");
                sessionStorage.setItem("currentUser", JSON.stringify(userlist[i]));
            }
            if (username == userlist[i].userName && userlist[i].failureLogin > 5) {
                count = userlist[i].failureLogin;
                break;
            }
            else if (userlist[i].newSignin == 1) {
                page = "ChangePassword.html";
                flag = true;
                userlist[i].newSignin = 0;
            }
            else if (username == userlist[i].userName && password == userlist[i].password) {
                sessionStorage.removeItem("currentUser");
                sessionStorage.setItem("currentUser", JSON.stringify(userlist[i]));
                if (userlist[i].role == "superAdmin") {
                    page = "UserMgmt.html";
                } else if (userlist[i].role == "buyerAdmin") {
                    page = "productmanagement.html";
                } else if (userlist[i].role == "buyerUser") {
                    page = "productmanagement.html";
                } else if (userlist[i].role == "supplierAdmin") {
                    page = "productmanagement.html";
                } else if (userlist[i].role == "supplierUser") {
                    page = "productmanagement.html";
                }
                flag = true;
            }
            else if (username == userlist[i].userName && password != userlist[i].password) {
                userlist[i].failureLogin += 1;
                count = userlist[i].failureLogin;    
            }
            sessionStorage.setItem("userlist", JSON.stringify(userlist));
        }
        if (count > 5 ) {
            page = "User is locked";
        }
        else if (!flag) {
            page = "Invalid username or password";
        }
        return page;        
    }
});

/**************Start User Management*************/

function user(userName, password, firstName, lastName, phone, role, company, failureLogin, newSignin, secretQuestion) {
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.role = role;
    this.company = company;
    this.failureLogin = failureLogin;
    this.newSignin = newSignin;
    this.secretQuestion = secretQuestion;
}

function secretQuestion(question1, answer1, question2, answer2, question3, answer3, question4, answer4, question5, answer5, question6, answer6) {
    this.question1 = question1;
    this.answer1 = answer1;
    this.question2 = question2;
    this.answer2 = answer2;
    this.question3 = question3;
    this.answer3 = answer3;
    this.question4 = question4;
    this.answer4 = answer4;
    this.question5 = question5;
    this.answer5 = answer5;
    this.question6 = question6;
    this.answer6 = answer6;
}

function createuserlist() {
    var user1Q = new secretQuestion("0", "India", "1", "India", "2", "Fluffy", "3", "DAV", "4", "India", "5", "Samsung");
    var user1 = new user("jack@uhcl.edu", "Abc@123##", "Jack", "Jacob", "812-456-8760", "superAdmin", "Cake n Bake", 0, 0, user1Q);
    var user2Q = new secretQuestion("0", "India", "1", "India", "2", "Fluffy", "3", "DAV", "4", "India", "5", "Samsung");
    var user2 = new user("rachel@uhcl.edu", "Abc@123##", "Rachel", "Green", "813-423-9060", "buyerAdmin", "Three Brothers Bakery", 0, 0, user2Q);
    var user3Q = new secretQuestion("0", "India", "1", "India", "2", "Fluffy", "3", "DAV", "4", "India", "5", "Samsung");
    var user3 = new user("geller@uhcl.edu", "Abc@123##", "Geller", "Moni", "811-453-8745", "buyerUser", "Kroger Bakery", 0, 0, user3Q);
    var user4Q = new secretQuestion("0", "India", "1", "India", "2", "Fluffy", "3", "DAV", "4", "India", "5", "Samsung");
    var user4 = new user("joey@uhcl.edu", "Abc@123##", "Joey", "Tribbiani", "816-467-8798", "supplierAdmin", "Macrina Bakery", 0, 0, user4Q);
    var user5Q = new secretQuestion("0", "India", "1", "India", "2", "Fluffy", "3", "DAV", "4", "India", "5", "Samsung");
    var user5 = new user("chandler@uhcl.edu", "Abc@123##", "Chandler", "Bing", "810-455-9760", "supplierUser", "Pearl Bakery", 0, 0, user5Q);
    var user6Q = new secretQuestion("0", "India", "1", "India", "2", "Fluffy", "3", "DAV", "4", "India", "5", "Samsung");
    var user6 = new user("ross@uhcl.edu", "Abc@123##", "Ross", "Geller", "811-486-0760", "buyerAdmin", "Arandas Bakery", 0, 0, user6Q);
    userlist = [user1, user2, user3, user4, user5, user6];

    var id = userlist.length + 1;
    for (i = userlist.length; i <= 100; i++) {
        var newuser = new user("joey"+i+"@uhcl.edu", "Abc@123##", "Joey"+i, "Tribbiani"+i, "811-486-0760", "supplierAdmin", "Arandas Bakery", 0, 0, user6Q);
        userlist.push(newuser);
        id++;
    }
}

function loaduserlist() {
    var userdetails = sessionStorage.getItem("userlist");
    if (userdetails == null) {
        createuserlist();
        sessionStorage.setItem("userlist", JSON.stringify(userlist));
    }
    else {
        userlist = JSON.parse(userdetails);
    }
}

loaduserlist();

function storeUserName() {
    var username = document.getElementById("email").value;
    for (var i = 0; i < userlist.length; i++) {
        if (username == userlist[i].userName) {
            sessionStorage.removeItem("currentUser");
            sessionStorage.setItem("currentUser", JSON.stringify(userlist[i]));
        }
    }
}

/************ End User Management*************/

/************ Start Company Management *************/
function company(companyName, companyEmail, companyPhone, companyOwner, companyStreet, companyCity, companyState, companyCountry, companyDUNS, companyType) {
    this.companyName = companyName;
    this.companyEmail = companyEmail;
    this.companyPhone = companyPhone;
    this.companyOwner = companyOwner;
    this.companyStreet = companyStreet;
    this.companyCity = companyCity;
    this.companyState = companyState;
    this.companyCountry = companyCountry;
    this.companyDUNS = companyDUNS;
    this.companyType = companyType;
}

function createCompanylist() {
    var company1 = new company("Cake n Bake", "support@cakenbake.com", "812-456-8760", "Jack", "Westheimer", "Houston", "IL", "USA", "896543359","supplier");
    var company2 = new company("Three Brothers Bakery", "support@brothers.com", "654-378-9089", "Rachel", "Bay Area", "Houston", "TX", "USA", "267975433","buyer");
    var company3 = new company("Kroger Bakery","support@kroger.com","789-567-7789","Geller","Clear Lake","Chicago","IL","USA","765890786","buyer");
    var company4 = new company("Macrina Bakery","support@macrina.com", "765-789-4569","Joey", "Dairy Ashford", "New Orleans", "NM" ,"USA", "667845678","supplier");
    var company5 = new company("Pearl Bakery", "support@pearl.com", "789-678-5678", "Chandler", "Katy", "Flagstaff", "AZ", "USA", "786589967", "supplier");
    var company6 = new company("Arandas Bakery", "support@arandas.com", "655-879-7890", "Ross", "Memorial", "Las Vegas", "NV", "USA", "765890788", "buyer");
    companyArray = [company1, company2, company3, company4, company5, company6];

    var id = companyArray.length + 1;
    for (i = companyArray.length; i <= 100; i++) {
        var newcompany = new company("Arandas Bakery"+i, "support@arandas.com", "655-879-7890", "Ross"+i, "Memorial", "Las Vegas", "NV", "USA", "765890788", "buyer");
        companyArray.push(newcompany);
        id++;
    }
}

function loadCompanyList() {
    
    var companydetails = sessionStorage.getItem("companyArray");
    if (companydetails == null) {
        createCompanylist();
        sessionStorage.setItem("companyArray", JSON.stringify(companyArray));
    }
    else {
        companyArray = JSON.parse(companydetails);
    }
}

loadCompanyList();

/************ End Company Management ***************/

/************ Start Product Management **************/
function createproductlist() {
    var product1 = new product("<img class=\"productimg\" src=\"img/chocolatecake.PNG\">", "p1", "Chocolate cake", "dark chocolate buttercream cake", 59.00, 30, "Cake n Bake");
    var product2 = new product("<img class=\"productimg\" src=\"img/donuts.PNG\" >", "p2", "Donuts", "Traditional scrumptious yeast donuts", 24.50, 100, "Three Brothers Bakery");
    var product3 = new product("<img class=\"productimg\" src=\"img/pastry.PNG\">", "p3", "Pastry", "Special selection of golden scrumptious buttery crusts", 35.00, 50, "Macrina Bakery");
    var product4 = new product("<img class=\"productimg\" src=\"img/croissants.PNG\">", "p4", "Croissants", "Gourmet handrolled croissants", 48.00, 100, "Pearl Bakery");
    var product5 = new product("<img class=\"productimg\" src=\"img/cookies.PNG\">", "p5", "Cookies", "Assorted freshly baked cookies of classic flavors", 22.00, 80, "Arandas Bakery");
    var product6 = new product("<img class=\"productimg\" src=\"img/cupcake.PNG\" >", "p6", "Cupcakes", "Earl grey English cupcakes with classic vanilla frostings", 70.00, 68, "Kroger Bakery");
    productlist = [product1, product2, product3, product4, product5, product6];
    
    var id = productlist.length + 1;
    for (i = productlist.length; i <= 100; i++) {
        var newproduct = new product("<img class=\"productimg\" src=\"img/cookies.PNG\">", "p" + id, "Auto name" + i, "Auto description" + i, 10, 10, "Supplier Bakery");
        productlist.push(newproduct);
        id++;
    }
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

function loadproductlist() {
    var productstr = localStorage.getItem("productlist");
    if (productstr == null) {
        createproductlist();
        localStorage.setItem("productlist", JSON.stringify(productlist));
    }
    else {
        productlist = JSON.parse(productstr);
    }
    //renderproductlist();
}


loadproductlist();
/************ End Product Management ***************/

$(function () {
    $("form[name='securityQuestion']").validate({
        rules: {
            security_answer: "required"
        },
        messages: {
            security_answer: "Please enter the answer"
        },
        submitHandler: function () {
            var display = "";
            display = resetPwd();
            if (display == "Sorry, Answer for the Security Question is wrong!")
                alert(display);
            else
                window.location.href = display;

            resetPwd();
            //window.location.href = "ChangePassword.html";
            //form.submit();
        }
    });

    function resetPwd() {
        
        var username = document.getElementById("email").value;
        var selectValue = document.getElementById("secQuest").value;
        
        var userAnswer = document.getElementById("security_answer").value;
        var flag = false;
        
        for (var i = 0; i < userlist.length; i++) {
            if ((username == userlist[i].userName) && ((selectValue == userlist[i].secretQuestion.question1 && userAnswer == userlist[i].secretQuestion.answer1) ||
                (selectValue == userlist[i].secretQuestion.question2 && userAnswer == userlist[i].secretQuestion.answer2) ||
                (selectValue == userlist[i].secretQuestion.question3 && userAnswer == userlist[i].secretQuestion.answer3))) {
                flag = true;
                display = "ChangePassword.html";
            }
            
        }
        if (!flag) {
            display = "Sorry, Answer for the Security Question is wrong!";
        }
        return display;
    }
});


$(function () {
    $("form[name='registration']").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 7
            },
            phoneNumber: {
                required: true,
                minlength: 10
            }

        },

        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long"
            },
            email: "Please enter a valid email address",
            phoneNumber: {
                required: "Please provide your phone number",
                minlength: "Phone number must be atleast 10 digits"
            }
        },

        submitHandler: function (form) {
            alert("You are successfully registered!!! Login now ");
            window.location.href = "index.html";
            //form.submit();
        }
    });
});




