$(document).ready(function () {
    var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser.role == "superAdmin" || currentUser.role == "supplierAdmin" || currentUser.role == "supplierUser") {
        $("#cart").hide(); //shopping cart button
        $('.container-card-button').hide(); //shopping cart button
        $('.btn').hide(); //shopping cart button
    }

    if (currentUser.role == "buyerUser" || currentUser.role == "buyerAdmin" || currentUser.role == "supplierAdmin" || currentUser.role == "supplierUser") {
        $("#addproduct").hide(); //add product
    }

    if (currentUser.role == "buyerUser") {
        $(".edit").hide(); //edit user
        $(".delete").hide(); //delete user
        $("#addUsr").hide(); //add user
        $(".addcompany").hide(); //add company
        $("#editcompany").hide(); // edit company
        $("#deletecompany").hide(); //delete company
        $(".edit").hide(); //edit product
        $(".delete").hide(); //delete product
    }

    if (currentUser.role == "supplierUser") {
        $("#editcompany").hide(); // edit company
    }

});