(function(){

	// function initRequest(){
	// 	var xmlhttp;
	// 	if(window.XMLHttpRequest)
	// 		xmlhttp = new XMLHttpRequest();
	// 	else
	// 		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	// 	xmlhttp.onreadystatechange = processRequest;
	// 	xmlhttp.open("GET","http://localhost:3000/productsInCart", true);
	// 	xmlhttp.send();
	// }

	// function processRequest(){
	// 	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	// 		var data = xmlhttp.responseText;
	// 	}
	// }


	var element = app.getElement("#test");
	console.log(element);
	var edit = document.getElementsByClassName("edit");
	var modal = document.getElementById("productModal");
	var closeModal = document.getElementsByClassName("close")[0];
	
	for(var i=0 ; i<edit.length;i++){
		edit[i].addEventListener("click", function(){
			// console.log("Clicked");
			modal.classList.remove("display-none");
			modal.classList.add("display-block");
		});
	}
	
	closeModal.addEventListener("click",function(){
		modal.classList.remove("display-block");
		modal.classList.add("display-none");
	});

	window.addEventListener("click", function(){
		if (event.target == modal) {
			modal.classList.remove("display-block");
        	modal.classList.add("display-none");
    	}
	});
	app.getObject("productsInCart", function(productData) {
        renderDivision(productData);
    });
    function renderDivision(productData){
    	var containerData = "";
    	// console.log(productData);
    	for(var i=0;i<productData.length;i++){
    		containerData += productData[i].p_id;
    		// console.log(containerData);
    		// console.log(productData.length);
    	}
    }

})();