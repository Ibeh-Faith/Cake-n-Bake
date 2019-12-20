﻿var companyArray = [];
var selectedIndex = -1;
var hasErrors = 0;
var user = JSON.parse(sessionStorage.getItem("currentUser"));;

$(document).ready(function(){
	init();
});
function init() {
    document.getElementById("tableRows").innerHTML = "";
    if (sessionStorage.companyRecords) {
        companyArray = JSON.parse(sessionStorage.companyRecords);

    for (var i = 0; i < companyArray.length; i++) {
        prepareTableCell(
            i,
            companyArray[i].companyName,
            companyArray[i].companyEmail,
            companyArray[i].companyPhone,
            companyArray[i].companyOwner,
            companyArray[i].companyStreet,
            companyArray[i].companyCity,
            companyArray[i].companyState,
            companyArray[i].companyCountry,
            companyArray[i].companyDUNS,
            companyArray[i].companyType,)
    }
   }
}
function onAddPressed() {
	toggleValidation();
	
    var companyName = document.getElementById("companyName").value;
    var companyEmail = document.getElementById("companyEmail").value;
    var companyPhone = document.getElementById("companyPhone").value;
    var companyOwner = document.getElementById("companyOwner").value;
    var companyStreet = document.getElementById("companyStreet").value;
    var companyCity = document.getElementById("companyCity").value;
    var companyState = document.getElementById("companyState").value;
    var companyCountry = document.getElementById("companyCountry").value;
    var companyDUNS = document.getElementById("companyDUNS").value;
    var companyType = document.getElementById("companyType").value;


    var companyObj = {
        companyName: companyName,
        companyEmail: companyEmail,
        companyPhone: companyPhone,
        companyOwner: companyOwner,
        companyStreet: companyStreet,
        companyCity: companyCity,
        companyState: companyState,
        companyCountry: companyCountry,
        companyDUNS: companyDUNS,
        companyType: companyType,

    };
	
	var foundError = validation(companyName, companyEmail, companyPhone, companyOwner, companyStreet, companyCity, companyState, companyCountry, companyDUNS, companyType)

    if (foundError) { return false; }

	companyArray.push(companyObj);
    sessionStorage.companyRecords = JSON.stringify(companyArray);
	console.log("Called")
    init();
    onClearPressed("add");
	$('#addCompany').modal('toggle'); 
	
}

function prepareTableCell(
    index,
    companyName,
    companyEmail,
    companyPhone,
    companyOwner,
    companyStreet,
    companyCity,
    companyState,
    companyCountry,
    companyDUNS,
    companyType,
    companyUser)
{

    var table = document.getElementById("tableRows");
    var row = table.insertRow();

    var companyNameCell = row.insertCell(0);
    var companyEmailCell = row.insertCell(1);
    var companyPhoneCell = row.insertCell(2);
    var companyOwnerCell = row.insertCell(3);
    var companyStreetCell = row.insertCell(4);
    var companyCityCell = row.insertCell(5);
    var companyStateCell = row.insertCell(6);
    var companyCountryCell = row.insertCell(7);
    var companyDUNSCell = row.insertCell(8);
    var companyTypeCell = row.insertCell(9);
    var editCell = row.insertCell(10);
    var deleteCell = row.insertCell(11);

    companyNameCell.innerHTML = companyName;
    companyEmailCell.innerHTML = companyEmail;
    companyPhoneCell.innerHTML = companyPhone;
    companyOwnerCell.innerHTML = companyOwner;
    companyStreetCell.innerHTML = companyStreet;
    companyCityCell.innerHTML = companyCity;
    companyStateCell.innerHTML = companyState;
    companyCountryCell.innerHTML = companyCountry;
    companyDUNSCell.innerHTML = companyDUNS;
    companyTypeCell.innerHTML = companyType;
	
    
		editCell.innerHTML = '<button class="btn btn-success btm-sm" onclick="onEditPressed(' + index + ')" data-toggle="modal" data-target="#editCompany" id="#editcompany"><i class="fa fa-pencil-square-o"></i></button>'
		deleteCell.innerHTML = '<button class="btn btn-danger btm-sm" onclick="onDeletePressed(' + index + ')" data-toggle="modal" data-target="#deleteCompany" id="#deletecompany"><i class="fa fa-trash-o"></i></button>'; 

}

function deleteTableRow() {
	var index = document.getElementById("deleteIndex").value;
    companyArray.splice(index, 1);
    sessionStorage.companyRecords = JSON.stringify(companyArray);
    init();
}

