(function(){

	function initRequest(){
		var xmlhttp;
		if(window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.onreadystatechange = processRequest;
		xmlhttp.open("GET","http://localhost:3000/productsInCart", true);
		xmlhttp.send();
	}

	function processRequest(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = xmlhttp.responseText;
		}
	}

})();