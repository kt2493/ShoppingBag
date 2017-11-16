var Utility = {
	required_data: "",
	initRequest: function() {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    },
    ajaxRequest: function(type, data, callback) {
        var xhr = (typeof xhr === 'undefined') ? this.initRequest() : xhr;
        var url = "http://localhost:3000/productsInCart";
        xhr.open(type, url, true);
        xhr.setRequestHeader("Content-Type", 'application/json');
        data = JSON.stringify(data);
        xhr.send(data);
        xhr.onreadystatechange = (function(xhr, callback) {
            return function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (callback) {
                        callback(xhr);
                    }
                }
            }
        })(xhr, callback);

    },
    getObject: function(Func) {

        this.ajaxRequest("GET", null, function(xhr) {
            if (xhr == 404 || xhr == "error") {
                Func(null);
            } else {
                required_data = JSON.parse(xhr.responseText);
                Func(required_data);
            }

        });
    },

    putObjectById: function(url, data, Func) {
        this.ajaxRequest("PUT", data, function(xhr) {
            if (xhr == 404 || xhr == "error") {
                Func(null);
            } else {
                required_data = JSON.parse(xhr.responseText);
                Func(required_data);
            }
        });
    },
    
    getElement: function(selector) {
        var element;
        if ((selector.charAt(0)) == '#') {
            element = document.getElementById(selector.slice(1));
        } else if ((selector.charAt(0)) == '.') {
            element = document.getElementsByClassName(selector.slice(1));
        } else {
            element = document.getElementsByTagName(selector);
        }
        return element;
    }
}