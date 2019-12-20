$("input[type=password]").keyup(function(){
    var ucase = new RegExp("[A-Z]+");
	var lcase = new RegExp("[a-z]+");
	var num = new RegExp("[0-9]+");
	
	if($("#password1").val().length >= 8){
		$("#8char").removeClass("glyphicon-remove");
		$("#8char").addClass("glyphicon-ok");
		$("#8char").css("color","#00A41E");
	}else{
		$("#8char").removeClass("glyphicon-ok");
		$("#8char").addClass("glyphicon-remove");
		$("#8char").css("color","#FF0004");
	}
	
	if(ucase.test($("#password1").val())){
		$("#ucase").removeClass("glyphicon-remove");
		$("#ucase").addClass("glyphicon-ok");
		$("#ucase").css("color","#00A41E");
	}else{
		$("#ucase").removeClass("glyphicon-ok");
		$("#ucase").addClass("glyphicon-remove");
		$("#ucase").css("color","#FF0004");
	}
	
	if(lcase.test($("#password1").val())){
		$("#lcase").removeClass("glyphicon-remove");
		$("#lcase").addClass("glyphicon-ok");
		$("#lcase").css("color","#00A41E");
	}else{
		$("#lcase").removeClass("glyphicon-ok");
		$("#lcase").addClass("glyphicon-remove");
		$("#lcase").css("color","#FF0004");
	}
	
	if(num.test($("#password1").val())){
		$("#num").removeClass("glyphicon-remove");
		$("#num").addClass("glyphicon-ok");
		$("#num").css("color","#00A41E");
	}else{
		$("#num").removeClass("glyphicon-ok");
		$("#num").addClass("glyphicon-remove");
		$("#num").css("color","#FF0004");
	}
	
	if($("#password1").val() == $("#password2").val()){
		$("#pwmatch").removeClass("glyphicon-remove");
		$("#pwmatch").addClass("glyphicon-ok");
		$("#pwmatch").css("color","#00A41E");
	}else{
		$("#pwmatch").removeClass("glyphicon-ok");
		$("#pwmatch").addClass("glyphicon-remove");
		$("#pwmatch").css("color","#FF0004");
	}
});

$(function () {
    $("form[id='passwordForm']").validate({
        rules: {
            password1: "required",
            password2: "required"
        },
        messages: {
            password1: "Please enter the new password",
            password2: "Please enter the repeat password",
        },
        submitHandler: function (form) {
            var flag = false;
            flag = checkPasswordMatch();
            if (flag == 1) {
                alert("Password changed successfully");
                var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
                if (currentUser.role == "superAdmin") {
                    window.location.href = "UserMgmt.html";
                } else if (currentUser.role == "buyerAdmin") {
                    window.location.href = "productmanagement.html";
                } else if (currentUser.role == "buyerUser") {
                    window.location.href = "productmanagement.html";
                } else if (currentUser.role == "supplierAdmin") {
                    window.location.href = "productmanagement.html";
                } else if (currentUser.role == "supplierUser") {
                    window.location.href = "productmanagement.html";
                }
            }
            else if (flag == 0){
                alert("New Password not matching");
            }
            else if (flag == 2) {
                alert("Old Password cannot be given. Please give new password");
            }
            //form.submit();
        }
    });

    function checkPasswordMatch() {
        var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        var userlist = JSON.parse(sessionStorage.getItem("userlist"));
        var password1 = document.getElementById("password1").value;
        var password2 = document.getElementById("password2").value;
        var flag = 0;
        if (password1 == password2 && (password1 == currentUser.password) || (password2 == currentUser.password)) {
            flag = 2;
        }
        else if (password1 == password2) {
            flag = 1;
        }
        if (flag == 1) {
            for (var i = 0; i < userlist.length; i++) {
                if (currentUser.userName == userlist[i].userName) {
                    userlist[i].password = password2;
                    userlist[i].failureLogin = 0;
                    sessionStorage.setItem("userlist", JSON.stringify(userlist));
                }
            }
        }
        return flag;
    }
});