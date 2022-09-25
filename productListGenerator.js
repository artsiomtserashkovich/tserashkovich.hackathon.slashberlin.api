const axios = require("axios");

// set up the request parameters
const params = {
    api_key: "F946DE62179446BDA20F414F65E78D3B",
    type: "search",
    amazon_domain: "amazon.com",
    search_term: "memory cards",
    sort_by: "price_high_to_low",
};

const productArray = [];
// make the http GET request to Rainforest API
axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((response) => {
        // print the JSON response from Rainforest API
        response.data.search_results.forEach((product) => {
            // if product.price is null exit

            const data = {
                asin: product.asin,
                title: product.title,
                image: product.image,
                price: product.price,
            };
            // add the data to a array
            productArray.push(data);
        });
        console.log(productArray);
    })
    .catch((error) => {
        // catch and print the error
        console.log(error);
    });
