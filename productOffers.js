const axios = require("axios");

// needs to recieve asim and amazon domain then change params.
// current are for testing purposes

// set up the request parameters

getOffers("amazon.com", "B073JYC4XM");

function getOffers(amazon_domain, asin) {
    const params = {
        api_key: "EBB9CA733E4F49F38A71ED2E7A4062AD",
        type: "offers",
        amazon_domain: amazon_domain,
        asin: asin,
    };
    // make the http GET request to Rainforest API
    axios
        .get("https://api.rainforestapi.com/request", { params })
        .then((response) => {
            data = {
                condition: response.data.offers[0].condition.title,
                price: response.data.offers[0].price.value,
                deliveryDate: response.data.offers[0].delivery.comments,
                deliveryPrice: response.data.offers[0].delivery.price.raw,
            };
            console.log(data);
        })
        .catch((error) => {
            // catch and print the error
            console.log(error);
        });
}