function onClearPressed(value) {
    selectedIndex = -1;

    if (value == "add") {
        document.getElementById("companyName").value = "";
        document.getElementById("companyEmail").value = "";
        document.getElementById("companyPhone").value = "";
        document.getElementById("companyOwner").value = "";
        document.getElementById("companyStreet").value = "";
        document.getElementById("companyCity").value = "";
        document.getElementById("companyState").value = "";
        document.getElementById("companyCountry").value = "";
        document.getElementById("companyDUNS").value = "";
        document.getElementById("companyType").value = "";
    } else if (value == "edit") {
        document.getElementById("companyNameEdit").value = "";
        document.getElementById("companyEmailEdit").value = "";
        document.getElementById("companyPhoneEdit").value = "";
        document.getElementById("companyOwnerEdit").value = "";
        document.getElementById("companyStreetEdit").value = "";
        document.getElementById("companyCityEdit").value = "";
        document.getElementById("companyStateEdit").value = "";
        document.getElementById("companyCountryEdit").value = "";
        document.getElementById("companyDUNSEdit").value = "";
        document.getElementById("companyTypeEdit").value = "";
    }
    

}

function onEditPressed(index) {
    selectedIndex = index;

    var companyObj = companyArray[index];
    console.log(companyArray[index]);
    console.log(index);

    document.getElementById("indexHiddenEdit").value = selectedIndex;
    document.getElementById("companyNameEdit").value = companyObj.companyName;
    document.getElementById("companyEmailEdit").value = companyObj.companyEmail;
    document.getElementById("companyPhoneEdit").value = companyObj.companyPhone;
    document.getElementById("companyOwnerEdit").value = companyObj.companyOwner;
    document.getElementById("companyStreetEdit").value = companyObj.companyStreet;
    document.getElementById("companyCityEdit").value = companyObj.companyCity;
    document.getElementById("companyStateEdit").value = companyObj.companyState;
    document.getElementById("companyCountryEdit").value = companyObj.companyCountry;
    document.getElementById("companyDUNSEdit").value = companyObj.companyDUNS;
    document.getElementById("companyTypeEdit").value = companyObj.companyType;
   

}

function onUpdatePressed() {
    selectedIndex = document.getElementById("indexHiddenEdit").value;
    var companyObj = {
        companyName: document.getElementById("companyNameEdit").value,
        companyEmail: document.getElementById("companyEmailEdit").value,
        companyPhone: document.getElementById("companyPhoneEdit").value,
        companyOwner: document.getElementById("companyOwnerEdit").value,
        companyStreet: document.getElementById("companyStreetEdit").value,
        companyCity: document.getElementById("companyCityEdit").value,
        companyState: document.getElementById("companyStateEdit").value,
        companyCountry: document.getElementById("companyCountryEdit").value,
        companyDUNS: document.getElementById("companyDUNSEdit").value,
        companyType: document.getElementById("companyTypeEdit").value,

    };
	
	var foundError = editValidation(companyObj.companyName, companyObj.companyEmail, companyObj.companyPhone, companyObj.companyOwner, companyObj.companyStreet, companyObj.companyCity, companyObj.companyState, companyObj.companyCountry, companyObj.companyDUNS, companyObj.companyType);
	if (foundError) { return; }
	
    if (selectedIndex === -1) {
        companyArray.push(companyObj);
    }
    else {
        companyArray.splice(selectedIndex, 1, companyObj);
    }

    sessionStorage.companyRecords = JSON.stringify(companyArray);
    init();
    onClearPressed("edit");
	$('#editCompany').modal('toggle'); 
}

function onDeletePressed(index) {
	document.getElementById("deleteIndex").value = index;
}

