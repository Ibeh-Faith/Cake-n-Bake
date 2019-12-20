
function user(userName, password, firstName, lastName, phone, role, company, failureLogin, secretQuestion) {
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.role = role;
    this.company = company;
    this.failureLogin = failureLogin;
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

var currentUser;
function currentUser() {
    var currentUserdetails = sessionStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUserdetails);
    document.getElementById("currentusr").innerHTML = currentUser.firstName;
}

currentUser();

function showAddNewUserBtn() {
    //window.alert(currentUser.role);
    var addNewUserBtn = "";
    if (currentUser.role == "superAdmin" || currentUser.role == "buyerAdmin" || currentUser.role == "supplierAdmin" ) {
        addNewUserBtn = addNewUserBtn + "<button type=\"button\" data-toggle=\"modal\" data-target=\"#addUsers\" id=\"addUsr\">Add New Users</button>";
    }
    document.getElementById("addUser").innerHTML = addNewUserBtn;

}

showAddNewUserBtn();


function renderuserlist() {
    var addNewUserBtn = "";
    if (currentUser.role == "superAdmin" || currentUser.role == "buyerAdmin" || currentUser.role == "supplierAdmin") {
        addNewUserBtn = addNewUserBtn + "<button type=\"button\" data-toggle=\"modal\" data-target=\"#addUsers\" id=\"addUsr\">Add New Users</button>";
    }
    document.getElementById("addUser").innerHTML = addNewUserBtn;


    var userRow = "<tr class=\"tableizer-firstrow\" ><th>Username</th><th>Firstname</th><th>Lastname</th><th>Phone</th><th>Role</th><th>Company</th><th>Edit</th><th>Delete</th></tr>";
    if (currentUser.role == "supplierUser" || currentUser.role == "buyerUser") {
        for (var i = 0; i < userlist.length; i++) {
            if ((userlist[i].role == "supplierUser" || userlist[i].role == "buyerUser") && (currentUser.company == userlist[i].company)) {
                var rownum = "row" + i + 1;
                userRow += "<tr id=\"rownum\"><td id= \"Username\" >" + userlist[i].userName + "</td>";
                userRow += "<td id= \"Firstname\">" + userlist[i].firstName + "</td>";
                userRow += "<td id= \"Lastname\">" + userlist[i].lastName + "</td>";
                userRow += "<td id = \"Phone\">" + userlist[i].phone + "</td>";
                userRow += "<td id = \"Role\">" + userlist[i].role + "</td>";
                userRow += "<td id = \"Company\">" + userlist[i].company + "</td>";
            }
        }
    }
    else if (currentUser.role == "superAdmin" || currentUser.role == "buyerAdmin" || currentUser.role == "supplierAdmin") {
        for (var i = 0; i < userlist.length; i++) {
            if ((currentUser.role == "superAdmin") || ((userlist[i].role == "buyerAdmin" || userlist[i].role == "buyerUser") && (currentUser.company == userlist[i].company)) || ((userlist[i].role == "supplierAdmin" || userlist[i].role == "supplierUser") && (currentUser.company == userlist[i].company))) {
                var rownum = "row" + i + 1;
                userRow += "<tr id=\"rownum\"><td id= \"Username\" >" + userlist[i].userName + "</td>";
                userRow += "<td id= \"Firstname\">" + userlist[i].firstName + "</td>";
                userRow += "<td id= \"Lastname\">" + userlist[i].lastName + "</td>";
                userRow += "<td id = \"Phone\">" + userlist[i].phone + "</td>";
                userRow += "<td id = \"Role\">" + userlist[i].role + "</td>";
                userRow += "<td id = \"Company\">" + userlist[i].company + "</td>";

                if (currentUser.role == "superAdmin") {
                    //edit button
                    userRow += "<td><input class=\"edit\" id=\"edit_button\" type=\"button\" value=\"edit\" data-toggle=\"modal\" data-target=\"#editUser\" onclick =\"prefilluser(" + i + ")\";/></td>";
                    //delete 
                    userRow += "<td><input id=\"user_delete\" class=\"delete\" type=\"button\" value=\"delete\" onclick=\"deleteitem(" + i + ");\" /></td></tr>";
                }
                else if (((userlist[i].role == "buyerAdmin" || userlist[i].role == "buyerUser") && (currentUser.company == userlist[i].company)) || ((userlist[i].role == "supplierAdmin" || userlist[i].role == "supplierUser") && (currentUser.company == userlist[i].company))) {
                    //edit button
                    userRow += "<td><input class=\"edit\" id=\"edit_button\" type=\"button\" value=\"edit\" data-toggle=\"modal\" data-target=\"#editUser\" onclick =\"prefilluser(" + i + ")\";/></td>";
                    //delete 
                    userRow += "<td></td></tr>";
                } else {
                    userRow += "<td></td>";
                    userRow += "<td></td></tr>";
                }
            }
        }
    }
    document.getElementById("usertable").innerHTML = "<table id=\"UserTable\">" + userRow + "</table>";

    var companylist = "<label for=\"exampleInputEmail1\">Company Name</label>";
    companylist += "<select class=\"form-control\" id=\"company\">" ;
    companylist += "<option selected=\"\"> Select Company Name</option>";

    if (currentUser.role == "superAdmin") {
        companylist += "<label for=\"exampleInputEmail1\">Company Name</label>";
        companylist += "< select class=\"form-control\" id = \"company\">";
        companylist += "<option selected=\"\"> Select Company Name</option>";
        companylist += "<option>Cake n Bake</option>";
        companylist += "<option>Three Brothers Bakery</option>";
        companylist += "<option>Kroger Bakery</option>";
        companylist += "<option>Macrina Bakery</option>";
        companylist += "<option>Pearl Bakery</option>";
        companylist += "<option>Arandas Bakery</option></select >";

    }
    else {
        companylist += "<option>" + currentUser.company + "</option></select>";
    }
           
    document.getElementById("companylist").innerHTML = companylist; 

    var companylistedit = "";
    if (currentUser.role == "superAdmin") {
        companylistedit += "<label for=\"exampleInputEmail1\">Company Name</label>";
        companylistedit += "< select class=\"form-control\" id = \"company\">";
        companylistedit += "<option selected=\"\"> Select Company Name</option>";
        companylistedit += "<option>Cake n Bake</option>";
        companylistedit += "<option>Three Brothers Bakery</option>";
        companylistedit += "<option>Kroger Bakery</option>";
        companylistedit += "<option>Macrina Bakery</option>";
        companylistedit += "<option>Pearl Bakery</option>";
        companylistedit += "<option>Arandas Bakery</option></select >";

    }
    else {
        companylistedit += "<option>" + currentUser.company + "</option></select>";
    }

    document.getElementById("companyEdit").innerHTML = companylistedit; 

    /* Company Type */
    var companytype = "<option selected=\"\">Select Company</option>";

    if (currentUser.role == "superAdmin") {
        companytype += "<option>Buyer</option>";
        companytype += "<option>Supplier</option></select>";
    }
    else if (currentUser.role == "buyerAdmin") {
        companytype += "<option>Buyer</option></select>";
    }
    else if (currentUser.role == "supplierAdmin") {
        companytype += "<option>Supplier</option></select> ";
    }

    document.getElementById("companyType").innerHTML = companytype;
    //Role selection
    var selectrole = "";
    if (currentUser.role == "superAdmin") {
        selectrole += "<option>superAdmin</option>";
        selectrole += "<option>buyerAdmin</option>";
        selectrole += "<option>buyerUser</option>";
        selectrole += "<option>supplierAdmin</option>";
        selectrole += "<option>supplierUser</option>";
    }
    else if (currentUser.role == "buyerAdmin") {
        selectrole += "<option>buyerAdmin</option>";
        selectrole += "<option>buyerUser</option>";
    }
    else if (currentUser.role == "supplierAdmin") {
        selectrole += "<option>supplierAdmin</option>";
        selectrole += "<option>supplierUser</option>";
    }
    document.getElementById("roleEdit").innerHTML = selectrole;
    document.getElementById("role").innerHTML = selectrole;
}

