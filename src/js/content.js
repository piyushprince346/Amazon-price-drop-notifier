// content script is a code that executes after a web page loads, so that we can work/ 
// manipulate with the content of the web page itself
// alert('Welcome to Amazon Price Drop Notifier.....!')
let products = document.querySelectorAll('.g-item-details')
var FetchCost = function (cost) {
    let price = "";
    try {
        for (let i = 0; i < cost.length; i++) {
            if (cost[i] == '₹' || cost[i] == ',') {
                continue;
            }
            else if (cost[i] == ' ') {
                break;
            }
            else {
                price = price + cost[i];
            }

        }
        return price;
    }
    catch (err) {
        return 0;
    }

}
for (i = 0; i < products.length; i++) {
    let item = {
        "data": {
            "title": null,
            "cost": null
        },
        "type": "product"
    };
    let cleanedUpValues = products[i].innerText.split("\n");
    item.data.title = cleanedUpValues[0];
    item.data.cost = parseFloat(FetchCost(cleanedUpValues[4]));
    chrome.runtime.sendMessage(item, (res) => {
        console.log(res); // response which we got from the background.js
    });
    console.log(item);
}
console.log('Welcome to here..!');
// let paragraphs = document.getElementsByTagName('h2');
// for (ele of paragraphs) {
//     ele.style['background-color'] = '#5ac7c7';
// }

// let images = document.getElementsByTagName('img')
// for (image of images) {
//     image.src = 'data:image/jpeg;base64,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'
// }