function validation(companyName, companyEmail, companyPhone, companyOwner, companyStreet, companyCity, companyState, companyCountry, companyDUNS, companyType) {
    var currenterrors = "";
    var validationErrorAdds = "";
    hasErrors = 0;

    if (!companyName) {
        $("#validationErrorAdd").show()
        $("#validationErrorAdd").html("Comapany Name Required")
        hasErrors = 1;
    }
    if (!companyEmail) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Email address"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Enter Email address")
        }
        hasErrors = 1;
    }
    var checkEmail = validateEmail(companyEmail)

    if (!validateEmail(companyEmail)) {

        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Entered Email address is wrong"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Enter A Valid Email Format")
        }
        hasErrors = 1;
    }

    if (!companyPhone) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Phone Number"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Enter Phone Number")
        }
        hasErrors = 1;
    }

    var phoneError = validatePhone(companyPhone)

    if (!validatePhone(companyPhone)) {

        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Entered Number format is incorrect"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Entered Number format is incorrect - Please use this(eg:123-456-7898)format.")
        }
        hasErrors = 1;
    }

    if (!companyOwner) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Owner Name"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Enter Owner Name")
        }
        hasErrors = 1;
    }
    if (!companyStreet) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Street Address "
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Enter Street Address ")
        }
        hasErrors = 1;
    }
    if (!companyCity) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter City Name"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Enter City Name")
        }
        hasErrors = 1;
    }
    var statechr = companyState
    var chrlen = statechr.length;

    if (chrlen > 2) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Select State"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Select State")
        }
        hasErrors = 1;
    }
    
    if (!companyCountry) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Country Name"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Enter Country Name")
        }
        hasErrors = 1;
    }
    if (!companyDUNS) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter DUNS Number"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Enter DUNS Number")
        }
        hasErrors = 1;
    }
    var duns = validateDUNS(companyDUNS)

    if (!validateDUNS(companyDUNS)) {

        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", DUNS Format Incorrect"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("DUNS Format Incorrect - Please use Numbers")
        }
        hasErrors = 1;
    }
    if (!companyType) {
        $("#validationErrorAdd").show()
        currenterrors = document.getElementById("validationErrorAdd").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Select Company Type"
            $("#validationErrorAdd").html(currenterrors)
        } else {
            $("#validationErrorAdd").html("Select Company Type")
        }
        hasErrors = 1;
    }

    return hasErrors;
}

function editValidation(companyName, companyEmail, companyPhone, companyOwner, companyStreet, companyCity, companyState, companyCountry, companyDUNS, companyType) {
    var currenterrors = "";
    var validationErrorEdits = "";
    hasErrors = 0;


    if (!companyName) {
        $("#validationErrorEdit").show()
        $("#validationErrorEdit").html("Company Name Required")
        hasErrors = 1;
    }
    if (!companyEmail) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Email address"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Enter Email address")
        }
        hasErrors = 1;
    }
    var checkEmail = validateEmail(companyEmail)

    if (!validateEmail(companyEmail)) {

        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Entered Email address format is worng"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Entered Email address format is worng")
        }
        hasErrors = 1;
    }

    if (!companyPhone) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Phone Number"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Enter Phone Number")
        }
        hasErrors = 1;
    }
    if (!validatePhone(companyPhone)) {

        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Entered Number format is incorrect"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Entered Number format is incorrect - Please use this(eg:123-456-7898) format.")
        }
        hasErrors = 1;
    }

    if (!companyOwner) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Owner Name"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Enter Owner Name")
        }
        hasErrors = 1;
    }
    if (!companyStreet) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Street address"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html(" Enter Street address")
        }
        hasErrors = 1;
    }
    if (!companyCity) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter City Name"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Enter City Name")
        }
        hasErrors = 1;
    }
    var statechr = companyState
    var chrlen = statechr.length;

    if (chrlen > 2) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Select State"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Select State")
        }
        hasErrors = 1;
    }
    if (!companyCountry) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter Country Name"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Enter Country Name")
        }
        hasErrors = 1;
    }
    if (!companyDUNS) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Enter DUNS Number"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Enter DUNS Number")
        }
        hasErrors = 1;
    }
    if (!validateDUNS(companyDUNS)) {

        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Entered DUNS Format is worng"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Entered DUNS Format is worng - Please Enter Numbers")
        }
        hasErrors = 1;
    }
    if (!companyType) {
        $("#validationErrorEdit").show()
        currenterrors = document.getElementById("validationErrorEdit").innerHTML
        if (currenterrors) {
            currenterrors = currenterrors + ", Select Company Type"
            $("#validationErrorEdit").html(currenterrors)
        } else {
            $("#validationErrorEdit").html("Select Company Type")
        }
        hasErrors = 1;
    }

    return hasErrors;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePhone(phone) {
    var phoneformat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (phone.match(phoneformat)) {
        return true;
    }
    else {
          return false;
    }
}

function validateDUNS(duns){
    var isNumber = !/\D/.test(duns)

    if(isNumber){
        return true;
    }else{
        return false;
    }
}

function toggleValidation() {
    $("#validationErrorAdd, #validationErrorEdit").html('');
    $("#validationErrorAdd, #validationErrorEdit").hide();
    hasErrors = 0;
}






