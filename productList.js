const axios = require("axios");

// import params from "./params.json";
// const params =  JSON.parse(params);

/*
set up the request parameters should be in the format
const params = {
    api_key: "66263EFAEB4743E6B2AAB46DDBBD3364",
    type: "search",
    amazon_domain: "AMAZON_DOMAIN / amazon.(countryCode)",
    search_term: "SEARCH_TERM",
    sort_by: "SORT_PREFERENCES",
};
*/

const params = {
    api_key: "EBB9CA733E4F49F38A71ED2E7A4062AD",
    type: "search",
    amazon_domain: "amazon.de",
    search_term: "macbook",
};

const products = [];
var chosenProduct;

// make the http GET request to Rainforest API
axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((response) => {
        // print the JSON response from Rainforest API
        // const object = JSON.stringify(response.data, 0, 2);

        // for each product in the response data add the title, image and price to a object named data
        response.data.search_results.forEach((product) => {
            // if product.price is null exit
            if (product.price === undefined) {
                return;
            }

            const data = {
                asin: product.asin,
                title: product.title,
                image: product.image,
                price: product.price.value,
            };
            // add the data to a array
            products.push(data);
        });

        // print array of products

        console.log(products);
        // export the array of products
        exports.products = products;
    })
    .catch((error) => {
        // catch and print the error
        console.log(error);
    });

// function to search for a product
async function searchProduct(asin) {
    const params = {
        api_key: "EBB9CA733E4F49F38A71ED2E7A4062AD",
        type: "product",
        amazon_domain: "amazon.de",
        asin: asin,
    };

    // make the http GET request to Rainforest API
    axios
        .get("https://api.rainforestapi.com/request", { params })
        .then((response) => {
            // print the JSON response from Rainforest API
            // console.log(JSON.stringify(response.data, 0, 2));
            // console.log(response.data);

            const product = {
                brand: response.data.product.brand,
                description: response.data.product.description,
                asin: response.data.product.asin,
            };
            // find the product in the array of products using the asin and add the brand and description to the product
            var chosenProduct;
            products.forEach((product) => {
                if (product.asin == asin) {
                    chosenProduct = product;

                    chosenProduct.brand = response.data.product.brand;
                    chosenProduct.description =
                        response.data.product.description;
                    console.log(chosenProduct);
                }
            });
            // console.log(response);
        })
        .catch((error) => {
            // catch and print the error
            console.log(error);
        });
}
