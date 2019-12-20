
$('#quantity').change(function () {
    alert("e");
    updateQuantity(this);
});

function updateQuantity(quantityInput) {   
    var quantity = $(quantityInput).text();
    alert(quantity);
    
}


$("select")
    .change(function () {
        var str = "";
        $("select option:selected").each(function () {
            str += $(this).text() + " ";
        });
        $("div").text(str);
    })
    .change();

$(document).on("click", ".remove button", function () {
    removeItem(this);
});