renderuserlist();

    function prefilluser(index) {
        document.getElementById("userNameEdit").value = userlist[index].userName;
        document.getElementById("firstNameEdit").value = userlist[index].firstName;
        document.getElementById("lastNameEdit").value = userlist[index].lastName;
        document.getElementById("userPhoneEdit").value = userlist[index].phone;
        document.getElementById("roleEdit").value = userlist[index].role;
        document.getElementById("companyEdit").value = userlist[index].company;
    }

    function editUser() {

        var modal = document.getElementById("editUser");
        var username = document.getElementById("userNameEdit").value;
        var firstname = document.getElementById("firstNameEdit").value;
        var lastname = document.getElementById("lastNameEdit").value;
        var phonenumber = document.getElementById("userPhoneEdit").value;
        var role = document.getElementById("roleEdit").value;
        var company = document.getElementById("companyEdit").value;

        document.getElementById("validationErrorEdit").innerHTML = "";
        var foundError = editValidation(username, firstname, lastname, phonenumber, role, company);

        if (foundError) { return false; }

        for (i = 0; i < userlist.length; i++) {

            if (userlist[i].userName == username) {
                userlist[i].firstName = document.getElementById("firstNameEdit").value;
                userlist[i].lastName = document.getElementById("lastNameEdit").value;
                userlist[i].phone = document.getElementById("userPhoneEdit").value;
                userlist[i].role = document.getElementById("roleEdit").value;
                userlist[i].company = document.getElementById("companyEdit").value;

            }
        }

        sessionStorage.setItem("userlist", JSON.stringify(userlist));
        window.alert("user updated");
        if (!foundError) modal.style.display = "none";

        renderuserlist();
        location.reload();

    }

    function adduser() {
        var modal = document.getElementById("addUsers");
        var username = document.getElementById("username").value;
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var phonenumber = document.getElementById("phoneNumber").value;
        var role = document.getElementById("role").value;
        var company = document.getElementById("company").value;
        var companytype = document.getElementById("companyType").value;

        document.getElementById("validationErrorAdd").innerHTML = "";
        var foundError = validation(username, firstname, lastname, phonenumber, role, company, companytype);

        if (foundError) { return false; }

        for (var i = 0; i < userlist.length; i++) {
            if (username == userlist[i].userName) {
                document.getElementById("validationErrorAdd").innerHTML = "user already exits!";
                return;
            }
        }
        var newuserQ = new secretQuestion("0", "India", "1", "India", "2", "Fluffy", "3", "DAV", "4", "India", "5", "Samsung");
        var newUser = new user(username, "temp@123##", firstname, lastname, phonenumber, role, company, 0, 1, newuserQ);

        userlist.push(newUser);
        sessionStorage.setItem("userlist", JSON.stringify(userlist));
        if (!foundError) modal.style.display = "none";

        alert("New user is created with temporary password temp@123##");

        renderuserlist();
        location.reload();

    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhonenumber(newPhone) {
        var regularExpression = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        if (newPhone.match(regularExpression)) {
            return true;
        }
        else {
            return false;
        }
    }

    function deleteitem(i) {

        window.alert("User is deleted");

        var index = 0;
        var userlist2 = [];
        for (j = 0; j < userlist.length; j++) {
            if (j != i) {
                userlist2[index] = userlist[j];
                index++;
            }
        }
        userlist = [];
        userlist = userlist2;

        sessionStorage.setItem("userlist", JSON.stringify(userlist));
        renderuserlist();
    }

    // SEARCH RESULT
    function rendertablelist(searchindex) {
        var index = 0;
    
        var userRow = "<tr class=\"tableizer-firstrow\" ><th>Username</th><th>Firstname</th><th>Lastname</th><th>Phone</th><th>Role</th><th>Company</th><th>Edit</th><th>Delete</th></tr>";
        if (currentUser.role == "supplierUser" || currentUser.role == "buyerUser") {
            for (var i = 0; i < userlist.length; i++) {
                if (i == searchindex[index]) {
                    index++;
                    if ((userlist[i].role == "supplierUser" || userlist[i].role == "buyerUser") && (currentUser.company == userlist[i].company)) {
                        var rownum = "row" + i + 1;
                        userRow += "<tr id=\"rownum\"><td id= \"Username\" >" + userlist[i].userName + "</td>";
                        userRow += "<td id= \"Firstname\">" + userlist[i].firstName + "</td>";
                        userRow += "<td id= \"Lastname\">" + userlist[i].lastName + "</td>";
                        userRow += "<td id = \"Phone\">" + userlist[i].phone + "</td>";
                        userRow += "<td id = \"Role\">" + userlist[i].role + "</td>";
                        userRow += "<td id = \"Company\">" + userlist[i].company + "</td>";
                    }
                }
            }
        }
        else if (currentUser.role == "superAdmin" || currentUser.role == "buyerAdmin" || currentUser.role == "supplierAdmin") {
            for (var i = 0; i < userlist.length; i++) {
                if (i == searchindex[index]) {
                    index++;
                    if ((currentUser.role == "superAdmin") || ((userlist[i].role == "buyerAdmin" || userlist[i].role == "buyerUser") && (currentUser.company == userlist[i].company)) || ((userlist[i].role == "supplierAdmin" || userlist[i].role == "supplierUser") && (currentUser.company == userlist[i].company))) {
                        var rownum = "row" + i + 1;
                        userRow += "<tr id=\"rownum\"><td id= \"Username\" >" + userlist[i].userName + "</td>";
                        userRow += "<td id= \"Firstname\">" + userlist[i].firstName + "</td>";
                        userRow += "<td id= \"Lastname\">" + userlist[i].lastName + "</td>";
                        userRow += "<td id = \"Phone\">" + userlist[i].phone + "</td>";
                        userRow += "<td id = \"Role\">" + userlist[i].role + "</td>";
                        userRow += "<td id = \"Company\">" + userlist[i].company + "</td>";

                        if (currentUser.role == "superAdmin") {
                            //edit button
                            userRow += "<td><input class=\"edit\" id=\"edit_button\" type=\"button\" value=\"edit\" data-toggle=\"modal\" data-target=\"#editUser\" onclick =\"prefilluser(" + i + ")\";/></td>";
                            //delete 
                            userRow += "<td><input id=\"user_delete\" class=\"delete\" type=\"button\" value=\"delete\" onclick=\"deleteitem(" + i + ");\" /></td></tr>";
                        }
                        else if (((userlist[i].role == "buyerAdmin" || userlist[i].role == "buyerUser") && (currentUser.company == userlist[i].company)) || ((userlist[i].role == "supplierAdmin" || userlist[i].role == "supplierUser") && (currentUser.company == userlist[i].company))) {
                            //edit button
                            userRow += "<td><input class=\"edit\" id=\"edit_button\" type=\"button\" value=\"edit\" data-toggle=\"modal\" data-target=\"#editUser\" onclick =\"prefilluser(" + i + ")\";/></td>";
                            //delete 
                            userRow += "<td></td></tr>";
                        } else {
                            userRow += "<td></td>";
                            userRow += "<td></td></tr>";
                        }
                    }
                }
            }
        }
        document.getElementById("usertable").innerHTML = "<table id=\"UserTable\">" + userRow + "</table>";
    }

    function searchkey() {
        var keyword = document.getElementById("searchbar").value;
        var searchindex = [];
        var searchindex_i = 0;

        if (keyword == "") {
            renderuserlist();
            return;
        }
        var found = "false"
        for (i = 0; i < userlist.length; i++) {
            if (userlist[i].userName.includes(keyword) || userlist[i].firstName.includes(keyword) || userlist[i].lastName.includes(keyword) || userlist[i].phone.includes(keyword) || userlist[i].role.includes(keyword) || userlist[i].company.includes(keyword)) {
                found = "true"
                searchindex[searchindex_i] = i;
                searchindex_i++;
            }
        }
        if (found == "true") {
            rendertablelist(searchindex);
            userrole();
        }
        if (found == "false") {

            document.getElementById("usertable").innerHTML = "No Results found";
        }
    }

    function userrole() {
        var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (currentUser.role == "buyerUser" || currentUser.role == "supplierUser") {
            $(".edit").hide(); //edit user
            $(".delete").hide(); //delete user
            $("#addUsr").hide(); //add user
        }
    }

    function showSupplier() {
        var filter, tbody, tr, td, i;
        tbody = document.getElementById("usertbody");
        tr = tbody.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td.innerHTML.toUpperCase() == "Pearl Bakery") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
        //hide buttons
        $(document).find('.pls_select').hide();
        $(document).find('.btn_del').hide();
        $(document).find('.btn_edit').hide();
        $(document).find('.btn_add').hide();
        $(document).find('.supplier_page').hide();
        $(document).find('.pm_page').show();
    }

    function validation(username, firstname, lastname, phonenumber, role, company, companytype) {
        var currenterrors = "";
        var validationErrorAdds = "";
        var emailFlag = false;
        var phoneFlag = false;
        hasErrors = 0;

        if (!username) {
            $("#validationErrorAdd").show();
            $("#validationErrorAdd").html("UserName Required");
            hasErrors = 1;
            emailFlag = true;
        }
        if (!validateEmail(username) && (!emailFlag)) {

            $("#validationErrorAdd").show();
            currenterrors = document.getElementById("validationErrorAdd").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter username in valid mail format";
                $("#validationErrorAdd").html(currenterrors)
            } else {
                $("#validationErrorAdd").html("Enter username in valid mail format");
            }
            hasErrors = 1;
        }
        if (!firstname) {
            $("#validationErrorAdd").show();
            currenterrors = document.getElementById("validationErrorAdd").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter firstname";
                $("#validationErrorAdd").html(currenterrors);
            } else {
                $("#validationErrorAdd").html("Enter firstname");
            }
            hasErrors = 1;
        }
        if (!lastname) {
            $("#validationErrorAdd").show();
            currenterrors = document.getElementById("validationErrorAdd").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter lastname";
                $("#validationErrorAdd").html(currenterrors);
            } else {
                $("#validationErrorAdd").html("Enter lastname");
            }
            hasErrors = 1;
        }
        if (!phonenumber) {
            $("#validationErrorAdd").show();
            currenterrors = document.getElementById("validationErrorAdd").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter Phone Number";
                $("#validationErrorAdd").html(currenterrors);
            } else {
                $("#validationErrorAdd").html("Enter Phone Number");
            }
            hasErrors = 1;
            phoneFlag = true;
        }

        if (!validatePhonenumber(phonenumber) && (!phoneFlag)) {

            $("#validationErrorAdd").show();
            currenterrors = document.getElementById("validationErrorAdd").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Entered Number format is incorrect";
                $("#validationErrorAdd").html(currenterrors)
            } else {
                $("#validationErrorAdd").html("Sorry, your phonenumber must 10 numerical values in the format 123-456-7898");
            }
            hasErrors = 1;
        }

        if (role == "Role") {
            $("#validationErrorAdd").show();
            currenterrors = document.getElementById("validationErrorAdd").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter role name";
                $("#validationErrorAdd").html(currenterrors);
            } else {
                $("#validationErrorAdd").html("Enter role name");
            }
            hasErrors = 1;
        }
        if (company == "Select Company Name") {
            $("#validationErrorAdd").show();
            currenterrors = document.getElementById("validationErrorAdd").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter company name";
                $("#validationErrorAdd").html(currenterrors)
            } else {
                $("#validationErrorAdd").html("Enter company name");
            }
            hasErrors = 1;
        }
        if (companytype == "Select Company") {
            $("#validationErrorAdd").show();
            currenterrors = document.getElementById("validationErrorAdd").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter company type";
                $("#validationErrorAdd").html(currenterrors)
            } else {
                $("#validationErrorAdd").html("Enter company type");
            }
            hasErrors = 1;
        }

        return hasErrors;
    }

    function editValidation(username, firstname, lastname, phonenumber, role, company) {
        var currenterrors = "";
        var emailFlag = false;
        var phoneFlag = false;
        hasErrors = 0;
        if (!username || username == null) {
            $("#validationErrorEdit").show();
            $("#validationErrorEdit").html("UserName Required");
            hasErrors = 1;
            emailFlag = true;
        }
        if (!validateEmail(username) && (!emailFlag)) {

            $("#validationErrorEdit").show();
            currenterrors = document.getElementById("validationErrorEdit").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter username in valid mail format";
                $("#validationErrorEdit").html(currenterrors)
            } else {
                $("#validationErrorEdit").html("Enter username in valid mail format");
            }
            hasErrors = 1;
        }
        if (!firstname || firstname == null) {
            $("#validationErrorEdit").show();
            currenterrors = document.getElementById("validationErrorEdit").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter firstname";
                $("#validationErrorEdit").html(currenterrors);
            } else {
                $("#validationErrorEdit").html("Enter firstname");
            }
            hasErrors = 1;
        }
        if (!lastname || lastname == null) {

            $("#validationErrorEdit").show();
            currenterrors = document.getElementById("validationErrorEdit").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter lastname";
                $("#validationErrorEdit").html(currenterrors);
            } else {
                $("#validationErrorEdit").html("Enter lastname");
            }
            hasErrors = 1;
        }
        if (!phonenumber || phonenumber == null) {
            $("#validationErrorEdit").show();
            currenterrors = document.getElementById("validationErrorEdit").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter Phone Number";
                $("#validationErrorEdit").html(currenterrors);
            } else {
                $("#validationErrorEdit").html("Enter Phone Number");
            }
            hasErrors = 1;
            phoneFlag = true;
        }

        if (!validatePhonenumber(phonenumber) && (!phoneFlag)) {

            $("#validationErrorEdit").show();
            currenterrors = document.getElementById("validationErrorEdit").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Entered Number format is incorrect";
                $("#validationErrorEdit").html(currenterrors)
            } else {
                $("#validationErrorEdit").html("Sorry, your phonenumber must 10 numerical values in the format 123-456-7898");
            }
            hasErrors = 1;
        }
        if (role == "Role" || role == "") {
            $("#validationErrorEdit").show();
            currenterrors = document.getElementById("validationErrorEdit").innerHTML;
            if (currenterrors) {
                currenterrors = currenterrors + ", Enter role name";
                $("#validationErrorEdit").html(currenterrors);
            } else {
                $("#validationErrorEdit").html("Enter role name");
            }
            hasErrors = 1;
        }

        return hasErrors;
    }
