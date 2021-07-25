// Background script gets executed after the launch of browser
var data = {};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == 'signup') {
        console.log('A user with the following info tried to sign up: ', message.data);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/user/signup", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        //xhttp.responseType = 'json';
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Response
                var response = this.response;
                console.log(response);
                var temp = {
                    "status": this.status
                }
                sendResponse(temp);
            }

            if (this.readyState == 4 && this.status == 400) {
                var response = this.response;
                console.log(response);
                var temp = {
                    "status": this.status
                }
                sendResponse(temp);
            }

            if (this.readyState == 4 && this.status == 500) {
                var response = this.response;
                console.log(response);
                var temp = {
                    "status": this.status
                }
                sendResponse(temp);
            }
        };
        data = message.data;
        xhttp.send(JSON.stringify(data));
        return true;
    }
    else if (message.type == 'login') {
        console.log('A user with the following info tried to login: ', message.data);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/user/login", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        //xhttp.responseType = 'json';
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                // Response
                var response = this.response;
                console.log(response);
                var temp = {
                    "status": this.status
                }
                sendResponse(temp);
            }

            if (this.readyState == 4 && this.status == 400) {
                var response = this.response;
                console.log(response);
                var temp = {
                    "status": this.status
                }
                sendResponse(temp);
            }

            if (this.readyState == 4 && this.status == 500) {
                var response = this.response;
                console.log(response);
                var temp = {
                    "status": this.status
                }
                sendResponse(temp);
            }
        };
        data = message.data;
        xhttp.send(JSON.stringify(data));
        return true;
    }
    else if (message.type == "product") {
        console.log('A product of following info is trying to reach to database', message.data);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/product/add", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                // Response
                var response = this.response;
                if (response.type == "notify") {
                    // we should notify about price drop
                    let title = 'Price dropped of ' + message.data.title;
                    let id = "PRICE_DROP_" + Math.floor(Math.random * 100)
                    let msg = "Price" + " dropped from ₹" + response.oldPrice + " to ₹" + message.data.cost;
                    chrome.notifications.create(id, {
                        type: "basic",
                        iconUrl: 'data:image/png;base64,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',
                        title: title,
                        message: msg
                    })
                }
                else if (response.type == "saved") {
                    // new product added to database
                }
                else if (response.type == "notify_available") {
                    // product was previously out of stock and now available
                    let title = message.data.title + ' is now availabe to buy';
                    let id = "PRICE_DROP_" + Math.floor(Math.random * 100)
                    let msg = "This product is availabe to buy at ₹" + message.data.cost;
                    chrome.notifications.create(id, {
                        type: "basic",
                        iconUrl: 'data:image/png;base64,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',
                        title: title,
                        message: msg
                    })
                }
                console.log(response);
                sendResponse(response);
            }

            if (this.readyState == 4 && this.status == 400) {
                var response = this.response;
                console.log(response);
                sendResponse(response);
            }

            if (this.readyState == 4 && this.status == 500) {
                var response = this.response;
                console.log(response);
                sendResponse(response);
            }
        };
        data = message.data;
        xhttp.send(JSON.stringify(data));
        return true;
    }

})
console.log('Background Script running....!');