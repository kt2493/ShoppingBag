(function() {

    var modal = Utility.getElement("#productModal");

    Utility.getObject(function(productData) {
        renderDivision(productData);
    });

    function renderDivision(productData) {
        var containerData = "",
            expenseData = "",
            noOfItems = Utility.getElement(".no-of-items")[0],
            cartItems = Utility.getElement("#cart-items"),
            subTotalAmount = 0;
        productData.forEach(function(product) {
            containerData += "<div class='product'><div class='product-image'>" +
                "<img src='" + product.p_img + "' alt='" + product.p_name + "'></div>" +
                "<div class='product-description'>" +
                "<p class='product-name'>" + product.p_name + "</p>" +
                "<p class='product-details'>Style # " + product.p_style + "</p>" +
                "<p class='product-details'>Color : " + product.p_selected_color.name + "</p>" +
                "<p class='product-details product-specs display-block'><span>Size:</span>" + product.p_selected_size.code + "</p>" +
                "<p class='product-details product-specs display-block'>QTY: <span class='quantity'>" + product.p_quantity + "</span></p>" +
                "<div class='discounted-price  product-specs display-block'>" +
                "<p class='original-price product-specs'><span class='dollar-symbol'>" + product.c_currency +
                "</span><del>" + product.p_originalprice + "</del></p>" +
                "<p class='offer-price'><span class='dollar-symbol'>" + product.c_currency +
                "</span>" + product.p_price + "</p></div></div>" +
                "<div class='user-options'>" +
                "<a href='#' data-id='" + product.p_id + "' class='edit'>EDIT</a>" +
                "<a href='#'>x REMOVE</a>" +
                "<a href='#'>SAVE FOR LATER</a></div></div><hr>";
            subTotalAmount += product.p_price * product.p_quantity;
        });
        noOfItems.innerHTML = productData.length + " ITEMS";
        cartItems.innerHTML = containerData;
        calculateBill(subTotalAmount, productData);
        bindEvent(productData);
    }

    function calculateBill(subTotalAmount, productData) {
        var subtotal = Utility.getElement("#subtotal"),
            shippingCharge = Utility.getElement("#shipping-charge"),
            promoDiscount = Utility.getElement("#promo-discount"),
            total = Utility.getElement("#total"),
            shippingCharges = 0,
            promocodeDiscount = 0,
            totalBill = 0;
        if (subTotalAmount >= 50) {
            shippingCharges = 0;
            shippingCharge.innerHTML = "FREE";
        } else {
            shippingCharges = 10;
            shippingCharge.innerHTML = "$" + shippingCharges;
        }
        if (productData.length == 3)
            promocodeDiscount = subTotalAmount * .05;
        else if (productData.length > 3 && productData.length <= 9)
            promocodeDiscount = subTotalAmount * .10;
        else if (productData.length > 9)
            promocodeDiscount = subTotalAmount * .25;
        totalBill = subTotalAmount + shippingCharges - promocodeDiscount;
        subtotal.innerHTML = "$" + subTotalAmount;
        promoDiscount.innerHTML = "- $" + promocodeDiscount;
        total.innerHTML = "$" + totalBill;
    }

    function bindEvent(productData) {
        var edit = Utility.getElement(".edit"),
            target;
        for (var i = 0; i < edit.length; i++) {
            edit[i].addEventListener("click", editProductHandler);
            edit[i].data = productData;
        }
        window.addEventListener("click", function() {
            if (event.target == modal) {
                modal.classList.remove("display-block");
                modal.classList.add("hide");
            }
        });
    }

    function editProductHandler() {
        modal.classList.remove("hide");
        modal.classList.add("display-block");
        productData = event.currentTarget.data;
        pid = this.getAttribute("data-id");
        populateModal(productData, pid);
    }

    function populateModal(productData, pid) {
        var modal = Utility.getElement("#productModal"),
            modalData = "";
        productData.forEach(function(product) {
            if (product.p_id == pid) {
                modalData += "<div class='modal-content'><div class='modal-details'>" +
                    "<p>" + product.p_name + "</p><p>" + product.c_currency + product.p_originalprice +
                    "</p><p class='modal-specs'><select name='Size' id='size'>";

                for (var i = 0; i < product.p_available_options.sizes.length; i++) {
                    modalData += "<option value='" + product.p_available_options.sizes[i].code + "'>" +
                        product.p_available_options.sizes[i].code + "</option>";
                }
                modalData += "</select></p><p class='modal-specs'>QTY" +
                    "<select name='quantity' id='quantity'><option value='1'>1</option>" +
                    "<option value='2'>2</option><option value='3'>3</option>" +
                    "<option value='4'>4</option></select></p>" +
                    "<p><button id='modal-edit-button'>EDIT</button></p>" +
                    "<p><a href='#''>See Product Details</a></p></div>" +
                    "<div class='modal-details'><img src='" + product.p_img + "' alt='" + product.p_name + "'>" +
                    "</div><p class='close'>&times;</p></div> ";
            }
        });
        modal.innerHTML = modalData;
        var editButton = Utility.getElement("#modal-edit-button"),
            closeModal = Utility.getElement(".close");
        editButton.addEventListener("click", editButtonHandler);
        editButton.data = productData;
        editButton.pid = pid;

        for (var i = 0; i < closeModal.length; i++) {
            closeModal[i].addEventListener("click", function() {
                modal.classList.remove("display-block");
                modal.classList.add("hide");
            });
        }
    }

    function editButtonHandler() {
        var quantity = Utility.getElement("#quantity").value,
            size = Utility.getElement("#size").value;
        productData = event.currentTarget.data;
        pid = event.currentTarget.pid;
        modal.classList.remove("display-block");
        modal.classList.add("hide");

        for (var i = 0; i < productData.length; i++) {
            if (productData[i].p_id == pid) {
                productData[i].p_selected_size.code = size;
                productData[i].p_quantity = quantity;
                break;
            }
        }
        Utility.putObject(productData[i], function() {});
        renderDivision(productData);
    }

})();