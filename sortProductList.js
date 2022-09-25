const axios = require("axios");

const productArray = getProductArray();
console.log(productArray);
console.log(searchProduct("amazon.de", "B09JQZZRZ7"));
console.log(getOffers("amazon.de", "B09JQZZRZ7"));

// export the getProductArray function
function getProductArray() {
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
        })
        .catch((error) => {
            // catch and print the error
            console.log(error);
        });
}

function searchProduct(amazon_domain, asin) {
    const params = {
        api_key: "F946DE62179446BDA20F414F65E78D3B",
        type: "product",
        amazon_domain: amazon_domain,
        asin: asin,
    };

    // make the http GET request to Rainforest API
    axios
        .get("https://api.rainforestapi.com/request", { params })
        .then((response) => {
            // find the product in the array of productArray using the asin and add the brand and description to the product
            var chosenProduct;
            productArray.forEach((product) => {
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

function getOffers(amazon_domain, asin) {
    const params = {
        api_key: "F946DE62179446BDA20F414F65E78D3B",
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
